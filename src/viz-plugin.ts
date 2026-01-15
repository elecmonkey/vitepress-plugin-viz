import type { Plugin } from "vite";

// Additional configuration for plugin itself
export interface VizPluginConfig {
  class?: string;
}

export function VizPlugin(
  inlineOptions?: Partial<VizPluginConfig>
): Plugin {
  const options = {
    ...inlineOptions,
  };

  const virtualModuleId = "virtual:viz-config";
  const resolvedVirtualModuleId = "\0" + virtualModuleId;

  return {
    name: "vitepress-plugin-viz",
    enforce: "post",

    transform(src, id) {
      //Register Viz component in vue instance creation
      if (id.includes("vitepress/dist/client/app/index.js")) {
        src =
          "\nimport Viz from 'vitepress-plugin-viz/Viz.vue';\n" +
          src;

        const lines = src.split("\n");

        const targetLineIndex = lines.findIndex((line) =>
          line.includes("app.component")
        );

        lines.splice(
          targetLineIndex,
          0,
          '  app.component("Viz", Viz);'
        );

        src = lines.join("\n");

        return {
          code: src,
          map: null, // provide source map if available
        };
      }
    },

    async resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },
    async load(this, id) {
      if (id === resolvedVirtualModuleId) {
        return `export default ${JSON.stringify(options)};`;
      }
    },
  };
}

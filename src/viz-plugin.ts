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
      // Register Viz component in vue instance creation
      // Normalize path to handle Windows paths and different package managers
      const normalizedId = id.replace(/\\/g, '/');
      if (normalizedId.includes("vitepress/dist/client/app/index.js")) {
        src =
          "\nimport Viz from 'vitepress-plugin-viz/Viz.vue';\n" +
          src;

        const lines = src.split("\n");

        const targetLineIndex = lines.findIndex((line) =>
          line.includes("app.component")
        );

        if (targetLineIndex !== -1) {
          lines.splice(
            targetLineIndex,
            0,
            '  app.component("Viz", Viz);'
          );
          src = lines.join("\n");
        } else {
          console.warn(
            "[vitepress-plugin-viz] Failed to inject Viz component automatically: 'app.component' not found in VitePress client entry. " +
            "Please register the Viz component manually in your theme."
          );
        }

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

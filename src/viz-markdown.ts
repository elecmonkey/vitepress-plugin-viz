import { VizPluginConfig } from "./viz-plugin";

export const VizMarkdown = (md: any, pluginOptions?: VizPluginConfig) => {
  const fence = md.renderer.rules.fence.bind(md.renderer.rules);

  md.renderer.rules.fence = (tokens: any[], index: number, options: any, env: any, slf: any) => {
    const token = tokens[index];

    const info = token.info.trim();
    if (info.startsWith("viz")) {
      try {
        const key = index;
        const cssClass = pluginOptions?.class || 'viz';
        const scaleMatch = info.match(/\{([0-9]*\.?[0-9]+)\}/);
        const scale = scaleMatch ? Number(scaleMatch[1]) : 1;
        return `
      <Suspense> 
      <template #default>
      <Viz id="viz-${key}" class="${cssClass}" graph="${encodeURIComponent(
          token.content
        )}" scale="${scale}"></Viz>
      </template>
        <!-- loading state via #fallback slot -->
        <template #fallback>
          Loading graph...
        </template>
      </Suspense>`;
      } catch (err) {
        return `<pre>${err}</pre>`;
      }
    }

    return fence(tokens, index, options, env, slf);
  };
};

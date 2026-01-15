---
---

# Getting Started

This section will help you add Graphviz support for VitePress.

## Install

```bash
# npm
npm i vitepress-plugin-viz @viz-js/viz -D

# pnpm
pnpm add -D vitepress-plugin-viz @viz-js/viz

# yarn
yarn add -D vitepress-plugin-viz @viz-js/viz
```

## Setup

There are two ways to configure the plugin: using the `withViz` wrapper (Recommended) or manual configuration.

### Option 1: Using `withViz` Wrapper (Recommended)

This is the easiest way. Wrap your VitePress config with `withViz`:

```ts
// .vitepress/config.ts
import { defineConfig } from 'vitepress'
import { withViz } from 'vitepress-plugin-viz'

export default withViz(defineConfig({
  // your existing vitepress config...
  title: "My Site",
}))
```

### Option 2: Manual Configuration

If you prefer full control or have conflicts with other plugins, you can configure it manually.

```ts
// .vitepress/config.ts
import { defineConfig } from 'vitepress'
import { VizMarkdown, VizPlugin } from 'vitepress-plugin-viz'

export default defineConfig({
  markdown: {
    config: (md) => {
      // Register markdown plugin
      VizMarkdown(md) 
    }
  },
  vite: {
    plugins: [
      // Register vite plugin for component injection
      VizPlugin()
    ],
    optimizeDeps: {
      include: ['@viz-js/viz']
    },
    resolve: {
        alias: {
            // This is required for the plugin to find the component
             'vitepress-plugin-viz/Viz.vue': 'vitepress-plugin-viz/Viz.vue'
        }
    }
  }
})
```

## Usage

Use the `viz` language block in your markdown files.

````md
```viz
digraph G {
  rankdir=LR
  a -> b [label="a to b"];
  b -> c [label="another label"];
}
```
````

This will be rendered as:

```viz
digraph G {
  rankdir=LR
  a -> b [label="a to b"];
  b -> c [label="another label"];
}
```

## Advanced Configuration

The `vizPlugin` option (or arguments in manual mode) accepts the following:

```ts
interface VizPluginConfig {
  /**
   * Custom CSS class for the wrapper div
   * @default undefined
   */
  class?: string;
}
```

## Acknowledgments

- [vitepress-plugin-mermaid](https://github.com/emersonbottero/vitepress-plugin-mermaid) - This plugin references its implementation ideas and architecture.
- [emersonbottero](https://github.com/emersonbottero) - Author of vitepress-plugin-mermaid

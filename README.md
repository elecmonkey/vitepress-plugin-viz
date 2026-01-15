# vitepress-plugin-viz

Add [Graphviz](https://graphviz.org/) support for [VitePress](https://vitepress.dev/) using [@viz-js/viz](https://github.com/mdaines/viz-js/).

## Features

- 📊 **Graphviz Support**: Create diagrams using DOT language.
- ⚡️ **WebAssembly Powered**: Fast rendering using the latest viz.js implementation.
- 🛠 **Zero Config**: Automatic component registration and easy setup.
- 📦 **Lightweight**: Minimal dependencies, just works.

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

Add the wrapper in your VitePress config:

```ts
// .vitepress/config.ts
import { defineConfig } from 'vitepress'
import { withViz } from 'vitepress-plugin-viz'

export default withViz(defineConfig({
  // your existing vitepress config...
}))
```

## Usage

Use the `viz` language block in your markdown files:

````md
```viz
digraph G {
  a -> b [label="a to b"];
  b -> c [label="another label"];
}
```
````

This will be rendered as an SVG diagram.

## Configuration

You can pass options to the plugin via `vizPlugin` in your VitePress config:

```ts
export default withViz(defineConfig({
  // ...
  vizPlugin: {
    // Add custom class to the container div
    class: "my-custom-viz-class", 
  },
}))
```

## License

MIT © 2026-present [Elecmonkey](https://github.com/elecmonkey)

## Acknowledgments

- [vitepress-plugin-mermaid](https://github.com/emersonbottero/vitepress-plugin-mermaid) - This plugin references its implementation ideas and architecture.
- [emersonbottero](https://github.com/emersonbottero) - Author of vitepress-plugin-mermaid

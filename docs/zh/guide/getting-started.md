# 快速开始

本节将帮助你为 VitePress 添加 Graphviz 支持。

## 安装

```bash
# npm
npm i vitepress-plugin-viz @viz-js/viz -D

# pnpm
pnpm add -D vitepress-plugin-viz @viz-js/viz

# yarn
yarn add -D vitepress-plugin-viz @viz-js/viz
```

## 配置

你可以选择两种配置方式：使用 `withViz` 包装器（推荐）或手动配置。

### 方式一：使用 `withViz` 包装器（推荐）

这是最简单的方法。用 `withViz` 包裹你的 VitePress 配置：

```ts
// .vitepress/config.ts
import { defineConfig } from 'vitepress'
import { withViz } from 'vitepress-plugin-viz'

export default withViz(defineConfig({
  // 你现有的 vitepress 配置...
  title: "我的站点",
}))
```

### 方式二：手动配置

如果你需要完全控制或与其他插件有冲突，可以手动配置。

```ts
// .vitepress/config.ts
import { defineConfig } from 'vitepress'
import { VizMarkdown, VizPlugin } from 'vitepress-plugin-viz'

export default defineConfig({
  markdown: {
    config: (md) => {
      // 注册 markdown 插件
      VizMarkdown(md) 
    }
  },
  vite: {
    plugins: [
      // 注册 vite 插件以注入组件
      VizPlugin()
    ],
    optimizeDeps: {
      include: ['@viz-js/viz']
    },
    resolve: {
        alias: {
            // 这是插件找到组件所必需的
             'vitepress-plugin-viz/Viz.vue': 'vitepress-plugin-viz/Viz.vue'
        }
    }
  }
})
```

## 使用方法

在 markdown 文件中使用 `viz` 语言块。

````md
```viz
digraph G {
  rankdir=LR
  a -> b [label="a to b"];
  b -> c [label="another label"];
}
```
````

渲染结果如下：

```viz
digraph G {
  rankdir=LR
  a -> b [label="a to b"];
  b -> c [label="another label"];
}
```

使用说明：

- 可选缩放：在语言名后追加缩放倍数，例如 `{0.75}`。

````md
```viz {0.75}
digraph G {
  a -> b;
}
```
````

- 未填写 `{scale}` 时，SVG 会遵循容器宽度，超出时自动缩小以适配容器。

## 高级配置

`vizPlugin` 选项（或手动模式下的参数）接受以下内容：

```ts
interface VizPluginConfig {
  /**
   * 包装器 div 的自定义 CSS 类
   * @default undefined
   */
  class?: string;
}
```

## 致谢

- [vitepress-plugin-mermaid](https://github.com/emersonbottero/vitepress-plugin-mermaid) - 本插件参考其实现思路与架构。
- [emersonbottero](https://github.com/emersonbottero) - vitepress-plugin-mermaid 的作者

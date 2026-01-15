import { defineConfig } from "vitepress";
import { withViz } from "../../src";
import { version } from "../../package.json";

export default withViz(defineConfig({
  title: "VitePress Plugin Viz",
  description: "Graphviz support for VitePress",
  base: "/",
  lastUpdated: true,
  head: [
    ["link", { rel: "icon", href: "/logo.svg", type: "image/svg+xml" }],
  ],

  themeConfig: {
    logo: "/logo.svg",
    socialLinks: [
      { icon: "github", link: "https://github.com/elecmonkey/vitepress-plugin-viz" },
    ],
  },

  locales: {
    root: {
      label: 'English',
      lang: 'en',
      themeConfig: {
        footer: {
          message: "Released under the MIT License.",
          copyright: "Copyright © 2026-present Elecmonkey",
        },
        nav: [
          { text: "Guide", link: "/guide/getting-started", activeMatch: "/guide/" },
          { text: version, link: "" },
        ],
        sidebar: {
          "/guide/": [
            {
              text: "Introduction",
              items: [
                { text: "Getting Started", link: "/guide/getting-started" },
                { text: "Development", link: "/guide/development" },
                { text: "Changelog", link: "/guide/changelog" },
              ],
            },
          ],
        },
      }
    },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh/',
      themeConfig: {
        footer: {
          message: "基于 MIT 许可发布。",
          copyright: "版权所有 © 2026-present Elecmonkey",
        },
        nav: [
          { text: "指南", link: "/zh/guide/getting-started", activeMatch: "/zh/guide/" },
          { text: version, link: "" },
        ],
        sidebar: {
          "/zh/guide/": [
            {
              text: "介绍",
              items: [
                { text: "快速开始", link: "/zh/guide/getting-started" },
                { text: "开发指南", link: "/zh/guide/development" },
                { text: "更新日志", link: "/zh/guide/changelog" },
              ],
            },
          ],
        },
      }
    }
  }
}));

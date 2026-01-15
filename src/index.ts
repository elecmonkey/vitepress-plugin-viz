import { type UserConfig } from "vitepress";
import { VizMarkdown } from "./viz-markdown";
import { VizPlugin, VizPluginConfig } from "./viz-plugin";
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

export { VizMarkdown } from "./viz-markdown";
export { VizPlugin } from "./viz-plugin";

export { UserConfig };

declare module "vitepress" {
  interface UserConfig {
    viz?: any; // Viz config if needed
    vizPlugin?: VizPluginConfig;
  }
}

export const withViz = (config: UserConfig) => {
  if (!config.markdown) config.markdown = {};
  const markdownConfigOriginal = config.markdown.config || (() => {});
  config.markdown.config = (...args) => {
    VizMarkdown(...args, config.vizPlugin);
    markdownConfigOriginal(...args);
  };

  if (!config.vite) config.vite = {};
  if (!config.vite.plugins) config.vite.plugins = [];
  config.vite.plugins.push(VizPlugin(config.vizPlugin));
  
  if (!config.vite.optimizeDeps) config.vite.optimizeDeps = {};
  if (!config.vite.optimizeDeps.include) config.vite.optimizeDeps.include = [];

  config.vite.optimizeDeps.include = [
    ...config.vite.optimizeDeps.include,
    "@viz-js/viz"
  ];

  if (!config.vite.resolve) config.vite.resolve = {};
  if (!config.vite.resolve.alias) config.vite.resolve.alias = [];

  // Fix: resolve vitepress-plugin-viz/Viz.vue to absolute path
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const vizVuePath = resolve(__dirname, './Viz.vue');

  const alias = {
    'vitepress-plugin-viz/Viz.vue': vizVuePath
  };

  if (Array.isArray(config.vite.resolve.alias)) {
    config.vite.resolve.alias.push(...Object.entries(alias).map(([find, replacement]) => ({ find, replacement })));
  } else {
    Object.assign(config.vite.resolve.alias, alias);
  }

  return config;
};

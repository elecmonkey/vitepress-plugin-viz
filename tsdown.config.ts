import { defineConfig } from 'tsdown'
import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'

export default defineConfig({
  entry: ['./src/index.ts'],
  format: ['esm'],
  clean: true,
  dts: true,
  external: [
    'vitepress', 
    'vue', 
    '@viz-js/viz', 
    'markdown-it',
    'vite',
  ],
  plugins: [{
    name: 'copy-viz-vue',
    buildStart() {
      this.addWatchFile(resolve('src/Viz.vue'))
    },
    writeBundle() {
      copyFileSync(resolve('src/Viz.vue'), resolve('dist/Viz.vue'))
    }
  }]
})

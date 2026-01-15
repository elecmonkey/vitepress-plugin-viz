<script setup>
import { useData } from 'vitepress'
import { computed } from 'vue'
import HomeHero from './HomeHero.vue'
import HomePreview from './HomePreview.vue'
import HomeFeatures from './HomeFeatures.vue'

const { lang, isDark } = useData()
const isZh = computed(() => lang.value === 'zh-CN')

const title = 'VitePress Plugin Viz'
const subtitle = computed(() => isZh.value ? '将 Graphviz 引入你的文档' : 'Bring Graphviz to your documentation')
const getStartedText = computed(() => isZh.value ? '快速开始' : 'Get Started')
const getStartedLink = computed(() => isZh.value ? '/zh/guide/getting-started' : '/guide/getting-started')
const viewOnGithubText = computed(() => isZh.value ? '在 GitHub 上查看' : 'View on GitHub')
const previewText = computed(() => isZh.value ? '预览' : 'Preview')

const graph = computed(() => {
  if (isZh.value) {
    return `digraph G {
  rankdir=LR
  node [style=filled, fillcolor="#f8f8f8"]
  
  "文档" -> Graphviz [label=" 使用"]
  Graphviz -> "SVG 图表" [label=" 渲染"]
  
  "SVG 图表" [fillcolor="#d4edda"]
}`
  }
  return `digraph G {
  rankdir=LR
  node [style=filled, fillcolor="#f8f8f8"]
  
  Docs -> Graphviz [label=" uses"]
  Graphviz -> "SVG" [label=" renders"]
  
  "SVG" [fillcolor="#d4edda"]
}`
})
</script>

<template>
  <div class="custom-home" :class="{ 'dark-mode': isDark }">
    <div class="container">
      <HomeHero
        :title="title"
        :subtitle="subtitle"
        :get-started-text="getStartedText"
        :get-started-link="getStartedLink"
        :view-on-github-text="viewOnGithubText"
        github-link="https://github.com/elecmonkey/vitepress-plugin-viz"
      />
      <HomePreview :graph="graph" :preview-text="previewText" />
    </div>
    <HomeFeatures />
  </div>
</template>

<style scoped>
.custom-home {
  padding: 80px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}

@media (min-width: 640px) {
  .custom-home {
    padding: 80px 48px;
  }
}

.container {
  max-width: 1152px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
}

@media (max-width: 959px) {
  .container {
    align-items: center;
  }
}

@media (min-width: 960px) {
  .container {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 64px;
  }
}
</style>

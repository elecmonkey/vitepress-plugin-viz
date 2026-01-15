<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, h, render } from 'vue'
import Viz from '../../../../dist/Viz.vue'

const props = defineProps<{
  graph: string
  previewText: string
}>()

const shadowHost = ref<HTMLDivElement | null>(null)
let shadowRoot: ShadowRoot | null = null

const shadowStyles = `
:host {
  display: block;
}

.viz-shadow-root {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: var(--vp-c-text-1);
}

.viz-shadow-root svg {
  display: block;
  max-width: 100%;
  height: auto;
}

.viz-shadow-root .viz-error {
  color: red;
  border: 1px solid red;
  padding: 8px;
}
`

const mountViz = () => {
  if (!shadowRoot) {
    return
  }

  render(
    h('div', { class: 'viz-shadow-root' }, [
      h('style', shadowStyles),
      h(Viz, { graph: props.graph }),
    ]),
    shadowRoot
  )
}

onMounted(() => {
  if (!shadowHost.value) {
    return
  }
  shadowRoot = shadowHost.value.attachShadow({ mode: 'open' })
  mountViz()
})

watch(
  () => props.graph,
  () => {
    mountViz()
  }
)

onBeforeUnmount(() => {
  if (shadowRoot) {
    render(null, shadowRoot)
  }
})
</script>

<template>
  <div class="demo-visual">
    <div class="card code-card">
      <div class="card-header">
        <span class="dot red"></span>
        <span class="dot yellow"></span>
        <span class="dot green"></span>
      </div>
      <pre><code>{{ graph }}</code></pre>
    </div>

    <div class="card preview-card">
      <div class="card-header">
        <span class="title-text">{{ previewText }}</span>
      </div>
      <div class="viz-wrapper">
        <div ref="shadowHost" class="preview-shadow-host"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-visual {
  position: relative;
  width: 100%;
  max-width: 680px;
  height: 280px;
  margin-top: 0;
}

@media (min-width: 960px) {
  .demo-visual {
    margin-top: 0;
    height: 350px;
  }
}

.card {
  position: absolute;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card-header {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
  gap: 8px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.dot.red { background: #ff5f56; }
.dot.yellow { background: #ffbd2e; }
.dot.green { background: #27c93f; }

.title-text {
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.code-card {
  top: 10px;
  left: 0;
  width: 80%;
  z-index: 1;
  transform: rotate(-3deg);
}

.code-card pre {
  margin: 0;
  padding: 16px;
  font-size: 13px;
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-text-1);
  line-height: 1.5;
  overflow: auto;
}

.preview-card {
  bottom: 10px;
  right: 0;
  width: 96%;
  z-index: 10;
  transform: translate(5px, 5px);
}

.viz-wrapper {
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--vp-c-bg);
}

.preview-shadow-host {
  width: 100%;
}

.demo-visual:hover .code-card,
.demo-visual:active .code-card {
  transform: rotate(-5deg) translate(-10px, -5px);
}

.demo-visual:hover .preview-card,
.demo-visual:active .preview-card {
  transform: translate(0, 0);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.15);
}
</style>

<template>
  <div v-html="svg" :class="['viz-container', props.class]" ref="container"></div>
</template>

<script>
import { instance } from "@viz-js/viz";
const vizPromise = instance();
</script>

<script setup>
import { onMounted, ref, watch } from "vue";

const props = defineProps({
  graph: {
    type: String,
    required: true,
  },  id: {
    type: String,
    required: false,
  },
  class:{
    type: String,
    required: false,
    default: "viz",
  },
  scale: {
    type: [String, Number],
    required: false,
    default: 1,
  },
});

const svg = ref("");
const container = ref(null);

const renderChart = async () => {
  try {
    const viz = await vizPromise;
    // decodeURIComponent is needed because we encoded it in the markdown plugin
    const code = decodeURIComponent(props.graph);
    const svgElement = viz.renderSVGElement(code, {
      graphAttributes: {
        bgcolor: "transparent",
      },
    });

    function adaptColor(el) {
      const stroke = el.getAttribute('stroke');
      if (stroke === 'black' || stroke === '#000000' || stroke === '#000') {
        el.setAttribute('stroke', 'currentColor');
      }
      
      const fill = el.getAttribute('fill');
      if (fill === 'black' || fill === '#000000' || fill === '#000') {
        el.setAttribute('fill', 'currentColor');
      } else if (fill === 'white' || fill === '#ffffff' || fill === '#fff') {
        el.setAttribute('fill', 'var(--vp-c-bg)');
      }

      // Handle text elements without explicit fill (default is black)
      if ((el.tagName === 'text' || el.tagName === 'TEXT') && !fill) {
        el.setAttribute('fill', 'currentColor');
      }
      
      for (let i = 0; i < el.children.length; i++) {
        adaptColor(el.children[i]);
      }
    }
    
    adaptColor(svgElement);

    const scale = Number(props.scale) || 1;
    if (scale !== 1) {
      const applyScaledSize = (attrName) => {
        const raw = svgElement.getAttribute(attrName);
        if (!raw) return;
        const match = String(raw).trim().match(/^([0-9]*\.?[0-9]+)\s*([a-z%]*)$/i);
        if (!match) return;
        const value = Number(match[1]) * scale;
        const unit = match[2] || "";
        svgElement.setAttribute(attrName, `${value}${unit}`);
      };

      applyScaledSize("width");
      applyScaledSize("height");
    }

    svg.value = svgElement.outerHTML;
  } catch (err) {
    console.error(err);
    svg.value = `<pre class="viz-error">${err.message}</pre>`;
  }
};

onMounted(async () => {
  await renderChart();
});

watch(() => props.graph, renderChart);
</script>

<style>
.viz-container {
  color: var(--vp-c-text-1);
}

.viz-container svg {
  max-width: 100%;
  height: auto;
  display: block;
}

.viz-error {
  color: red;
  border: 1px solid red;
  padding: 8px;
}
</style>

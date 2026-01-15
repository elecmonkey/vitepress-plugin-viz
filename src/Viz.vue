<template>
  <div v-html="svg" :class="['viz-container', props.class]" ref="container"></div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { instance } from "@viz-js/viz";

const props = defineProps({
  graph: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: false,
  },
  class:{
    type: String,
    required: false,
    default: "viz",
  }
});

const svg = ref("");
const container = ref(null);

const renderChart = async () => {
  try {
    const viz = await instance();
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

.viz-error {
  color: red;
  border: 1px solid red;
  padding: 8px;
}
</style>

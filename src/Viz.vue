<template>
  <div v-html="svg" :class="props.class" ref="container"></div>
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
    const svgElement = viz.renderSVGElement(code);
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
.viz-error {
  color: red;
  border: 1px solid red;
  padding: 8px;
}
</style>

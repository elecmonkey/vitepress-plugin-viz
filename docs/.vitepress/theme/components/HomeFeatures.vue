<template>
  <div class="features-section">
    <div class="feature-item">
      <div class="feature-icon">📊</div>
      <h2 class="feature-title">Graphviz Support</h2>
      <p class="feature-details">Create diagrams using DOT language, powered by @viz-js/viz.</p>
    </div>
    <div class="feature-item">
      <div class="feature-icon">⚡️</div>
      <h2 class="feature-title">WebAssembly Powered</h2>
      <p class="feature-details">Fast rendering using the latest viz.js implementation.</p>
    </div>
    <div class="feature-item">
      <div class="feature-icon">🛠</div>
      <h2 class="feature-title">Zero Config</h2>
      <p class="feature-details">Automatic component registration and easy setup.</p>
    </div>
  </div>
</template>

<style scoped>
.features-section {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;
  margin-top: 64px;
  width: 100%;
  max-width: 1152px;
}

@media (min-width: 640px) {
  .features-section {
    grid-template-columns: repeat(3, 1fr);
  }
}

.feature-item {
  background-color: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 24px;
}

.feature-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  border-radius: 6px;
  background-color: var(--vp-c-default-soft);
  width: 48px;
  height: 48px;
  font-size: 24px;
}

.feature-title {
  line-height: 24px;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  margin-top: 0;
  border-top: none;
}

.feature-details {
  flex-grow: 1;
  padding-top: 8px;
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  margin: 0;
}
</style>

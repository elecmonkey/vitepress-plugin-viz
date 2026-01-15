<script setup lang="ts">
import { withBase } from 'vitepress'

defineProps<{
  title: string
  subtitle: string
  getStartedText: string
  getStartedLink: string
  viewOnGithubText: string
  githubLink: string
}>()
</script>

<template>
  <div class="content">
    <div class="title-row">
      <img class="title-logo" src="/logo.svg" alt="" aria-hidden="true" />
    </div>
    <h1 class="title">{{ title }}</h1>
    <p class="subtitle">{{ subtitle }}</p>
    <div class="actions">
      <a class="action-button primary" :href="withBase(getStartedLink)">{{ getStartedText }}</a>
      <a class="action-button secondary" :href="githubLink" target="_blank">{{ viewOnGithubText }}</a>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 960px) {
  .content {
    max-width: 560px;
    padding-top: 0;
    flex-shrink: 0;
  }
}

.title {
  font-size: 32px;
  line-height: 1.2;
  font-weight: 800;
  margin-bottom: 12px;
  background: -webkit-linear-gradient(315deg, var(--vp-c-brand-1) 25%, var(--vp-c-brand-2));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  white-space: nowrap;
}

.title-row {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.title-logo {
  width: 128px;
  height: 128px;
  flex: 0 0 auto;
}

:global(.custom-home.dark-mode) .title {
  background: none;
  background-clip: border-box;
  -webkit-background-clip: border-box;
  -webkit-text-fill-color: initial;
  color: #059669; /* Emerald 600 */
}

@media (min-width: 640px) {
  .title {
    font-size: 48px;
  }
}

@media (min-width: 960px) {
  .title {
    font-size: 56px;
  }
}

.subtitle {
  font-size: 20px;
  line-height: 1.4;
  color: var(--vp-c-text-2);
  margin-bottom: 32px;
  font-weight: 500;
}

@media (min-width: 640px) {
  .subtitle {
    font-size: 24px;
  }
}

.actions {
  display: flex;
  gap: 16px;
}

@media (max-width: 959px) {
  .content {
    text-align: center;
  }

  .title-row {
    justify-content: center;
  }

  .actions {
    justify-content: center;
  }
}

.action-button {
  display: inline-block;
  border-radius: 20px;
  padding: 0 20px;
  line-height: 38px;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.25s, color 0.25s;
  text-decoration: none;
}

.action-button.primary {
  background-color: var(--vp-c-brand-1);
  color: var(--vp-c-white);
}

.action-button.primary:hover {
  background-color: var(--vp-c-brand-2);
}

.action-button.secondary {
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.action-button.secondary:hover {
  background-color: var(--vp-c-bg-mute);
}

</style>

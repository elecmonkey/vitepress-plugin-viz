// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import CustomHome from './components/CustomHome.vue'
import './custom.css'
import { h } from 'vue'
import { useData } from 'vitepress'

export default {
  extends: DefaultTheme,
  Layout() {
    const { frontmatter } = useData()
    return h(DefaultTheme.Layout, null, {
      'home-hero-before': () => {
        return frontmatter.value.layout === 'home' ? h(CustomHome) : null
      }
    })
  }
}

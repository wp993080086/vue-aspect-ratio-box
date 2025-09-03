import { App } from 'vue-demi'
import AspectRatioBox from './AspectRatioBox.vue'
import type { AspectRatioProps } from './types'

export { AspectRatioBox }
export type { AspectRatioProps }

// Vue 3 plugin install function
const install = (app: App) => {
  app.component('AspectRatioBox', AspectRatioBox)
}

// Vue 2 compatible install function
const VueAspectRatioWrapper = {
  install(Vue: any) {
    Vue.component('AspectRatioBox', AspectRatioBox)
  }
}

// Auto-install when used via script tag
if (typeof window !== 'undefined' && (window as any).Vue) {
  (window as any).Vue.use(VueAspectRatioWrapper)
}

export default VueAspectRatioWrapper
export { install }

// Named exports for tree-shaking
// AspectRatioBox component is already exported above
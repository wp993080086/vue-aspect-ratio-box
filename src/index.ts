import { App } from 'vue-demi'
import AspectRatioWrapper from './AspectRatioWrapper.vue'
import type { AspectRatioProps } from './types'

export { AspectRatioWrapper }
export type { AspectRatioProps }

// Vue 3 plugin install function
const install = (app: App) => {
  app.component('AspectRatioWrapper', AspectRatioWrapper)
}

// Vue 2 compatible install function
const VueAspectRatioWrapper = {
  install(Vue: any) {
    Vue.component('AspectRatioWrapper', AspectRatioWrapper)
  }
}

// Auto-install when used via script tag
if (typeof window !== 'undefined' && (window as any).Vue) {
  (window as any).Vue.use(VueAspectRatioWrapper)
}

export default VueAspectRatioWrapper
export { install }

// Named exports for tree-shaking
// AspectRatioWrapper component is already exported above
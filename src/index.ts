import { App } from 'vue'
import AspectRatioBox from './AspectRatioBox.vue'
import type { AspectRatioProps } from './AspectRatioBox'

export { AspectRatioBox }
export type { AspectRatioProps }

// Vue 3 plugin install function
const install = (app: App) => {
  app.component('AspectRatioBox', AspectRatioBox)
}

// Plugin object
const VueAspectRatioBox = {
  install
}

// Auto-install when used via script tag
if (typeof window !== 'undefined' && (window as any).Vue) {
  (window as any).Vue.use(VueAspectRatioBox)
}

export default VueAspectRatioBox
export { install }
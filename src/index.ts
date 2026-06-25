import AspectRatioBox from './AspectRatioBox.vue'
import type { AspectRatioProps } from './types'

export { AspectRatioBox }
export type { AspectRatioProps }

// 兼容 Vue 2 / Vue 3 的 plugin install function
// Vue 2: install(Vue) 传入 Vue 构造函数，Vue.component() 注册全局组件
// Vue 3: install(app) 传入应用实例，app.component() 注册全局组件
// 两者 API 一致，无需区分版本
const install = (app: any) => {
  app.component('AspectRatioBox', AspectRatioBox)
}

// Plugin object
const VueAspectRatioBox = {
  install
}

// Auto-install when used via script tag (Vue 2 only, Vue 3 uses createApp().use())
if (typeof window !== 'undefined' && (window as any).Vue && typeof (window as any).Vue.use === 'function') {
  (window as any).Vue.use(VueAspectRatioBox)
}

export default VueAspectRatioBox
export { install }

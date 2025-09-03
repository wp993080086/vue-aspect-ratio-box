export interface AspectRatioProps {
  ratio?: [number, number]
  width?: string | number
  height?: string | number
}

export interface AspectRatioWrapperComponent {
  AspectRatioBox: any
}

// 扩展 Vue 全局组件类型
declare module '@vue/runtime-core' {
  interface GlobalComponents {
    AspectRatioBox: AspectRatioWrapperComponent['AspectRatioBox']
  }
}
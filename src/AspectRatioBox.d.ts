export interface AspectRatioProps {
  /**
   * 宽高比例 [width, height]
   * @example [16, 9] 表示 16:9 的比例
   */
  ratio: [number, number]
  
  /**
   * 指定宽度，可以是数字(px)或字符串
   * 当指定width时，高度会根据比例自动计算
   */
  width?: number | string
  
  /**
   * 指定高度，可以是数字(px)或字符串
   * 当指定height时，宽度会根据比例自动计算
   */
  height?: number | string
}
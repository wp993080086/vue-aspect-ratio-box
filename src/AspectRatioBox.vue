<script lang="ts">
import { defineComponent, computed, ref, onMounted, onUnmounted, watch, h, type PropType } from 'vue-demi'
import type { AspectRatioProps } from './types'

export default defineComponent({
	name: 'AspectRatioBox',
	props: {
		ratio: {
			type: Array as PropType<Array<number>>,
			required: true,
			validator: (value: [number, number]) => {
				return Array.isArray(value) && value.length === 2 && value.every((v) => typeof v === 'number' && v > 0)
			},
		},
		width: {
			type: [Number, String] as PropType<number | string>,
			default: undefined,
		},
		height: {
			type: [Number, String] as PropType<number | string>,
			default: undefined,
		},
	},
	setup(props: AspectRatioProps, { slots }) {
		const wrapperRef = ref<HTMLElement>()
		const calculateRef = ref<HTMLElement>()
		const calculateHeight = ref(0)
		let resizeObserver: ResizeObserver | null = null

		/**
		 * @description 注入CSS样式
		 */
		const injectCSS = () => {
			const styleId = 'vue-aspect-ratio-box-styles'
			if (!document.getElementById(styleId)) {
				const style = document.createElement('style')
				style.id = styleId
				style.textContent = `
					@supports (aspect-ratio: 1 / 1) {
						.aspect-ratio-shell-ancient {
							display: none !important;
						}
					}
					@supports not (aspect-ratio: 1 / 1) {
						.aspect-ratio-shell-modern {
							display: none !important;
						}
						.aspect-ratio-content {
							position: absolute;
							top: 0;
							left: 0;
							width: 100%;
							height: 100%;
						}
					}
				`
				document.head.appendChild(style)
			}
		}

		/**
		 * @description 计算格式化
		 */
		const calculateFormat = (value: number | string) => {
			const newValue = typeof value === 'number' ? `${value}px` : value
			return newValue
		}

		/**
		 * @description 计算宽度场景下的 paddingTop 百分比
		 * @description paddingTop 百分比相对于父容器宽度计算
		 */
		const aspectRatioPercent = computed(() => {
			const [w, h] = props.ratio
			return ((h / w) * 100).toFixed(2)
		})

		/**
		 * @description 监听 calculateRef 尺寸变化，用于旧版浏览器 height 场景计算 width
		 */
		watch(calculateRef, (el) => {
			resizeObserver?.disconnect()
			resizeObserver = null
			if (el) {
				resizeObserver = new ResizeObserver((entries) => {
					for (const entry of entries) {
						calculateHeight.value = entry.contentRect.height
					}
				})
				resizeObserver.observe(el)
			}
		})

		/**
		 * @description 计算wrapper样式
		 */
		const wrapperStyle = computed(() => {
			const style: Record<string, string> = {}
			if (props.width !== undefined) {
				// 如果指定了width，使用指定的宽度
				style.width = calculateFormat(props.width)
			} else if (props.height !== undefined) {
				// 如果指定了height，使用指定的高度
				style.height = calculateFormat(props.height)
				style.width = 'fit-content'
			}
			// 如果都没指定，则不处理，自然会通过CSS自然继承
			return style
		})

		/**
		 * @description 计算shell样式（现代浏览器）
		 */
		const shellStyleModern = computed(() => {
			const style: Record<string, string> = {}
			if (props.width !== undefined) {
				// 宽度由 wrapper 控制，shell 继承 100%
				style.width = '100%'
			} else if (props.height !== undefined) {
				// 高度由 wrapper 控制，shell 继承 100%
				style.height = '100%'
			}
			// 设置比例
			style.aspectRatio = `${props.ratio[0]} / ${props.ratio[1]}`
			return style
		})

		/**
		 * @description 计算shell样式（旧版浏览器）
		 * @description 高度计算原理：百分比的padding，是相对于父容器的宽度来计算的
		 */
		const shellStyleAncient = computed(() => {
			const style: Record<string, string> = {
				position: 'relative',
			}
			// 如果指定了宽度 则使用padding-top撑起高度
			if (props.width !== undefined) {
				style.width = '100%'
				style.paddingTop = `${aspectRatioPercent.value}%`
			} else if (props.height !== undefined) {
				// 如果指定了height，通过 calculateHeight 计算宽度
				style.height = '100%'
				if (calculateHeight.value) {
					style.width = `${(calculateHeight.value * props.ratio[0]) / props.ratio[1]}px`
				}
			}
			return style
		})

		/**
		 * @description 生命周期-装载
		 */
		onMounted(() => {
			injectCSS()
		})

		/**
		 * @description 生命周期-卸载
		 */
		onUnmounted(() => {
			resizeObserver?.disconnect()
		})

		/**
		 * @description render 函数
		 * @description 通过 setup 返回 render 函数，可直接访问 setup 作用域内的 ref 对象
		 * @description Vue 2.7 与 Vue 3 均支持 setup 返回 render 函数
		 */
		return () => {
			// Vue 2.7 与 Vue 3 的 setup context 中 slots.default 均为函数，统一调用
			const slotVnodes = slots.default?.() ?? []

			return h(
				'div',
				{
					ref: wrapperRef,
					class: 'aspect-ratio-box',
					style: wrapperStyle.value,
				},
				[
					// 现代浏览器
					h(
						'div',
						{
							class: 'aspect-ratio-shell-modern',
							style: shellStyleModern.value,
						},
						slotVnodes,
					),
					// 旧版浏览器
					h(
						'div',
						{
							class: 'aspect-ratio-shell-ancient',
							style: shellStyleAncient.value,
						},
						[
							props.height !== undefined
								? h('div', {
										ref: calculateRef,
										class: 'aspect-ratio-calculate',
										style: {
											height:
												typeof props.height === 'number'
													? `${props.height}px`
													: props.height,
										},
								  })
								: null,
							h('div', { class: 'aspect-ratio-content' }, slotVnodes),
						],
					),
				],
			)
		}
	},
})
</script>

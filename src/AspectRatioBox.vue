<template>
	<div ref="wrapperRef" class="aspect-ratio-box" :style="wrapperStyle">
		<!-- 现代浏览器 -->
		<div class="aspect-ratio-shell-modern" :style="shellStyleModern">
			<slot />
		</div>
		<!-- 旧版浏览器 -->
		<div class="aspect-ratio-shell-ancient" :style="shellStyleAncient">
			<div v-if="$props.height" ref="calculateRef" class="aspect-ratio-calculate" :style="{ height: typeof $props.height === 'number' ? `${$props.height}px` : $props.height }" />
			<div class="aspect-ratio-content">
				<slot />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted, onUnmounted, PropType } from 'vue'
import type { AspectRatioProps } from './AspectRatioBox'

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
	setup(props: AspectRatioProps) {
		const wrapperRef = ref<HTMLElement>()
		const calculateRef = ref<HTMLElement>()
		const parentWidth = ref(0)

		/**
		 * @description 注入CSS样式
		 */
		const injectCSS = () => {
			const styleId = 'vue-aspect-ratio-box-styles'
			if (typeof document !== 'undefined' && !document.getElementById(styleId)) {
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
		 * @description 计算比例百分比
		 * @description 如果有宽 则是根据宽求高，反之则是根据高求宽。
		 */
		const aspectRatioPercent = computed(() => {
			const [w, h] = props.ratio
			let ratio = 0
			if (props.width != undefined) {
				ratio = (h / w) * 100
			} else {
				ratio = (w / h) * 100
			}
			return ratio.toFixed(2)
		})

		/**
		 * @description 获取父元素宽度
		 */
		const updateParentWidth = () => {
			if (wrapperRef.value && wrapperRef.value.parentElement) {
				parentWidth.value = wrapperRef.value.parentElement.clientWidth
			}
		}

		/**
		 * @description 监听窗口大小变化
		 */
		const handleResize = () => {
			updateParentWidth()
		}

		/**
		 * @description 生命周期-装载
		 */
		onMounted(() => {
			injectCSS()
			updateParentWidth()
			window.addEventListener('resize', handleResize)
		})

		/**
		 * @description 生命周期-卸载
		 */
		onUnmounted(() => {
			window.removeEventListener('resize', handleResize)
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
				// 如果指定了width，使用指定的宽度
				style.width = typeof props.width === 'number' ? `${props.width}px` : '100%'
			} else if (props.height !== undefined) {
				// 如果指定了height，使用指定的高度
				style.height = typeof props.height === 'number' ? `${props.height}px` : '100%'
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
				style.paddingTop = `${aspectRatioPercent}%`
			} else if (props.height !== undefined) {
				// 如果指定了height
				style.height = '100%'
				if (calculateRef.value) {
					const h = calculateRef.value.clientHeight
					style.width = `${(h * props.ratio[0]) / props.ratio[1]}px`
				}
			}
			return style
		})

		return {
			wrapperRef,
			calculateRef,
			wrapperStyle,
			shellStyleModern,
			shellStyleAncient,
		}
	},
})
</script>

# Vue Aspect Ratio Box

中文文档 | [English](./README_en.md)

Vue宽高比组件，兼容Vue 3和Vue 2.7+，支持自定义的固定宽度/高度和自适应布局。

## 特性

- 🎯 **精确比例控制**: 支持任意宽/高比例设置
- 🔧 **灵活尺寸控制**: 可指定宽度或高度，自动计算另一维度
- 📱 **响应式设计**: 默认适应父容器宽度
- 🚀 **Vue 2.7+ & Vue 3 兼容**: 通过 `vue-demi` 同时支持 Vue 2.7+ 和 Vue 3
- 📝 **TypeScript 支持**: 完整的类型定义
- 🎨 **零样式侵入**: 不影响内容样式
- 😄 **兼容性**: 旧版浏览器通过 padding 方案降级支持

## 图例

![examples 1](./examples/examples1.png)
![examples 2](./examples/examples2.png)
![examples 3](./examples/examples3.png)

## 安装

```bash
npm install vue-aspect-ratio-box
# 或
yarn add vue-aspect-ratio-box
# 或
pnpm add vue-aspect-ratio-box
```

> **注意**: 本组件需要 `vue`（Vue 2.7+ 或 Vue 3）作为 peer dependency，内部通过 `vue-demi` 实现跨版本兼容。

## 使用方法

### 全局注册（Vue 3+）

```javascript
import { createApp } from 'vue'
import VueAspectRatioBox from 'vue-aspect-ratio-box'
import App from './App.vue'

const app = createApp(App)
app.use(VueAspectRatioBox)
app.mount('#app')
```

### 全局注册（Vue 2.7+）

```javascript
import Vue from 'vue'
import VueAspectRatioBox from 'vue-aspect-ratio-box'
import App from './App.vue'

Vue.use(VueAspectRatioBox)

new Vue({
  render: h => h(App)
}).$mount('#app')
```

### 局部注册

```javascript
import { AspectRatioBox } from 'vue-aspect-ratio-box'

export default {
	components: {
		AspectRatioBox,
	},
}
```

### 基本用法

```vue
<template>
	<!-- 16:9 比例，自适应父容器宽度 -->
	<AspectRatioBox :ratio="[16, 9]">
		<img src="your-image.jpg" alt="示例图片" />
	</AspectRatioBox>

	<!-- 3:4 比例，指定宽度为 300，默认单位px -->
	<AspectRatioBox :ratio="[3, 4]" :width="300">
		<div class="content">
			<h3>标题</h3>
			<p>内容区域</p>
		</div>
	</AspectRatioBox>

	<!-- 1:1 比例，指定高度为 200px -->
	<AspectRatioBox :ratio="[1, 1]" height="200px">
		<div class="square-content">正方形内容</div>
	</AspectRatioBox>
</template>
```

## API

### Props

| 属性     | 类型               | 必填 | 默认值      | 说明                                                                   |
| -------- | ------------------ | ---- | ----------- | ---------------------------------------------------------------------- |
| `ratio`  | `[number, number]` | ✅   | -           | 宽高比例，格式为 `[宽度, 高度]`                                        |
| `width`  | `number \| string` | ❌   | `undefined` | 指定宽度，可以是数字(默认单位 px)或字符串 10%,200px,200rem,20vw 等单位 |
| `height` | `number \| string` | ❌   | `undefined` | 指定高度，可以是数字(默认单位 px)或字符串 10%,200px,200rem,20vh 等单位 |

### 行为说明

1. **仅指定 `ratio`**: 组件会适应父容器的宽度，并根据比例计算高度
2. **指定 `width`**: 组件使用指定的宽度，根据比例计算高度
3. **指定 `height`**: 组件根据比例计算宽度，使用指定的高度
4. **同时指定 `width` 和 `height`**: `width` 优先级更高，不会取`height`

### 插槽

| 插槽名    | 说明                                 |
| --------- | ------------------------------------ |
| `default` | 默认插槽，用于放置需要保持比例的内容 |

## 示例

### 视频播放器

```vue
<template>
	<AspectRatioBox :ratio="[16, 9]">
		<video controls class="video-container">
			<source src="video.mp4" type="video/mp4" />
		</video>
	</AspectRatioBox>
</template>

<style>
.video-container {
	width: 100%;
	height: 100%;
}
</style>
```

### 卡片布局

```vue
<template>
	<div class="card-grid">
		<AspectRatioBox :ratio="[1, 1]" :width="200">
			<div class="card">
				<p>卡片标题</p>
				<p>卡片内容</p>
			</div>
		</AspectRatioBox>
	</div>
</template>

<style>
.card {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 100%;
	height: 100%;
	border: 1px solid #ddd;
	border-radius: 8px;
	padding: 16px;
}
</style>
```

## TypeScript 支持

组件提供完整的 TypeScript 类型定义：

```typescript
import { AspectRatioBox, AspectRatioProps } from 'vue-aspect-ratio-box'

// Props 类型
interface AspectRatioProps {
	ratio: [number, number]
	width?: number | string
	height?: number | string
}
```

## 兼容性

- Vue: 需要 Vue 2.7.0+ 或 Vue 3+
- 现代浏览器使用原生 `aspect-ratio` CSS 属性
- 旧版浏览器降级为 padding 方案实现

## 许可证

MIT License - 详情请见 [LICENSE](LICENSE) 文件

## 贡献

欢迎提交 Issue 和 Pull Request！

## 更新日志

详细的版本发布说明和历史记录请查看 [CHANGELOG.md](./CHANGELOG.md)。

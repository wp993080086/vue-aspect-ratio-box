# Changelog

All notable changes to this project will be documented in this file.

## [1.2.1] - 2026-06-25

- 📝 **Docs**: Restructure README - Chinese as primary (`README.md`), English moved to `README_en.md`
- 📝 **Docs**: Fix broken language switch links between README files
- 📦 **Package**: Optimize `description` for better discoverability
- 📦 **Package**: Expand `keywords` to improve AI crawler and npm search recognition
- 📦 **Package**: Update `files` field to include `README_en.md`

## [1.2.0] - 2026-06-25

- 🚀 **Feature**: Restore Vue 2.7+ support, now compatible with both Vue 2.7+ and Vue 3
- 🔄 **Refactor**: Migrate from SFC template to render function for cross-version compatibility
- 📦 **Dependencies**: Add `vue-demi` as dependency for unified Vue 2/3 API
- 📦 **Package**: Update `peerDependencies` to `vue: ^2.7.0 || ^3.0.0`
- 🐛 **Bug Fixes**: Fix slot content not rendering in Vue 2.7 (slots.default is a function, not array)
- 🐛 **Bug Fixes**: Fix UMD bundle failing to load in Vue 3 global build (window.Vue.use is not a function)
- 🔧 **Build**: Add `vue-demi` to rollup externals and globals

## [1.1.9] - 2026-06-24

- 🔧 **Build Process**: Set `output.exports: 'named'` in Vite config to fix UMD bundle export warning
- 📦 **Package**: Add `exports` field for modern Node.js resolution
- 📦 **Package**: Add `sideEffects: false` to enable consumer tree-shaking

## [1.1.8] - 2024-01-XX

- 📝 **Documentation**: No changelog record was provided for this version

## [1.1.7] - 2024-01-XX

- 🐛 **Bug Fixes**: Fixed TypeScript type definition generation issues
- 🔧 **Build Process**: Improved build pipeline to include type definitions in published package
- 📦 **Package**: Ensured all TypeScript declaration files are properly included

## [1.1.6] - 2024-01-XX

- 🔧 **Build Process**: Updated build configuration
- 📦 **Package**: Package optimization

## [1.1.5] - 2024-01-XX

- 🐛 **Bug Fixes**: Fixed TypeScript type definition issues
- 🔧 **Code Quality**: Fixed logic errors in aspect ratio calculations
- 📝 **Documentation**: Improved documentation accuracy and formatting
- 🧹 **Optimization**: Further package optimization and cleanup

## [1.1.4] - 2024-01-XX

- 🚀 **Breaking Change**: Removed Vue 2 support, now only supports Vue 3
- ⚡ Improved build performance and bundle size
- 🧹 Cleaned up unnecessary files and optimized package size

## [1.0.0] - 2024-01-XX

- 🎉 Initial release
- ✨ Supports Vue 2 and Vue 3
- ✨ TypeScript support
- ✨ Flexible proportion control
- ✨ Responsive design

---

## 更新日志

本项目的所有重要变更都将记录在此文件中。

## [1.2.1] - 2026-06-25

- 📝 **文档**: 重组 README 结构 - 中文作为主文档（`README.md`），英文版移至 `README_en.md`
- 📝 **文档**: 修复 README 文件间的语言切换链接错误
- 📦 **包管理**: 优化 `description` 描述，提升可发现性
- 📦 **包管理**: 扩充 `keywords` 关键词，优化 AI 爬虫和 npm 搜索识别
- 📦 **包管理**: 更新 `files` 字段以包含 `README_en.md`

## [1.2.0] - 2026-06-25

- 🚀 **新功能**: 恢复 Vue 2.7+ 支持，现在同时兼容 Vue 2.7+ 和 Vue 3
- 🔄 **重构**: 从 SFC template 迁移到 render 函数，实现跨版本兼容
- 📦 **依赖**: 添加 `vue-demi` 作为依赖，统一 Vue 2/3 API 调用
- 📦 **包管理**: 更新 `peerDependencies` 为 `vue: ^2.7.0 || ^3.0.0`
- 🐛 **问题修复**: 修复 Vue 2.7 下 slot 内容不渲染的问题（slots.default 是函数而非数组）
- 🐛 **问题修复**: 修复 UMD 产物在 Vue 3 全局构建下加载失败的问题（window.Vue.use 不是函数）
- 🔧 **构建**: 将 `vue-demi` 添加到 rollup externals 和 globals

## [1.1.9] - 2026-06-24

- 🔧 **构建流程**: 在 Vite 配置中设置 `output.exports: 'named'`，修复 UMD 包导出警告
- 📦 **包管理**: 添加 `exports` 字段以支持现代 Node.js 模块解析
- 📦 **包管理**: 添加 `sideEffects: false` 以便消费方进行 tree-shaking

## [1.1.8] - 2024-01-XX

- 📝 **文档**: 该版本未提供变更记录

## [1.1.7] - 2024-01-XX

- 🐛 **问题修复**: 修复了 TypeScript 类型定义生成问题
- 🔧 **构建流程**: 改进构建管道以确保类型定义文件包含在发布包中
- 📦 **包管理**: 确保所有 TypeScript 声明文件正确包含

## [1.1.6] - 2024-01-XX

- 🔧 **构建流程**: 更新构建配置
- 📦 **包管理**: 包优化

## [1.1.5] - 2024-01-XX

- 🐛 **问题修复**: 修复了 TypeScript 类型定义问题
- 🔧 **代码质量**: 修复了宽高比计算中的逻辑错误
- 📝 **文档**: 改进文档准确性和格式
- 🧹 **优化**: 进一步的包优化和清理

## [1.1.4] - 2024-01-XX

- 🚀 **重大变更**: 移除 Vue 2 支持，现在仅支持 Vue 3
- ⚡ 改进构建性能和包体积
- 🧹 清理不必要的文件并优化包大小

## [1.0.0] - 2024-01-XX

- 🎉 初始版本发布
- ✨ 支持 Vue 2 和 Vue 3
- ✨ TypeScript 支持
- ✨ 灵活的比例控制
- ✨ 响应式设计
# v-dialogs changelog

## 当前版本

- 无

## v2.2.0

- 重构内部实现
- 调整样式风格
- 增加函数式功能入口
  - `alert` 应用 `DialogAlert` 函数对象
  - `modal` 应用 `DialogModal` 函数对象
  - `toast` 应用 `DialogToast` 函数对象
  - `mask` 应用 `DialogMask` 函数对象
  - `DialogHelper` 相关工具函数集合
- 修复关闭 `mask` 窗口时没有显示动画
- 增加全局滚动条管理
- 修复 `modal` 模式最大化后，窗口内容区域没有最大化的问题 [#39](https://github.com/TerryZ/v-dialogs/issues/39)
- 增加 `modal` 的 `fullscreen` prop，以最大化方式打开窗口
- 增加 `alert`、`toast` 标题文本溢出切割

## v2.1.2

- 修改 prop **dialogCloseButton** 名称为 **closeButton**
- 修改 prop **dialogMaxButton** 名称为 **maxButton**
- 增加 prop **icon** 用于设置是否使用图标（Alert、Toast）
- 增加 prop **customClass** 用于自定义样式
- 修复 toast 模式下 `topCenter` 和 `bottomCenter` 位置不正确的问题
- 增加 prop **shaking**，用于决定点击遮罩是否触发抖动的动画

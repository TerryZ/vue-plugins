# v-region changelog

## 开发中

- 无

## 2.3.0 - 2022-05-18

- 更新行政区划数据至 `2022年05月18日`
- **Text** 模式增加文本分割符 prop `separator`，默认设置为空格
- **CityPicker** 模式增加 `overflow` prop 用于设置选中多个城市的情况下，仅显示一定数量的城市，其他城市进行折叠，仅显示数量；默认值为 `false`
- 统一修改 `i18n` prop 名为 `language`
- 统一修改 `values` 数据响应事件为 `change`
- 重构内部实现
- 拆分五个模块为独立的模块进行应用
- 增加分组选择器（Group）与多列竖排模式（Columns）核心模块
- 增加省、市、区/县三级数据模型输出
- 分组选择器（Group）的标题栏中移除 `完成` 图标按钮
- 增加 **RegionGroupCore** 与 **RegionColumnsCore** 模块输出，可用于直接嵌入页面使用，而非默认的选择器形态，更可以进一步进行二次封装使用
- 更新部分风格样式

### 使用方式变化内容

- 所有功能模块均以独立模块输出，不再统一以 v-region 标准，输出的功能模块有：
  - RegionText
  - RegionCityPicker
  - RegionSelects
  - RegionColumnsCore
  - RegionColumns
  - RegionGroupCore
  - RegionGroup
- 增加数据模型输出
  - 三级行政区划数据模型列表
  - 省/直辖市/特别行政区模型列表输出
  - 城市模型列表
  - 区/县模型列表
- 为 RegionText 模块增加 `separator` prop
- 为 RegionCityPicker 模块增加 `overflow` prop
- 全局修改 `values` 响应事件名为 `change`
- 全局修改 `i18n` prop 名为 `language`

## v2.2.2

- 多数组件使用 render 函数进行重构
- 数据监听机制改造
- Select
- Text
- Group
- Column
- City

# v-region changelog

## 开发中

- 无

## 2.3.0 - 2022-05-18

- 更新行政区划数据至 `2022年05月18日`
- **Text** 模式增加文本分割符 prop `separator`，默认设置为空格
- **CityPicker** 模式增加 `overflow` prop 用于设置选中多个城市的情况下，仅显示一定数量的城市，其他城市进行折叠，仅显示数量；默认值为 `false`
- 统一修改 `values` 数据响应事件为 `change`
- 重构内部实现
- 拆分五个模块为独立的模块进行应用
- 增加分组选择器（Group）与多列竖排模式（Columns）核心模块
- 增加省、市、区/县三级数据模型输出
- 更新部分风格样式

## v2.2.2

- 多数组件使用 render 函数进行重构
- 数据监听机制改造
- Select
- Text
- Group
- Column
- City

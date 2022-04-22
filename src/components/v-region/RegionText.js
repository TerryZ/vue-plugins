import { validModel, getRegionByModel, parseRegionToText } from './helper'

/**
 * 纯文本显示区域信息
 */
export default {
  name: 'RegionText',
  props: {
    value: { type: Object, default: undefined },
    separator: { type: String, default: '' }
  },
  render (h) {
    const { value, separator } = this

    if (!validModel(value)) {
      console.error('Incorrect data format for "value/v-model"')
      return
    }

    return h('span', parseRegionToText(getRegionByModel(value)).join(separator))
  }
}

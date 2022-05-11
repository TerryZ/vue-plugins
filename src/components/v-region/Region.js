import './styles/region.styl'
import { SELECT, TEXT, GROUP, COLUMN, CITY, TYPE_LIST } from './constants'
import { generateComponentName } from './utils/helper'

import SelectGroup from './components/Selects'
import TextRegion from './components/Text'
import GroupRegion from './components/Group'
import Columns from './components/Columns'
import CityPicker from './components/CityPicker'

export default {
  name: 'v-region',
  components: {
    [generateComponentName(SELECT)]: SelectGroup,
    [generateComponentName(TEXT)]: TextRegion,
    [generateComponentName(GROUP)]: GroupRegion,
    [generateComponentName(COLUMN)]: Columns,
    [generateComponentName(CITY)]: CityPicker
  },
  props: {
    type: { type: String, default: SELECT }
  },
  render (h) {
    const type = this.type.toLowerCase()

    if (!TYPE_LIST.includes(type)) {
      console.error('Please provide plugin type.("type" prop of v-region)')
      return
    }

    const childs = []
    const options = {
      class: 'v-region',
      props: this.$attrs,
      on: this.$listeners
    }

    const { default: defaultSlot } = this.$scopedSlots
    if (defaultSlot) {
      switch (type) {
        case COLUMN:
        case GROUP:
          options.scopedSlots = {
            default: props => {
              const { region, show } = props
              return defaultSlot({ region, show })
            }
          }
          break
        case CITY:
          childs.push(defaultSlot())
          break
      }
    }

    return h(generateComponentName(type), options, childs)
  }
}

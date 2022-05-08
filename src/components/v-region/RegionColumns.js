import Dropdown from 'v-dropdown'
import Columns from './components/Columns'
import selector from './mixins/selector'

import { PROVINCE_LEVEL } from './constants.js'
import { CN } from './language'

export default {
  name: 'RegionColumns',
  mixins: [selector],
  components: {
    Dropdown,
    Columns
  },
  props: {
    language: { type: String, default: CN }
  },
  render (h) {
    const children = []

    children.push(this.buildCaller())

    const columnsOption = {
      ref: 'module',
      props: this.$attrs,
      on: {
        ...this.$listeners,
        complete: this.close,
        adjust: this.adjust
      }
    }
    children.push(h('columns', columnsOption))

    const dropdownOption = {
      ref: 'drop',
      props: {
        border: true
      },
      on: {
        show: this.showChange
      }
    }
    return h('dropdown', dropdownOption, children)
  },
  methods: {
    clear () {
      const module = this.$refs.module
      module.clearRegion(PROVINCE_LEVEL)
      module.change()
      this.close()
    }
  }
}

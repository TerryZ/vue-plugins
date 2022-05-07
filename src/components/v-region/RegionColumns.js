import Dropdown from 'v-dropdown'
import Columns from './components/Columns'
import selector from './mixins/selector'

// import { PROVINCE_LEVEL } from './constants.js'
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

    children.push(this.buildCaller(h))

    const columnsOption = {
      props: this.$attrs,
      on: {
        ...this.$listeners,
        done: this.done
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
    done () {
      console.log('RegionColumns done')
    },
    clear () {
      // this.clearRegion(PROVINCE_LEVEL)
      // this.change()
      // this.close()
    }
  }
}

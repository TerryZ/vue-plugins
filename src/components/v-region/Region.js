import './styles/region.styl'
import { SELECT, TEXT, GROUP, COLUMN, CITY } from './constants'

export default {
  name: 'v-region',
  components: {
    'r-select': () => import('./components/SelectGroup'),
    'r-text': () => import('./components/Text'),
    'r-group': () => import('./components/Group'),
    'r-column': () => import('./components/ColumnGroup'),
    'r-city': () => import('./components/CityPicker')
  },
  props: {
    type: {
      type: String,
      default: SELECT
    }
  },
  render (h) {
    if (this.type) {
      switch (this.type.toLowerCase()) {
        case TEXT: return this.build(h, 'r-text')
        case SELECT: return this.build(h, 'r-select')
        case COLUMN: return this.build(h, 'r-column')
        case CITY: return this.build(h, 'r-city')
        case GROUP: return this.build(h, 'r-group')
      }
    } else {
      console.error('Please provide selector type.("type" prop of v-region)')
    }
  },
  methods: {
    build (h, name) {
      let slot = null
      const type = this.type.toLowerCase()
      if ((type !== SELECT || type !== TEXT) && 'default' in this.$scopedSlots) {
        slot = this.$scopedSlots.default()
      }
      return h(name, {
        class: 'v-region',
        props: this.$attrs,
        on: this.$listeners
      }, slot)
    }
  }
}

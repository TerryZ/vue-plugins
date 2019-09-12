import './styles/region.styl'

export default {
  name: 'v-region',
  render (h) {
    if (this.type) {
      switch (this.type.toLowerCase()) {
        case 'text': return this.build(h, 'r-text')
        case 'select': return this.build(h, 'r-select')
        case 'column': return this.build(h, 'r-column')
        case 'city': return this.build(h, 'r-city')
        case 'group': return this.build(h, 'r-group')
      }
    } else {
      console.error('Please provide selector type.("type" option of v-region)')
    }
  },
  components: {
    'r-select': () => import('./components/SelectGroup'),
    'r-text': () => import('./components/Text'),
    'r-group': () => import('./components/TabSelector'),
    'r-column': () => import('./components/ColumnGroup'),
    'r-city': () => import('./components/CityPicker')
  },
  props: {
    type: {
      type: String,
      default: 'select'
    }
  },
  methods: {
    build (h, name) {
      let slot
      const type = this.type.toLowerCase()
      if ((type !== 'select' || type !== 'text') && 'default' in this.$scopedSlots) {
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

import './styles/region.styl'

export default {
  name: 'v-region',
  render (h) {
    // const childs = []
    // const options = {
    //   class: 'v-region',
    //   props: this.$attrs,
    //   on: this.$listeners
    // }

    if ('default' in this.$scopedSlots) {
      // options.scopedSlots = {
      //   default: props => {
      //     const { region, show } = props
      //     return this.$scopedSlots.default({ region, show })
      //   }
      // }
      // childs.push(this.$scopedSlots.default())
      return this.$scopedSlots.default()
    }

    // return h('template', options, childs)
  }
}

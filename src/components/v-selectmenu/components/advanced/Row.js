export default {
  name: 'AdvancedMenuRow',
  props: {
    row: Object,
    hover: {
      type: Boolean,
      default: false
    }
  },
  inject: ['showField', 'inPicked', 'getRowText'],
  render (h) {
    const child = []
    child.push(h('div', { class: 'sm-selected-icon' }, [h('i', { class: 'sm-iconfont sm-icon-selected' })]))
    const options = { class: 'sm-item-text' }
    if ('row' in this.$scopedSlots) {
      /**
       * build scoped slot with named slot
       */
      child.push(h('div', options, [
        this.$scopedSlots.row({
          row: this.row
        })
      ]))
    } else {
      options.domProps = {
        innerHTML: this.getRowText(this.row)
      }
      child.push(h('div', options))
    }

    return h('li', {
      class: {
        'sm-selected': this.inPicked(this.row),
        'sm-over': this.hover
      },
      on: {
        click: e => {
          e.stopPropagation()
          this.$emit('select')
        },
        mouseenter: () => this.$emit('highlight', true),
        mouseleave: () => this.$emit('highlight', false)
      }
    }, child)
  }
}

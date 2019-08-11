import { DIVIDER } from '../../constants'

export default {
  name: 'v-menu-item',
  render (h) {
    if (this.data && Object.keys(this.data).length) {
      const child = []
      if (this.data.content !== DIVIDER) {
        const item = []

        if ('row' in this.$scopedSlots) {
          /**
           * build scoped slot with named slot
           */
          item.push(h('span', [
            this.$scopedSlots.row({
              row: this.data
            })
          ]))
        } else {
          item.push(h('span', { domProps: { innerHTML: this.data.content } }))
        }

        /**
         * sub menu icon
         */
        if (this.data.children) {
          item.push(h('span', { class: 'sm-caret sm-caret-right' }))
        }

        const linkOption = {
          attrs: {
            href: 'javascript:void(0)',
            target: this.data.open ? '_blank' : '_self'
          }
        }
        if (!this.data.disabled) {
          if (this.data.url) {
            linkOption.attrs.href = this.data.url
          } else {
            linkOption.on = {
              click: e => this.click(e)
            }
          }
        }

        child.push(h('a', linkOption, item))
      }
      return h('li', { class: this.classes }, child)
    }
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    classes () {
      return {
        'sm-divider': this.data.content === DIVIDER,
        'sm-caption': this.data.header,
        'sm-disabled': this.data.disabled
      }
    }
  },
  methods: {
    click (e) {
      if (this.data && this.data.callback && typeof this.data.callback === 'function') {
        e.stopPropagation()
        this.data.callback()
      }
    }
  }
}

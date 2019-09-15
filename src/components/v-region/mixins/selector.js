export default {
  data () {
    return {
      show: false
    }
  },
  methods: {
    close () {
      if (this.show) this.$refs.drop.visible()
    },
    showChange (val) {
      this.show = val
      if (val) {

      } else {

      }
    },
    buildCaller (h) {
      const caller = []

      if ('default' in this.$scopedSlots) {
        caller.push(this.$scopedSlots.default())
      } else {
        // default region caller button
        const element = []
        element.push(h('span', this.selectText ? this.selectText : this.lang.pleaseSelect))

        if (this.selectedText) {
          element.push(h('span', {
            class: 'rg-iconfont rg-icon-clear rg-clear-btn',
            attrs: {
              title: this.lang.clear
            },
            on: {
              click: e => {
                e.stopPropagation()
                this.clear()
              }
            }
          }))
        } else {
          element.push(h('span', { class: 'rg-caret-down' }))
        }

        caller.push(h('button', {
          class: {
            'rg-default-btn': true,
            'rg-opened': this.show
          },
          attrs: {
            type: 'button'
          }
        }, element))
      }

      return h('template', { slot: 'caller' }, [
        h('div', { class: 'rg-caller-container' })
      ])
    }
  }
}

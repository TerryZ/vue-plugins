import language from '../language'

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
    },
    adjust () {
      this.$nextTick(() => {
        this.$refs.drop.adjust()
      })
    },
    /**
     * Build region default toggle button
     */
    buildCaller (h) {
      const caller = []
      const lang = language[this.language.toLowerCase()]

      if ('default' in this.$scopedSlots) {
        // scoped slot
        const { region, show } = this
        caller.push(this.$scopedSlots.default({ region, show }))
      } else {
        // default region caller button
        const element = []
        element.push(h('span', this.selectedText || lang.pleaseSelect))

        if (this.selectedText) {
          element.push(h('span', {
            class: 'rg-iconfont rg-icon-clear rg-clear-btn',
            attrs: {
              title: lang.clear
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
        h('div', { class: 'rg-caller-container' }, caller)
      ])
    }
  }
}

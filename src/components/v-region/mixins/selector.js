import language from '../language'

/**
 * 选择器基础 API
 */
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
     * 构建选择器触发按钮
     */
    buildCaller () {
      const h = this.$createElement
      const caller = []
      const lang = language[this.language.toLowerCase()]
      const { show, selectedText } = this

      if ('default' in this.$scopedSlots) {
        // scoped slot
        // TODO: 功能与选择顺剥离后，需要处理 region 数据的获取问题
        const { region } = this
        caller.push(this.$scopedSlots.default({ region, show }))
      } else {
        const elements = []
        elements.push(h('span', selectedText || lang.pleaseSelect))

        if (selectedText) {
          elements.push(h('span', {
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
          elements.push(h('span', { class: 'rg-caret-down' }))
        }

        const btnOption = {
          class: {
            'rg-default-btn': true,
            'rg-opened': show
          },
          attrs: {
            type: 'button'
          }
        }
        caller.push(h('button', btnOption, elements))
      }

      return h('template', { slot: 'caller' }, [
        h('div', { class: 'rg-caller-container' }, caller)
      ])
    }
  }
}

import Dropdown from 'v-dropdown'
import languages, { CN } from '../language'

/**
 * 下拉层选择器基础 API
 *
 * 引用要求：
 * - 对功能组件定义 ref 属性，并指定为 module
 */
export default {
  components: {
    Dropdown
  },
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
      const { show, language } = this
      const { module } = this.$refs
      const lang = languages[(language || CN).toLowerCase()]

      if ('default' in this.$scopedSlots) {
        // scoped slot
        const region = module && module.region
        caller.push(this.$scopedSlots.default({ region, show }))
      } else {
        const elements = []
        const selectedText = module && module.selectedText
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
    },
    /**
     * 构建下拉层
     * @param {VNode[]} contents - 下拉层中的内容
     * @returns VNode
     */
    buildDropdown (contents) {
      const dropdownOption = {
        ref: 'drop',
        props: {
          border: true
        },
        on: {
          show: this.showChange
        }
      }
      return this.$createElement('dropdown', dropdownOption, contents)
    }
  }
}

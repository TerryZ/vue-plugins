import './page.sass'
import languages from './language'

const FIRST = 1

export default {
  name: 'v-page',
  props: {
    value: {
      type: Number,
      default: 0
    },
    totalRow: {
      type: Number,
      default: 0
    },
    /**
     * page size list
     * false: close page size menu bar
     * array: custom page sizes menu
     */
    pageSizeMenu: {
      type: [Boolean, Array],
      default: function () {
        return [10, 20, 50, 100]
      }
    },
    language: {
      type: String,
      default: 'cn'
    },
    /**
     * pagination alignment direction
     * 'left'
     * 'center'
     * 'right'(default)
     */
    align: {
      type: String,
      default: 'right'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: true
    },
    info: {
      type: Boolean,
      default: true
    },
    pageNumber: {
      type: Boolean,
      default: true
    },
    /**
     * first page button
     */
    first: {
      type: Boolean,
      default: true
    },
    /**
     * last page button
     */
    last: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      pageSize: this.pageSizeMenu === false ? 10 : this.pageSizeMenu[0],
      lastPageSize: -1,
      current: 0,
      pageNumberSize: 5,
      i18n: languages[this.language] || languages.cn
    }
  },
  computed: {
    totalPage () {
      return Math.ceil(this.totalRow / this.pageSize)
    },
    pageNumbers () {
      const { pageNumberSize, totalPage } = this
      const start = this.getPageNumberStart()

      return Array.apply(null, { length: pageNumberSize })
        .map((val, index) => start + index)
        .filter(val => val >= FIRST && val <= totalPage)
    },
    pageInfo () {
      return this.i18n.pageInfo
        .replace('#pageNumber#', this.current)
        .replace('#totalPage#', this.totalPage)
        .replace('#totalRow#', this.totalRow)
    },
    classes () {
      return {
        'v-pagination--no-border': !this.border,
        'v-pagination--right': this.align === 'right',
        'v-pagination--center': this.align === 'center',
        'v-pagination--disabled': this.disabled
      }
    },
    isFirst () {
      return this.current === FIRST
    },
    isLast () {
      return this.current === this.totalPage
    }
  },
  watch: {
    value (val) {
      if (typeof val === 'number' && val > 0) this.goPage(val, false)
    }
  },
  render (h) {
    const { pageNumberGenerator, current, i18n } = this
    const items = []
    // page length list
    if (Array.isArray(this.pageSizeMenu) && this.pageSizeMenu.length) {
      items.push(h('li', { class: 'v-pagination__list' }, [h('a', [
        h('span', i18n.pageLength),
        h('select', {
          attrs: { disabled: this.disabled },
          on: {
            change: e => {
              if (e.srcElement && e.srcElement.value) {
                this.pageSize = Number(e.srcElement.value)
              }
              this.goPage()
            }
          }
        }, this.pageSizeMenu.map(val => {
          return h('option', { attrs: { value: val } }, val)
        }))
      ])]))
    }
    // page info
    if (this.info) {
      items.push(h('li', { class: 'v-pagination__info' }, [h('a', this.pageInfo)]))
    }
    // first
    if (this.first) {
      items.push(pageNumberGenerator({ disabled: this.isFirst }, FIRST, i18n.first))
    }
    // previous
    items.push(pageNumberGenerator({ disabled: this.isFirst }, current - 1, i18n.previous))
    // page numbers
    if (this.pageNumber) {
      items.push(...this.pageNumbers.map(val => pageNumberGenerator({
        active: val === current
      }, val, val)))
    }
    // next
    items.push(pageNumberGenerator({ disabled: this.isLast }, current + 1, i18n.next))
    // last
    if (this.last) {
      items.push(pageNumberGenerator({ disabled: this.isLast }, this.totalPage, i18n.last))
    }
    return h('div', {
      class: {
        'v-pagination': true,
        ...this.classes
      }
    }, [h('ul', items)])
  },
  methods: {
    goPage (pNum = FIRST, respond = true) {
      if (this.disabled) return
      if (typeof pNum !== 'number') return
      let num = pNum < FIRST ? FIRST : pNum
      if (pNum > this.totalPage && this.totalPage > 0) num = this.totalPage

      // exit when duplicate operation
      if (num === this.current && this.pageSize === this.lastPageSize) return

      this.current = num
      // update v-model value
      if (respond) this.$emit('input', this.current)
      this.lastPageSize = this.pageSize
      this.change()
    },
    reload () {
      this.change()
    },
    change () {
      this.$emit('page-change', {
        pageNumber: this.current,
        pageSize: Number(this.pageSize)
      })
    },
    getPageNumberStart () {
      const { current, totalPage, pageNumberSize } = this

      if (totalPage <= pageNumberSize) return FIRST

      const half = Math.floor(pageNumberSize / 2)
      const lastRangeStart = totalPage - pageNumberSize + 1
      const start = current - half

      if (start < FIRST) return FIRST
      if (start > lastRangeStart) return lastRangeStart

      return start
    },
    pageNumberGenerator (classes, num, text) {
      const option = {
        attrs: { href: 'javascript:void(0)' },
        on: { click: () => this.goPage(num) }
      }
      return this.$createElement('li', { class: classes }, [
        this.$createElement('a', option, text)
      ])
    }
  },
  mounted () {
    this.goPage(this.value || FIRST)
  }
}

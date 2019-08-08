import '../../styles/animated.styl'
import mItem from './Item'

export default {
  name: 'v-regular-menu',
  components: {
    'menu-item': mItem
  },
  render (h) {
    if (Array.isArray(this.data) && this.data.length) {
      const child = []
      child.push(h('ul', {
        class: {
          'sm-results sm-regular vivify': true,
          'sm-menu-root': true,
          fadeInLeft: this.fadeInLeft
        },
        directives: [{ name: 'show', value: this.current === 'root' }]
      }, this.data.map((val, index) => {
        const options = {
          props: {
            data: val,
            key: `root-${index}`
          },
          nativeOn: {
            click: () => this.switchSub(val)
          }
        }
        /**
         * scoped slot with named slot
         */
        if ('row' in this.$scopedSlots) {
          // same as <template #row="{ row }">
          options.scopedSlots = {
            row: props => {
              // same as <slot name="row" :row="row">
              return this.$scopedSlots.row({ row: props.row })
            }
          }
        }
        return h('menu-item', options)
      })))
      /**
       * build children menus
       */
      child.push(this.buildChild(h))
      return h('div', { class: 'sm-result-area' }, child)
    }
  },
  props: {
    data: {
      type: Array,
      required: true
    },
    show: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      child: [],
      current: 'root',
      fadeInLeft: false,
      fadeInRight: true,
      subMenuSlide: {
        fadeInLeft: false,
        fadeInRight: true
      }
    }
  },
  watch: {
    show (val) {
      this.$nextTick(() => {
        if (!val) {
          this.current = 'root'
          this.fadeInLeft = false
        }
      })
    },
    data () {
      this.getSubs()
    }
  },
  methods: {
    pushMenu (menu, parent, index) {
      if (menu && menu.children && menu.children.length) {
        const prefix = 'menu-'
        if (parent) {
          menu.mKey = parent.mKey + '-' + index
          menu.pKey = parent.mKey
        } else {
          menu.mKey = prefix + index
          menu.pKey = 'root'
        }
        this.child.push(menu)
        for (let i = 0; i < menu.children.length; i++) {
          if (menu.children[i] && menu.children[i].children) {
            this.pushMenu(menu.children[i], menu, i)
          }
        }
      }
    },
    getSubs () {
      if (this.data && this.data.length) {
        this.child = []
        this.data.forEach((val, index) => this.pushMenu(val, null, index))
      }
    },
    switchSub (row, parent) {
      if (row && Object.keys(row).length) {
        if (parent) {
          if (row.pKey) this.current = row.pKey
          if (row.pKey === 'root') this.fadeInLeft = true
          else {
            this.subMenuSlide.fadeInLeft = true
            this.subMenuSlide.fadeInRight = false
          }
        } else {
          if (row.mKey) this.current = row.mKey
          if (row.children) {
            this.subMenuSlide.fadeInLeft = false
            this.subMenuSlide.fadeInRight = true
          }
        }
        if (!row.disabled && !row.children) this.$emit('close')
      }
    },
    /**
     * build sub menus
     * @param {*} h
     */
    buildChild (h) {
      if (this.child.length) {
        return this.child.map((val, index) => {
          const child = []
          const header = h('li', { class: 'sm-sub-header' }, [
            h('span', {
              class: 'sm-sub-back',
              on: {
                click: () => this.switchSub(val, true)
              }
            }, [
              h('i', { class: 'sm-iconfont sm-icon-back' })
            ]),
            h('span', {
              class: 'sm-sub-caption',
              domProps: { innerHTML: val.content }
            })
          ])
          /**
           * build children menu header bar
           */
          child.push(header)
          child.push(h('li', { class: 'sm-divider' }))
          /**
           * build children menus
           */
          if (val.children && val.children.length) {
            child.push(val.children.map((value, idx) => {
              const options = {
                props: {
                  data: value,
                  key: `item-${idx}`
                },
                nativeOn: {
                  click: () => this.switchSub(value)
                }
              }
              /**
               * scoped slot with named slot
               */
              if ('row' in this.$scopedSlots) {
                // same as <template #row="{ row }">
                options.scopedSlots = {
                  row: props => {
                    // same as <slot name="row" :row="row">
                    return this.$scopedSlots.row({ row: props.row })
                  }
                }
              }
              return h('menu-item', options)
            }))
          }
          return h('ul', {
            class: {
              ...this.subMenuSlide,
              'sm-results sm-regular vivify': true,
              'sm-sub-menu': true
            },
            props: {
              key: `sub-menu-${index}`
            },
            directives: [{ name: 'show', value: this.current === val.mKey }]
          }, child)
        })
      }
    }
  },
  beforeMount () {
    this.getSubs()
  }
}

import '../../styles/animated.styl'
import mItem from './Item'
import { DIVIDER, MENU_ROOT } from '../../constants'
import { flat } from '../../helper'

export default {
  name: 'v-regular-menu',
  components: {
    'menu-item': mItem
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
      menus: [],
      current: -1,
      fadeInLeft: false,
      fadeInRight: false
    }
  },
  watch: {
    show (val) {
      this.$nextTick(() => {
        if (!val) this.reset()
      })
    },
    data () {
      this.analysis()
    }
  },
  render (h) {
    if (this.menus.length && this.current >= 0) {
      const menu = this.menus[this.current]
      const child = []
      if (menu.key !== MENU_ROOT) {
        const header = h('li', { class: 'sm-sub-header' }, [
          h('span', {
            class: 'sm-sub-back',
            on: {
              click: () => this.switch(menu.parentKey, false)
            }
          }, [
            h('i', { class: 'sm-iconfont sm-icon-back' })
          ]),
          h('span', {
            class: 'sm-sub-caption',
            domProps: { innerHTML: menu.parent.content }
          })
        ])
        /**
         * build children menu header bar
         */
        child.push(header)
        child.push(h('li', { class: DIVIDER }))
      }
      child.push(...menu.data.map((val, index) => {
        const options = {
          props: {
            data: val
          }
        }
        // switch to children menu
        if (val.children) {
          options.nativeOn = {
            click: e => {
              e.preventDefault()
              this.switch(val.children)
            }
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
      /**
       * build children menus
       */
      return h('div', { class: 'sm-result-area' }, [
        h('ul', {
          class: {
            'sm-results sm-regular vivify': true,
            fadeInLeft: this.fadeInLeft,
            fadeInRight: this.fadeInRight
          }
        }, child)
      ])
    }
  },
  methods: {
    analysis () {
      this.menus = flat(this.data)
      this.reset()
    },
    reset () {
      this.current = this.find(MENU_ROOT)
      this.resetAnimated()
    },
    resetAnimated () {
      this.fadeInLeft = false
      this.fadeInRight = false
    },
    /**
     * switch current menu in multiple level menu mode
     *
     * @param {string} key - target menu key
     * @param {boolean} [forword=true]
     */
    switch (key, forword = true) {
      this.current = this.find(key)
      if (forword) {
        this.fadeInRight = true
      } else {
        this.fadeInLeft = true
      }
      window.setTimeout(() => {
        this.resetAnimated()
      }, 100)
    },
    find (key) {
      return this.menus.findIndex(val => val.key === key)
    }
  },
  beforeMount () {
    this.analysis()
  }
}

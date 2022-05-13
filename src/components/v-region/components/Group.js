import '../styles/icons.styl'
import '../styles/group.styl'

import data from '../mixins/data'
import method from '../mixins/method'
import {
  PROVINCE_LEVEL,
  CITY_LEVEL,
  AREA_LEVEL,
  TOWN_LEVEL,
  LEVELS,
  LEVEL_LIST
} from '../constants'

export default {
  name: 'Group',
  mixins: [data, method],
  inheritAttrs: false,
  props: {
    search: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      list: [],
      level: -1
    }
  },
  watch: {
    /**
     * current region group
     */
    level (val) {
      this.list = this.getList(val)
      this.$emit('adjust')
    }
  },
  render (h) {
    const contents = []

    contents.push(this.buildHeader())
    contents.push(this.buildSearch())
    contents.push(this.buildTabs())
    contents.push(this.buildContent())

    return h('div', contents)
  },
  methods: {
    buildHeader () {
      const h = this.$createElement
      const child = []

      child.push(h('h3', [
        h('span', {
          class: {
            'rg-header-selected': this.selectedText
          }
        }, this.selectedText || this.lang.defaultHead)
      ]))

      // TODO:按钮通过绝对定位，会有消失不见的问题
      child.push(h('button', {
        attrs: {
          type: 'button',
          title: this.lang.clear
        },
        class: 'rg-removeall-button',
        on: {
          click: this.clear
        }
      }, [
        h('i', { class: 'rg-iconfont rg-icon-remove' })
      ]))

      // child.push(h('button', {
      //   attrs: {
      //     type: 'button',
      //     title: this.lang.done
      //   },
      //   class: 'rg-done-button',
      //   on: {
      //     click: this.close
      //   }
      // }, [
      //   h('i', { class: 'rg-iconfont rg-icon-done' })
      // ]))

      return h('div', { class: 'rg-header' }, child)
    },
    // 构建搜索栏
    buildSearch () {
      if (!this.search) return

      const h = this.$createElement
      const option = {
        ref: 'search',
        class: 'rg-input',
        attrs: {
          type: 'text',
          autocomplete: 'off'
        },
        on: {
          input: e => this.query(e.target.value.trim())
        }
      }
      const input = h('input', option)
      return h('div', { class: 'rg-search' }, [input])
    },
    // 构建选择卡栏
    buildTabs () {
      const h = this.$createElement
      const child = []
      LEVELS.forEach(val => {
        if (this.levelAvailable(val.index)) {
          child.push(h('li', {
            key: val.index,
            class: {
              active: val.index === this.level
            }
          }, [
            h('a', {
              attrs: {
                href: 'javascript:void(0)'
              },
              on: {
                click: () => {
                  this.level = val.index
                }
              }
            }, val.title)
          ]))
        }
      })
      return h('div', { class: 'rg-level-tabs' }, [
        h('ul', child)
      ])
    },
    // 构建内容区域
    buildContent () {
      const h = this.$createElement
      const { list } = this
      const child = []
      if (list.length) {
        const listItmes = list.map(val => {
          const option = {
            key: val.key,
            class: {
              'rg-item': true,
              active: this.match(val)
            },
            on: {
              mouseup: () => { this.pick(val) }
            }
          }
          return h('li', option, val.value)
        })
        child.push(...listItmes)
      } else {
        child.push(h('li', { class: 'rg-message-box' }, this.lang.noMatch))
      }
      return h('div', { class: 'rg-results-container' }, [
        h('ul', { class: 'rg-results' }, child)
      ])
    },
    // check level available
    levelAvailable (level) {
      switch (level) {
        case PROVINCE_LEVEL: return true
        case CITY_LEVEL: return this.city
        case AREA_LEVEL: return this.city && this.area
        case TOWN_LEVEL: return this.city && this.area && this.town
      }
    },
    // load list when switch to next level
    getList (val) {
      switch (val) {
        case PROVINCE_LEVEL: return this.listProvince
        case CITY_LEVEL: return this.listCity
        case AREA_LEVEL: return this.listArea
        case TOWN_LEVEL: return this.listTown
      }
    },
    match (item) {
      if (!item || !Object.keys(item).length) return false
      const { province, city, area, town } = this.region
      const key = item.key
      switch (this.level) {
        case PROVINCE_LEVEL: return province && province.key === key
        case CITY_LEVEL: return city && city.key === key
        case AREA_LEVEL: return area && area.key === key
        case TOWN_LEVEL: return town && town.key === key
      }
    },
    nextLevel (level) {
      if (level === TOWN_LEVEL) return level
      return LEVELS[level + 1].index
    },
    pick (item) {
      const nextLevel = this.nextLevel(this.level)
      const attr = LEVEL_LIST[this.level]
      this.region[attr] = item
      this.change()

      if (this.levelAvailable(nextLevel) && this.level !== nextLevel) {
        this.level = nextLevel
      } else {
        this.$emit('complete')
      }
    },
    clear () {
      this.clearRegion(PROVINCE_LEVEL)
      this.level = PROVINCE_LEVEL
      this.change()
    },
    /**
     * region search
     * search region description first, if no result, then search region key
     * @param value
     */
    query (value) {
      const list = this.getList(this.level)
      let tmp = []
      tmp = list.filter(val => val.value.toLowerCase().includes(value.toLowerCase()))
      if (tmp.length === 0) {
        tmp = list.filter(val => val.key.includes(value))
      }
      this.list = tmp
    }
  },
  beforeMount () {
    this.level = PROVINCE_LEVEL
  }
}

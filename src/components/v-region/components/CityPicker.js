import '../styles/icons.styl'
import '../styles/city.styl'

import { srcProvince, srcCity } from '../formatted'
import selector from '../mixins/selector'
import search from '../mixins/selectorWithSearch'
import { CN } from '../language'
import { cityDirectory } from '../utils/parse'
import dropdown from 'v-dropdown'

// 完整的城市列表（基于省份进行分组）
const fullCityDirectory = cityDirectory()

export default {
  name: 'CityPicker',
  mixins: [search, selector],
  inheritAttrs: false,
  components: { dropdown },
  props: {
    value: Array,
    language: { type: String, default: CN }
  },
  data () {
    return {
      /**
       * 数据列表格式
       * [{
       *   province: { key: '', value: ''},
       *   citys: [
       *     {key: '', value: ''},
       *     {key: '', value: ''},
       *     ...
       *   ]
       * }]
       */
      list: [],
      picked: []
    }
  },
  computed: {
    selectedText () {
      return this.picked.map(val => val.value).join(',')
    }
  },
  watch: {
    /**
     * 初始化数据
     */
    value: {
      handler (val) {
        if (!Array.isArray(val) || this.equal(val)) return

        if (val.length) {
          const provincialCity = srcProvince.filter(item => val.includes(item.key))
          // marge province and city
          this.picked = [
            ...provincialCity,
            ...srcCity.filter(item => val.includes(item.key))
          ]
        } else {
          this.picked = []
        }

        this.emit(false)
      },
      immediate: true
    }
  },
  render (h) {
    const child = []

    child.push(this.buildCaller(h))

    // search bar
    child.push(h('div', { class: 'rg-search-bar' }, [
      h('input', {
        ref: 'search',
        class: 'rg-input',
        attrs: {
          type: 'text',
          autocomplete: 'off'
        },
        on: {
          input: e => this.query(e.target.value.trim())
        }
      })
    ]))

    // province grouped city list
    child.push(h('div', { class: 'rg-picker' }, this.list.map(val => {
      return h('div', {
        class: 'rg-picker__row',
        key: val.province.key
      }, [
        h('dl', [
          h('dt', val.province.value),
          h('dd', [
            h('ul', val.citys.map(city => {
              return h('li', {
                key: city.key,
                class: {
                  selected: this.inPicked(city)
                },
                on: {
                  click: () => {
                    this.pick(city)
                  }
                }
              }, city.value)
            }))
          ])
        ])
      ])
    })))

    const dropdownOption = {
      ref: 'drop',
      props: {
        border: false
      },
      on: {
        show: this.showChange
      }
    }
    return h('dropdown', dropdownOption, child)
  },
  methods: {
    emit (input = true) {
      if (input) this.$emit('input', this.picked.map(val => val.key))
      this.$emit('values', this.picked)
    },
    /**
     * 检查初始化数据是否与当前选中数据相同
     *
     * @param {string[]} keys
     * @returns {boolean}
     */
    equal (keys) {
      if (keys.length === this.picked.length) {
        // 均为空数组
        if (!keys.length) return true
        return this.picked.every(val => keys.includes(val.key))
      } else {
        return false
      }
    },
    clear () {
      this.picked = []
      this.close()
      this.emit()
    },
    pick (item) {
      if (this.inPicked(item)) {
        this.picked.splice(this.picked.findIndex(val => val.key === item.key), 1)
      } else {
        this.picked.push(item)
      }
      this.emit()
      this.adjust()
    },
    inPicked (city) {
      if (!city || !this.picked.length) return false
      return this.picked.some(val => val.key === city.key)
    },
    /**
     * 城市快速搜索
     *
     * 搜索顺序
     * 1. 城市名称
     * 2. 城市编码
     */
    query (value) {
      if (value) {
        const list = []
        fullCityDirectory.forEach(val => {
          const citys = val.citys.filter(city => new RegExp(value).test(city.value))
          if (citys.length) list.push({ province: val.province, citys: citys })
        })
        this.list = list
      } else {
        this.list = fullCityDirectory
      }
      this.adjust()
    }
  },
  created () {
    this.list = fullCityDirectory
  }
}

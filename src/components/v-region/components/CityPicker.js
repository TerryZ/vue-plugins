import '../styles/icons.styl'
import '../styles/city.styl'

import { srcProvince, srcCity } from '../formatted'
import selector from '../mixins/selector'
import search from '../mixins/selectorWithSearch'
import dropdown from 'v-dropdown'

export default {
  name: 'CityPicker',
  mixins: [search, selector],
  inheritAttrs: false,
  components: { dropdown },
  props: {
    selected: Array,
    i18n: {
      type: String,
      default: 'cn'
    },
    value: Array
  },
  data () {
    return {
      /**
       * display data list
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
      // converted data list
      listBuilt: [],
      query: '',
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
     * region search
     * search region description first, if no result, then search region key
     * @param value
     */
    query (value) {
      const val = value.trim()
      if (!val) this.list = this.listBuilt.slice()
      else {
        const list = []
        this.listBuilt.forEach(val => {
          const citys = val.citys.filter(city => new RegExp(val).test(city.value))
          if (citys.length) list.push({ province: val.province, citys: citys })
        })
        this.list = list
      }
    },
    /**
     * initialize region selected
     */
    selected: {
      handler (value) {
        if (value && Array.isArray(value) && value.length) {
          const tmp = srcProvince.filter(val => value.includes(val.key))
          this.picked = [...tmp, ...srcCity.filter(val => value.includes(val.key))]
          if (this.picked.length) this.$emit('values', this.picked)
        }
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
        domProps: {
          value: this.query.trim()
        },
        on: {
          input: e => {
            this.query = e.target.value.trim()
          }
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
                  mouseup: () => {
                    this.pick(city)
                  }
                }
              }, city.value)
            }))
          ])
        ])
      ])
    })))

    return h('dropdown', {
      ref: 'drop',
      props: {
        border: false
      },
      on: {
        show: this.showChange
      }
    }, child)
  },
  methods: {
    prepared () {
      // beijing, tianjin, shanghai, chongqing
      const municipalitys = ['110000', '120000', '310000', '500000']
      const municipality = '000000'
      // hongkong, macao
      const specials = ['810000', '820000']
      const special = '000010'
      const listTmp = []
      const municipalityObj = {
        province: { key: municipality, value: '直辖市' },
        citys: []
      }
      const specialObj = {
        province: { key: special, value: '特别行政区' },
        citys: []
      }
      // set provinces
      srcProvince.forEach(val => {
        if (municipalitys.includes(val.key)) municipalityObj.citys.push(val)
        else if (specials.includes(val.key)) specialObj.citys.push(val)
        else listTmp.push({ province: val, citys: [] })
      })
      listTmp.forEach(val => {
        val.citys = srcCity.filter(value => {
          const num = Number.parseInt(val.province.key)
          return (value.key - num) < 1e4 && (value.key % num) < 1e4
        })
      })
      this.listBuilt = [...[municipalityObj], ...listTmp, ...[specialObj]]
    },
    clear () {
      this.picked = []
      this.close()
    },
    pick (item) {
      if (!this.picked.includes(item)) {
        this.picked.push(item)
      } else {
        this.picked.splice(this.picked.findIndex(val => val.key === item.key), 1)
      }
      this.$emit('values', this.picked)
    },
    inPicked (city) {
      if (!city || !this.picked.length) return false
      return this.picked.some(val => {
        return val.key === city.key
      })
    }
  },
  created () {
    this.prepared()
    this.list = this.listBuilt.slice()
  }
}

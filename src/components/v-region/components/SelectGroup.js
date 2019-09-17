import '../styles/select.styl'

import data from '../mixins/data'
import method from '../mixins/method'
import select from './Select'

export default {
  name: 'SelectGroup',
  mixins: [data, method],
  components: {
    'r-select': select
  },
  props: {
    blank: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  inheritAttrs: false,
  provide () {
    return {
      disabled: this.disabled,
      blank: this.blank
    }
  },
  render (h) {
    const child = []

    child.push(this.build(h, {
      list: this.listProvince,
      model: this.region.province,
      callback: val => {
        this.region.province = val
      }
    }))

    if (this.city) {
      child.push(this.build(h, {
        list: this.listCity,
        model: this.region.city,
        callback: val => {
          this.region.city = val
        }
      }))
    }
    if (this.city && this.area) {
      child.push(this.build(h, {
        list: this.listArea,
        model: this.region.area,
        callback: val => {
          this.region.area = val
        }
      }))
    }
    if (this.city && this.area && this.town && this.haveTown) {
      child.push(this.build(h, {
        list: this.listTown,
        model: this.region.town,
        callback: val => {
          this.region.town = val
        }
      }))
    }

    return h('div', child)
  },
  methods: {
    build (h, { list, model, callback }) {
      return h('r-select', {
        props: {
          'blank-text': this.lang.pleaseSelect,
          list: list
        },
        attrs: {
          value: model
        },
        on: {
          input: val => {
            callback(val)
            this.change()
          }
        }
      })
    },
    provinceChange (newVal, oldVal) {
      this.baseProvinceChange(newVal, oldVal)
    },
    cityChange (newVal, oldVal) {
      this.baseCityChange(newVal, oldVal)
    },
    areaChange (newVal, oldVal) {
      this.baseAreaChange(newVal, oldVal)
    },
    townChange (newVal, oldVal) {
      this.baseTownChange(newVal, oldVal)
    }
  }
}

import data from '../mixins/data'
import method from '../mixins/method'
import select from './Select'
export default {
  render (h) {
    const child = []

    child.push(this.build(h, this.listProvince, this.dProvince, val => {
      this.dProvince = val
    }))

    if (this.city) {
      child.push(this.build(h, this.listCity, this.dCity, val => {
        this.dCity = val
      }))
    }
    if (this.city && this.area) {
      child.push(this.build(h, this.listArea, this.dArea, val => {
        this.dArea = val
      }))
    }
    if (this.city && this.area && this.town && this.haveTown) {
      child.push(this.build(h, this.listTown, this.dTown, val => {
        this.dTown = val
      }))
    }

    return h('div', child)
  },
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
  methods: {
    build (h, list, model, callback) {
      return h('r-select', {
        props: {
          'blank-text': this.lang.pleaseSelect,
          list: list
        },
        attrs: {
          value: model
        },
        on: {
          input: callback
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

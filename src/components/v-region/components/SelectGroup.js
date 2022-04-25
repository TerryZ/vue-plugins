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
    const { province, city, area, town } = this.region

    child.push(this.build({
      list: this.listProvince,
      model: province,
      callback: val => {
        this.region.province = val
      }
    }))

    if (this.city) {
      child.push(this.build({
        list: this.listCity,
        model: city,
        callback: val => {
          this.region.city = val
        }
      }))
    }
    if (this.city && this.area) {
      child.push(this.build({
        list: this.listArea,
        model: area,
        callback: val => {
          this.region.area = val
        }
      }))
    }
    if (this.city && this.area && this.town) {
      child.push(this.build({
        list: this.listTown,
        model: town,
        callback: val => {
          this.region.town = val
        }
      }))
    }

    return h('div', child)
  },
  methods: {
    build ({ list, model, callback }) {
      return this.$createElement('r-select', {
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
    }
  }
}

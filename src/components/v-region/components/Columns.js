import '../styles/icons.styl'
import '../styles/column.styl'

import RegionColumn from './Column'

import data from '../mixins/data'
import method from '../mixins/method'
import { PROVINCE_LEVEL } from '../constants.js'

export default {
  name: 'Columns',
  mixins: [data, method],
  inheritAttrs: false,
  components: {
    RegionColumn
  },
  render (h) {
    const columns = []
    // province
    columns.push(h(...this.build({
      list: this.listProvince,
      haveChild: this.city,
      value: this.region.province,
      callback: val => {
        this.region.province = val
      }
    })))
    // city
    if (this.listCity.length) {
      columns.push(h(...this.build({
        list: this.listCity,
        haveChild: this.area,
        value: this.region.city,
        callback: val => {
          this.region.city = val
        }
      })))
    }
    // area
    if (this.listArea.length) {
      columns.push(h(...this.build({
        list: this.listArea,
        haveChild: this.town,
        value: this.region.area,
        callback: val => {
          this.region.area = val
        }
      })))
    }
    // town
    if (this.listTown.length) {
      columns.push(h(...this.build({
        list: this.listTown,
        haveChild: false,
        value: this.region.town,
        callback: val => {
          this.region.town = val
        }
      })))
    }

    return h('div', { class: 'rg-column-container' }, columns)
  },
  methods: {
    build ({ list, haveChild, value, callback }) {
      return ['region-column', {
        props: {
          list: list,
          haveChild: haveChild,
          value: value
        },
        on: {
          input: val => {
            callback(val)
            this.change()
            // this.adjust()
            this.$emit('adjust')
            if (this.isDone()) this.done()
          }
        }
      }]
    },
    isDone () {
      return this.availableLevels.join(',') === this.currentLevels.join(',')
    },
    clear () {
      this.clearRegion(PROVINCE_LEVEL)
      this.change()
      this.close()
    },
    done () {
      this.$emit('done')
    }
  }
}

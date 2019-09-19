import '../styles/icons.styl'
import '../styles/column.styl'

import dropDown from 'v-dropdown'
import data from '../mixins/data'
import method from '../mixins/method'
import selector from '../mixins/selector'
import column from './Column'

import { PROVINCE_LEVEL, CITY_LEVEL, AREA_LEVEL, TOWN_LEVEL } from '../constants.js'

export default {
  name: 'ColumnGroup',
  mixins: [data, method, selector],
  inheritAttrs: false,
  components: {
    dropdown: dropDown,
    'v-column': column
  },
  data () {
    return {
      operLevel: -1
    }
  },
  render (h) {
    const child = []

    child.push(this.buildCaller(h))

    const column = []
    // province
    column.push(h(...this.build({
      level: PROVINCE_LEVEL,
      list: this.listProvince,
      haveChild: this.city,
      value: this.region.province,
      callback: val => {
        this.region.province = val
        console.dir(this.region)
      }
    })))
    // city
    if (this.listCity.length) {
      column.push(h(...this.build({
        level: CITY_LEVEL,
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
      column.push(h(...this.build({
        level: AREA_LEVEL,
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
      column.push(h(...this.build({
        level: TOWN_LEVEL,
        list: this.listTown,
        haveChild: false,
        value: this.region.town,
        callback: val => {
          this.region.town = val
        }
      })))
    }

    child.push(h('div', { class: 'rg-column-container' }, column))

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
    build ({ level, list, haveChild, value, callback }) {
      return ['v-column', {
        nativeOn: {
          click: () => {
            this.operLevel = level
          }
        },
        props: {
          list: list,
          haveChild: haveChild,
          value: value
        },
        on: {
          input: val => {
            callback(val)
            this.change()
          }
        }
      }]
    },
    provinceChange (newVal, oldVal) {
      this.baseProvinceChange(newVal, oldVal)
      this.checkLevel(PROVINCE_LEVEL)
    },
    cityChange (newVal, oldVal) {
      this.baseCityChange(newVal, oldVal)
      this.checkLevel(CITY_LEVEL)
    },
    areaChange (newVal, oldVal) {
      this.baseAreaChange(newVal, oldVal)
      this.checkLevel(AREA_LEVEL)
    },
    townChange (newVal, oldVal) {
      this.baseTownChange(newVal, oldVal)
      this.checkLevel(TOWN_LEVEL)
    },
    // checkLevel (level) {
    //   if (this.operLevel === -1 || this.operLevel !== level) return
    //   let close = false
    //   switch (this.operLevel) {
    //     case PROVINCE_LEVEL:
    //       if (!this.city) close = true
    //       break
    //     case CITY_LEVEL:
    //       if (!this.area) close = true
    //       break
    //     case AREA_LEVEL:
    //       if (!this.town || (this.town && !this.haveTown)) close = true
    //       break
    //     case TOWN_LEVEL:
    //       close = true
    //       break
    //   }
    //   if (close) {
    //     this.operLevel = -1
    //     this.close()
    //   }
    // },
    clear () {
      this.dProvince = null
    }
  }
}

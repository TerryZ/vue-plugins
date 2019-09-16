import '../styles/icons.styl'
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
    column.push(h('v-column', {
      nativeOn: {
        click: () => {
          this.operLevel = PROVINCE_LEVEL
        }
      },
      props: {
        list: this.listProvince,
        haveChild: this.city,
        value: this.dProvince
      },
      on: {
        input: value => {
          this.dProvince = value
        }
      }
    }))
    // city
    if (this.listCity.length) {
      column.push(h('v-column', {
        nativeOn: {
          click: () => {
            this.operLevel = CITY_LEVEL
          }
        },
        props: {
          list: this.listCity,
          haveChild: this.area,
          value: this.dCity
        },
        on: {
          input: value => {
            this.dCity = value
          }
        }
      }))
    }
    // area
    if (this.listArea.length) {
      column.push(h('v-column', {
        nativeOn: {
          click: () => {
            this.operLevel = AREA_LEVEL
          }
        },
        props: {
          list: this.listArea,
          haveChild: this.town && this.haveTown,
          value: this.dArea
        },
        on: {
          input: value => {
            this.dArea = value
          }
        }
      }))
    }
    // town
    if (this.listTown.length) {
      column.push(h('v-column', {
        nativeOn: {
          click: () => {
            this.operLevel = TOWN_LEVEL
          }
        },
        props: {
          list: this.listTown,
          haveChild: false,
          value: this.dTown
        },
        on: {
          input: value => {
            this.dTown = value
          }
        }
      }))
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
    checkLevel (level) {
      if (this.operLevel === -1 || this.operLevel !== level) return
      let close = false
      switch (this.operLevel) {
        case PROVINCE_LEVEL:
          if (!this.city) close = true
          break
        case CITY_LEVEL:
          if (!this.area) close = true
          break
        case AREA_LEVEL:
          if (!this.town || (this.town && !this.haveTown)) close = true
          break
        case TOWN_LEVEL:
          close = true
          break
      }
      if (close) {
        this.operLevel = -1
        this.close()
      }
    },
    clear () {
      this.dProvince = null
    }
  }
}

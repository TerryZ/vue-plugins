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

    const buildColumn = (level, condition, list, haveChild, model) => {
      if (!condition) return null
      return h('v-column', {
        nativeOn: {
          click: () => {
            this.operLevel = level
          }
        },
        props: {
          list: list,
          haveChild: haveChild,
          value: model
        },
        on: {
          // TODO: Need to check function whether working
          input: value => {
            model = value
          }
        }
      })
    }

    child.push(h('div', { class: 'rg-column-container' }, [
      buildColumn(
        PROVINCE_LEVEL,
        this.listProvince.length,
        this.listProvince,
        this.city,
        this.dProvince
      ),
      buildColumn(
        CITY_LEVEL,
        this.listCity.length,
        this.listCity,
        this.area,
        this.dCity
      ),
      buildColumn(
        AREA_LEVEL,
        this.listArea.length,
        this.listArea,
        this.town && this.haveTown,
        this.dArea
      ),
      buildColumn(
        TOWN_LEVEL,
        this.listTown.length,
        this.listTown,
        false,
        this.dTown
      )
    ]))

    return h('dropdown', {
      ref: 'drop',
      props: {
        border: false
      },
      on: {
        show: this.showChange
      }
    })
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

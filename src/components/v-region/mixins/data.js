import { PROVINCE_LEVEL } from '../constants'
import { getRegionByModel, validModel, availableLevels } from '../helper'

export default {
  props: {
    city: {
      type: Boolean,
      default: true
    },
    area: {
      type: Boolean,
      default: true
    },
    town: {
      type: Boolean,
      default: false
    },
    i18n: {
      type: String,
      default: 'cn'
    },
    selected: Object,
    value: Object
  },
  data () {
    return {
      // levels list data
      listProvince: [],
      listCity: [],
      listArea: [],
      listTown: [],

      lang: {},
      init: this.selected,
      haveTown: true,

      // return data
      dProvince: null,
      dCity: null,
      dArea: null,
      dTown: null,

      region: {
        province: null,
        city: null,
        area: null,
        town: null
      }
    }
  },
  watch: {
    dProvince: {
      handler: 'provinceChange',
      deep: true
    },
    dCity: {
      handler: 'cityChange',
      deep: true
    },
    dArea: {
      handler: 'areaChange',
      deep: true
    },
    dTown: {
      handler: 'townChange',
      deep: true
    },
    /**
     * initialize region selected
     */
    selected: {
      handler (val) {
        if (val && Object.keys(val).length) {
          this.reset()
          this.init = val
          this.initSelected(PROVINCE_LEVEL)
        }
      },
      deep: true
    },
    value: {
      handler (val) {
        if (validModel(val)) {
          this.clearRegion(PROVINCE_LEVEL)
          this.region = getRegionByModel(val, availableLevels(this.city, this.area, this.town))
          this.change(true)
        }
      },
      deep: true
    }
  },
  computed: {
    selectedText () {
      const arr = []
      if (this.dProvince) arr.push(this.dProvince.value)
      if (this.dCity) arr.push(this.dCity.value)
      if (this.dArea) arr.push(this.dArea.value)
      if (this.dTown) arr.push(this.dTown.value)
      return arr.join('')
    },
    lCity () {
      if (this.city) {

      } else {
        return []
      }
    },
    lArea () {

    },
    lTown () {

    }
  }
}

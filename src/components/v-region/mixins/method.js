import language from '../language'
import { srcProvince } from '../formatted.js'
import { PROVINCE_LEVEL, CITY_LEVEL, AREA_LEVEL, TOWN_LEVEL, LEVEL_LIST } from '../constants'

import { loadCity, loadArea, loadTown } from '../helper'

export default {
  methods: {
    /**
     * Check if model and region data are equal
     *
     * @param {object} model
     * @returns
     */
    differentModel (model) {
      const levelResult = []
      const { province, city, area, town } = this.region
      levelResult.push(Boolean(model.province === province || (province && province.key) === model.province))
      levelResult.push(Boolean(model.city === city || (city && city.key) === model.city))
      levelResult.push(Boolean(model.area === area || (area && area.key) === model.area))
      levelResult.push(Boolean(model.town === town || (town && town.key) === model.town))
      // console.log(levelResult)
      return levelResult.some(val => val === false)
    },
    /**
     * Region content change
     *
     * @param {boolean} [initialize=false]
     */
    change (initialize = false) {
      if (!this.checkLevel(this.listProvince, this.region.province)) {
        this.clearRegion(PROVINCE_LEVEL)
      }
      if (this.city) {
        if (this.region.province) {
          this.listCity = loadCity(this.region.province)
        }
        if (!this.region.province || !this.checkLevel(this.listCity, this.region.city)) {
          this.clearRegion(CITY_LEVEL)
        }
      }
      if (this.area) {
        if (this.region.city) {
          this.listArea = loadArea(this.region.city)
        }
        if (!this.region.city || !this.checkLevel(this.listArea, this.region.area)) {
          this.clearRegion(AREA_LEVEL)
        }
      }
      if (this.town) {
        if (this.region.area) {
          this.listTown = loadTown(this.region.area)
        }
        if (!this.region.area || !this.checkLevel(this.listTown, this.region.town)) {
          this.clearRegion(TOWN_LEVEL)
        }
      }
      if (!initialize) {
        this.$emit('input', Object.fromEntries(
          Object.entries(this.region)
            .map(([key, value]) => {
              return [key, value ? value.key : null]
            })
        ))
      }
      this.$emit('values', JSON.parse(JSON.stringify(this.region)))
    },
    // clear region field
    clearRegion (level) {
      const fields = LEVEL_LIST.slice(level)
      Object.keys(this.region).forEach(val => {
        if (fields.includes(val)) this.region[val] = null
      })
      /* eslint-disable no-fallthrough */
      switch (level) {
        case PROVINCE_LEVEL: this.listCity = []
        case CITY_LEVEL: this.listArea = []
        case AREA_LEVEL: this.listTown = []
      }
    },
    checkLevel (list, attr) {
      if (!list.length) return false
      if (!attr) return true
      return list.some(val => {
        return val.key === attr.key
      })
    }
  },
  created () {
    this.lang = language[this.i18n]
  },
  beforeMount () {
    // sort by length and code
    this.listProvince = this.type === 'group'
      ? srcProvince.slice().sort((a, b) => {
        const gap = a.value.length - b.value.length
        return gap === 0 ? Number(a.key) - Number(b.key) : gap
      })
      : srcProvince.slice()
  }
}

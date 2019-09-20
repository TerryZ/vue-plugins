import language from '../language'
import { srcProvince } from '../formatted.js'
import { PROVINCE_LEVEL, CITY_LEVEL, AREA_LEVEL, TOWN_LEVEL, LEVEL_LIST } from '../constants'

import { loadCity, loadArea, loadTown } from '../helper'

export default {
  methods: {
    changeValues () {
      this.$nextTick(() => {
        this.$emit('values', {
          province: this.dProvince,
          city: this.dCity,
          area: this.dArea,
          town: this.dTown
        })
      })
    },
    reset () {
      this.dProvince = null
      this.dCity = null
      this.dArea = null
      this.dTown = null
    },
    initSelected (level) {
      const ini = this.init; let count = 0; const init = !!this.init
      if (ini && Object.keys(ini).length) {
        switch (level) {
          case PROVINCE_LEVEL:// province
            if (ini.province) {
              this.dProvince = this.listProvince.find(val => val.key === ini.province)
            }
            break
          case CITY_LEVEL:// city
            if (this.city && ini.city && this.listCity.length) {
              this.dCity = this.listCity.find(val => val.key === ini.city)
            }
            break
          case AREA_LEVEL:// area
            if (this.area && ini.area && this.listArea.length) {
              this.dArea = this.listArea.find(val => val.key === ini.area)
            }
            break
          case TOWN_LEVEL:// town
            if (this.town && ini.town && this.listTown.length) {
              this.dTown = this.listTown.find(val => val.key === ini.town)
            }
            break
        }
        if (ini.province) count++
        if (this.city && ini.city) count++
        if (this.area && ini.area) count++
        if (this.town && ini.town) count++
        // level number start with 0
        if ((level + 1) === count) this.init = null
      }
      return init
    },
    baseProvinceChange (newVal, oldVal) {
      if (this.city) {
        this.listCity = loadCity(newVal)
        // clear city selected result
        if (!this.initSelected(CITY_LEVEL)) {
          if (this.dCity) {
            this.dCity = null
          } else {
            this.cityChange(null)
          }
        }
      } else this.changeValues()
    },
    baseCityChange (newVal, oldVal) {
      if (this.area) {
        this.listArea = loadArea(newVal)
        // clear city selected result
        if (!this.initSelected(AREA_LEVEL)) {
          if (this.dArea) {
            this.dArea = null
          } else {
            this.areaChange(null)
          }
        }
      } else this.changeValues()
    },
    baseAreaChange (newVal, oldVal) {
      if (this.town) {
        this.listTown = loadTown(newVal)
        // clear city selected result
        if (!this.initSelected(TOWN_LEVEL)) {
          if (this.dTown) {
            this.dTown = null
          } else {
            this.townChange(null)
          }
        }
        // this.loadTown(newVal).then(resp => {
        //     console.log(resp);
        //     this.listTown = resp;
        //     this.haveTown = !(this.dProvince && this.dCity && newVal && !resp.length);
        //     //clear city selected result
        //     if (!this.initSelected(TOWN_LEVEL)) {
        //         if (this.dArea) {
        //             this.dArea = null;
        //         } else {
        //             this.areaChange(null);
        //         }
        //     }
        // });
      } else this.changeValues()
    },
    baseTownChange (newVal, oldVal) {
      this.changeValues()
    },
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
      return levelResult.some(val => {
        return val === false
      })
    },
    // region change
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
      if (this.area && this.region.city) {
        if (this.region.city) {
          this.listArea = loadArea(this.region.city)
        }
        if (!this.region.city || !this.checkLevel(this.listArea, this.region.area)) {
          this.clearRegion(AREA_LEVEL)
        }
      }
      if (this.town && this.region.area) {
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
      this.$emit('values', this.region)
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
  },
  mounted () {
    // console.log(this)
    if (this.selected && Object.keys(this.selected).length) this.initSelected(PROVINCE_LEVEL)
  }
}

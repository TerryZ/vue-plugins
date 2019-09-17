import { srcList, srcProvince, srcCity, srcArea } from '../formatted.js'
import { LEVEL_LIST } from './constants'

/**
 * load city list by province data
 * @param province
 * @returns {Array}
 */
export function loadCity (province) {
  let list = null
  if (province && Object.keys(province).length) {
    list = srcCity.filter(val => {
      const num = Number.parseInt(province.key)
      return (val.key - num) < 1e4 && (val.key % num) < 1e4
    })
    // Municipalities directly under the central government
    if (!list.length) list.push(province)
  } else list = []
  return list
}

/**
 * load area list by city data
 * @param city
 * @returns {Array}
 */
export function loadArea (city) {
  let list = null
  if (city && Object.keys(city).length) {
    const cityKey = Number.parseInt(city.key)
    const isNotProvince = cityKey % 1e4
    const calcNum = isNotProvince ? 100 : 1e4
    list = srcArea.filter(val => {
      return (val.key - cityKey) < calcNum && val.key % cityKey < calcNum
    })
    // Prefecture-level city
    if (!list.length) list.push(city)
  } else list = []
  return list
}

/**
 * load town list by area data
 * @param area
 * @returns {Array}
 */
export function loadTown (area) {
  let list = null
  if (area && Object.keys(area).length) {
    let towns = null
    /* eslint-disable */
    try {
      towns = require(`../town/${area.key}.json`);
      // towns = () => import(`../town/${area.key}.json`);
      // console.log(towns)
    } catch (e) {
      console.warn(`The ${area.value} area have no town data.`);
    }
    /* eslint-enable */
    list = towns && Object.keys(towns).length
      ? Object.entries(towns).map(val => ({ key: val[0], value: val[1] }))
      : []
  } else list = []
  this.haveTown = !(this.dProvince && this.dCity && area && !list.length)
  return list

  // return new Promise((resolve, reject) => {
  //     if (area && Object.keys(area).length) {
  //         import(`../town/${area.key}.json`)
  //             .then(resp => {
  //                 resolve(resp && Object.keys(resp).length
  //                     ? Object.entries(resp).map(val=>({ key: val[0], value: val[1] }))
  //                     : []);
  //             })
  //             .catch(() => {
  //                 console.warn(`The ${area.value} area have no town data.`);
  //             })
  //     } else {
  //         resolve([]);
  //     }
  //     //this.haveTown = !(this.dProvince && this.dCity && area && !list.length);
  // });
}

export function getRegionByModel (model) {
  if (Object.keys(model).length && LEVEL_LIST.every(val => {
    return val in model
  })) {
    if (model.province) {
      this.region.province = srcList.find(val => {
        return val.key === model.province
      })
    }
  }
}

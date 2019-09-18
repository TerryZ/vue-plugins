import { srcList, srcCity, srcArea } from '../formatted'
import { LEVEL_LIST, PROVINCE_KEY, CITY_KEY, AREA_KEY, TOWN_KEY } from './constants'

/**
 * load city list by province data
 *
 * @param province
 * @returns {Array}
 */
export function loadCity (province) {
  if (province && Object.keys(province).length) {
    const list = srcCity.filter(val => {
      const num = Number.parseInt(province.key)
      return (val.key - num) < 1e4 && (val.key % num) < 1e4
    })
    // Municipalities directly under the central government
    return list.length ? list : [province]
  } else return []
}

/**
 * load area list by city data
 *
 * @param city
 * @returns {Array}
 */
export function loadArea (city) {
  if (city && Object.keys(city).length) {
    const cityKey = Number.parseInt(city.key)
    const isNotProvince = cityKey % 1e4
    const calcNum = isNotProvince ? 100 : 1e4
    const list = srcArea.filter(val => {
      return (val.key - cityKey) < calcNum && val.key % cityKey < calcNum
    })
    // Prefecture-level city
    return list.length ? list : [city]
  } else return []
}

/**
 * load town list by area data
 *
 * @param area
 * @returns {Array}
 */
export function loadTown (area) {
  let list = null
  if (area && Object.keys(area).length) {
    let towns = null
    /* eslint-disable */
    try {
      towns = require(`./town/${area.key}.json`);
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

/**
 * Get available region levels
 *
 * @export
 * @param {boolean} city
 * @param {boolean} area
 * @param {boolean} town
 */
export function availableLevels (city, area, town) {
  const result = [PROVINCE_KEY]
  if (city) result.push(CITY_KEY)
  else return result
  if (area) result.push(AREA_KEY)
  else return result
  if (town) result.push(TOWN_KEY)
  else return result
  return result
}

/**
 * Check model format valid
 *
 * @export
 * @param {object} model
 * @returns {boolean}
 */
export function validModel (model) {
  return Object.keys(model).length && LEVEL_LIST.every(val => {
    return val in model
  })
}

const getDetail = key => {
  return srcList.find(val => {
    return val.key === key
  })
}

/**
 * Get region raw data from model
 *
 * model format:
 * {
 *   province: 'xxx',
 *   city: 'xxx',
 *   area: 'xxx',
 *   town: 'xxx'
 * }
 *
 * region raw data format:
 * {
 *   province: { key: 'xxx', value: 'yyy' },
 *   city: { key: 'xxx', value: 'yyy' },
 *   area: { key: 'xxx', value: 'yyy' },
 *   town: { key: 'xxx', value: 'yyy' }
 * }
 *
 * @export
 *
 * @param {object} model
 * @param {array} levels
 *
 * @returns {object} region raw data
 */
export function getRegionByModel (model, levels) {
  const region = {
    province: null,
    city: null,
    area: null,
    town: null
  }
  const inLevel = key => {
    return levels.some(val => val === key)
  }
  if (!model.province) return region

  region.province = getDetail(model.province)

  if (!model.city || !inLevel(CITY_KEY) || !region.province) return region

  region.city = getDetail(model.city)

  if (!model.area || !inLevel(AREA_KEY) || !region.city) return region

  region.area = getDetail(model.area)

  if (!model.town || !inLevel(TOWN_KEY) || !region.area) return region

  const towns = loadTown(region.area)
  if (towns.length) {
    region.town = towns.find(val => {
      return val.key === model.town
    })
  }

  return region
}

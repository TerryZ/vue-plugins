import { srcList, srcCity, srcArea } from './formatted'
import {
  LEVEL_LIST,
  PROVINCE_KEY, CITY_KEY, AREA_KEY, TOWN_KEY,
  CITY_LEVEL, AREA_LEVEL, TOWN_LEVEL
} from './constants'

export function generateComponentName (typeName) {
  if (!typeName) return
  return `r-${typeName}`
}

/**
 * 根据省读取城市列表
 *
 * @param {object} province - 省
 * @returns {object[]} - 城市列表
 */
export function loadCity (province) {
  if (!province || !Object.keys(province).length) return []

  const list = srcCity.filter(val => {
    const num = Number.parseInt(province.key)
    return (val.key - num) < 1e4 && (val.key % num) < 1e4
  })
  // Municipalities directly under the central government
  return list.length ? list : [province]
}

/**
 * 根据城市读取区/县列表
 *
 * @param {object} city - 城市
 * @returns {object[]} 区/县列表
 */
export function loadArea (city) {
  if (!city || !Object.keys(city).length) return []

  const cityKey = Number.parseInt(city.key)
  const isNotProvince = cityKey % 1e4
  const calcNum = isNotProvince ? 100 : 1e4
  const list = srcArea.filter(val => {
    return (val.key - cityKey) < calcNum && val.key % cityKey < calcNum
  })
  // Prefecture-level city
  return list.length ? list : [city]
}

/**
 * 根据区/县数据读取乡/镇列表
 *
 * @param {object} area - 区/县
 * @returns {object[]} 乡/镇列表
 */
export function loadTown (area) {
  if (!area || !Object.keys(area).length) return []

  let towns = null
  /* eslint-disable */
  try {
    towns = require(`./town/${area.key}.json`);
    // towns = () => import(`../town/${area.key}.json`);
    // console.log(towns)
  } catch (e) {
    console.warn(`The "${area.value}" area have no town data.`);
    return []
  }

  if (towns && Object.keys(towns).length) {
    return Object
      .entries(towns)
      .map(([key, value]) => ({ key, value }))
  }
  // this.haveTown = !(this.dProvince && this.dCity && area && !list.length)
  return []
}

/**
 * Get level list loader
 *
 * @export
 * @param {number} level
 * @returns
 */
export function getLoader (level) {
  switch (level) {
    case CITY_LEVEL: return loadCity
    case AREA_LEVEL: return loadArea
    case TOWN_LEVEL: return loadTown
  }
}

/**
 * Get available region levels
 *
 * @param {boolean} city
 * @param {boolean} area
 * @param {boolean} town
 */
export function availableLevels () {
  const result = [PROVINCE_KEY]
  const switchs = Array.from(arguments)

  for (let i = 0; i < switchs.length; i++) {
    if (switchs[i]) {
      result.push(LEVEL_LIST[i + 1])
    } else {
      return result
    }
  }

  return result
}

/**
 * 校验数据模型格式
 *
 * @param {object} model - 数据模型
 * @returns {boolean} 检查结果
 */
export function validModel (model) {
  return Boolean(
    model &&
    Object.keys(model).length &&
    LEVEL_LIST.every(val => val in model)
  )
}

/**
 * 根据 key 获得模型数据
 *
 * @param {string} key
 * @returns {object} 模型数据
 */
const getDetail = key => {
  return srcList.find(val => val.key === key)
}

/**
 * Get region raw data from model
 *
 * 入参数据模型格式:
 * {
 *   province: 'province-key',
 *   city: 'city-key',
 *   area: 'area-key',
 *   town: 'town-key'
 * }
 *
 * 原始数据模型格式:
 * {
 *   province: { key: 'xxx', value: 'yyy' },
 *   city: { key: 'xxx', value: 'yyy' },
 *   area: { key: 'xxx', value: 'yyy' },
 *   town: { key: 'xxx', value: 'yyy' }
 * }
 *
 * @param {object} model - 入参数据模型
 * @param {array} levels
 *
 * @returns {object} 区域原始数据模型
 */
export function getRegionByModel (model, levels) {
  const region = {
    province: null,
    city: null,
    area: null,
    town: null
  }
  const inLevel = key => levels.some(val => val === key)

  if (!model.province) return region

  region.province = getDetail(model.province)

  if (!model.city || !inLevel(CITY_KEY) || !region.province) return region

  region.city = getDetail(model.city)

  if (!model.area || !inLevel(AREA_KEY) || !region.city) return region

  region.area = getDetail(model.area)

  if (!model.town || !inLevel(TOWN_KEY) || !region.area) return region

  const towns = loadTown(region.area)
  if (towns.length) {
    region.town = towns.find(val => val.key === model.town)
  }

  return region
}

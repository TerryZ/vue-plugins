import {
  LEVEL_LIST,
  PROVINCE_KEY, CITY_KEY, AREA_KEY, TOWN_KEY
} from '../constants'
import { loadTown, getDetail } from './helper'

/**
 * 入参数据模型转换为完整数据
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
 * @param {string[]} levels - 有效区域级别列表
 *
 * @returns {object} 区域原始数据模型
 */
export function getRegionByModel (model, levels = LEVEL_LIST) {
  const { province, city, area, town } = model
  const region = {
    [PROVINCE_KEY]: undefined,
    [CITY_KEY]: undefined,
    [AREA_KEY]: undefined,
    [TOWN_KEY]: undefined
  }
  const inLevel = key => levels.includes(key)

  if (!province) return region

  region.province = getDetail(province)

  if (!city || !inLevel(CITY_KEY) || !region.province) return region

  region.city = getDetail(city)

  if (!area || !inLevel(AREA_KEY) || !region.city) return region

  region.area = getDetail(area)

  if (!town || !inLevel(TOWN_KEY) || !region.area) return region

  const towns = loadTown(region.area)
  if (towns.length) {
    region.town = towns.find(val => val.key === town)
  }

  return region
}

/**
 * 入参数据模型转换为完整数据
 *
 * 原始数据模型格式:
 * {
 *   province: { key: 'xxx', value: 'yyy' },
 *   city: { key: 'xxx', value: 'yyy' },
 *   area: { key: 'xxx', value: 'yyy' },
 *   town: { key: 'xxx', value: 'yyy' }
 * }
 *
 * @param {object} region - 入参数据模型
 * @param {string[]} levels - 有效区域级别列表（排列顺序需按照行政级别）
 *
 * @returns {object} 区域原始数据模型
 */
export function parseRegionToText (region, levels = LEVEL_LIST) {
  return levels
    .map(val => region[val] && region[val].value)
    .filter(val => val)
}

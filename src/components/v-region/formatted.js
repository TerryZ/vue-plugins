/**
 * 数据自定义记录
 *
 * 2018.11.25
 * 修改 town/350112.json 文件名为 town/350112.json(原长乐县编码为350182，修改为长乐区后编码为350112)
 */
import data from './data.json'

/**
 * json 数据转换为模型列表
 * 模型格式：{ key: string, value: string }
 */
const list = []
/**
 * 省/直辖市模型列表
 */
const province = []
/**
 * 市模型列表
 */
const city = []
/**
 * 区/县模型列表
 */
const area = []

Object.entries(data).forEach(val => {
  const [key, value] = val
  const code = Number.parseInt(key)
  const model = { key, value }
  list.push(model)
  if (!(code % 1e4)) {
    // xx0000 为省级编码格式
    province.push(model)
  } else if (!(code % 100)) {
    // xxxx00 为市级编码格式
    city.push(model)
  } else {
    // 后四位数处理
    if (Number(key.substring(2)) > 9000) {
      city.push(model)
    } else {
      area.push(model)
    }
  }
})

export { list as srcList }
export { province as srcProvince }
export { city as srcCity }
export { area as srcArea }

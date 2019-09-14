/**
 * 数据自定义记录
 *
 * 2018.11.25
 * 修改 town/350112.json 文件名为 town/350112.json(原长乐县编码为350182，修改为长乐区后编码为350112)
 */
import data from './data.json'

const province = []
const city = []
const area = []

// prepare data
Object.entries(data).forEach(val => {
  const key = Number.parseInt(val[0])
  if (!(key % 1e4)) {
    province.push({ key: val[0], value: val[1] })
  } else if (!(key % 100)) {
    city.push({ key: val[0], value: val[1] })
  } else {
    const num = Number(val[0].substr(2))
    if (num > 9000) {
      city.push({ key: val[0], value: val[1] })
    } else {
      area.push({ key: val[0], value: val[1] })
    }
  }
})

export { province as srcProvince }
export { city as srcCity }
export { area as srcArea }

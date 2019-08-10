import { MENU_ROOT } from './constants'

const transform = function (menu, key, parent) {
  return {
    key: key,
    parent: parent,
    data: menu.map(({ children, ...attrs }) => {
      if (Array.isArray(children) && children.length) {
        attrs.children = true
      }
      return attrs
    })
  }
}

/**
 * convert multiple level menu to flat menu
 * @param {Array} data
 */
export function flat (data) {
  if (!data || !Object.keys(data).length) return []
  const converted = []
  const convert = function (data, key, parent) {
    converted.push(transform(data, key, parent))
    data.forEach((val, index) => {
      if ('children' in val) {
        const itemIndex = String(index + 1)
        const childKey = key === MENU_ROOT ? itemIndex : `${key}-${itemIndex}`
        convert(val.children, childKey, key)
      }
    })
  }
  // setup root menu
  convert(data, MENU_ROOT, null)
  return converted
}

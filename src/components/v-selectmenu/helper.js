import { MENU_ROOT } from './constants'

const generateKey = function (key, index) {
  const itemIndex = String(index + 1)
  return key === MENU_ROOT ? itemIndex : `${key}-${itemIndex}`
}

const transform = function (menu, key) {
  // const childrens = Array.isArray(menu) ? menu : menu.children
  let children, attrs
  if (Array.isArray(menu)) {
    children = menu
    attrs = null
  } else {
    ({ children, ...attrs } = menu)
  }
  return {
    key: key,
    parent: attrs,
    data: children.map(({ children, ...attrs }, index) => {
      if (Array.isArray(children) && children.length) {
        attrs.children = generateKey(key, index)
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
  const convert = function (menu, key) {
    converted.push(transform(menu, key))
    const children = Array.isArray(menu) ? menu : menu.children
    children.forEach((val, index) => {
      if ('children' in val) {
        convert(val, generateKey(key, index))
      }
    })
  }
  // setup root menu
  convert(data, MENU_ROOT)
  return converted
}

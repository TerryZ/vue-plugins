import Region from './Region'

Region.install = (Vue, options = {}) => {
  if (Object.keys(options).length) {
    const { i18n, blank, town, search } = options
    if (typeof i18n === 'string') Region.props.i18n.default = i18n
    if (typeof blank === 'boolean') Region.props.blank.default = blank
    if (typeof town === 'boolean') Region.props.town.default = town
    if (typeof search === 'boolean') Region.props.search.default = search
  }

  /*
  region.extends = {
    props: {
      abc: {
        type: String,
        default: 'abc'
      }
    }
  }
  console.log(region)
  */

  Vue.component(Region.name, Region)
}

export default Region

import Region from './Region'

Region.install = (Vue, options = {}) => {
  if (Object.keys(options).length) {
    const { language, blank, town, search } = options
    if (typeof language === 'string') Region.props.language.default = language
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

import Region from './Region'
export {
  regionFull,
  regionProvinces,
  regionCities,
  regionAreas
} from './formatted'
export { default as RegionText } from './RegionText'
export { default as RegionColumnsCore } from './components/Columns'
export { default as RegionColumns } from './RegionColumns'
export { default as RegionSelects } from './RegionSelects'

Region.install = (Vue, options = {}) => {
  if (Object.keys(options).length) {
    const { language, blank, town, search } = options
    if (typeof language === 'string') Region.props.language.default = language
    if (typeof blank === 'boolean') Region.props.blank.default = blank
    if (typeof town === 'boolean') Region.props.town.default = town
    if (typeof search === 'boolean') Region.props.search.default = search
  }

  Vue.component(Region.name, Region)
}

export default Region

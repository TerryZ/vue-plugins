import './styles/region.styl'

import RegionText from './RegionText'
import RegionColumnsCore from './components/Columns'
import RegionColumns from './RegionColumns'
import RegionSelects from './RegionSelects'
import RegionCityPicker from './RegionCityPicker'

export {
  regionFull,
  regionProvinces,
  regionCities,
  regionAreas
} from './formatted'

const Region = {}

Region.install = (Vue, options = {}) => {
  // if (Object.keys(options).length) {
  //   const { language, blank, town, search } = options
  //   if (typeof language === 'string') Region.props.language.default = language
  //   if (typeof blank === 'boolean') Region.props.blank.default = blank
  //   if (typeof town === 'boolean') Region.props.town.default = town
  //   if (typeof search === 'boolean') Region.props.search.default = search
  // }

  Vue.component('v-region-text', RegionText)
  Vue.component('v-region-columns', RegionColumns)
  Vue.component('v-region-selects', RegionSelects)
  Vue.component('v-region-city-picker', RegionCityPicker)
}

export {
  RegionText,
  RegionColumnsCore,
  RegionColumns,
  RegionSelects,
  RegionCityPicker
}

export default Region

import slideBar from './SlideBar'

/**
 * Slide bar
 *
 * @author TerryZ(https://github.com/TerryZ)
 */
const Plugin = {
  install (Vue, options = {}) {
    if (Object.keys(options).length) {
      const props = slideBar.mixins[0].props
      if (typeof options.theme === 'string') props.theme.default = options.theme
      if (typeof options.backdrop === 'boolean') props.backdrop.default = options.backdrop
    }
    Vue.component('v-slide-bar', slideBar)
  }
}

export default Plugin

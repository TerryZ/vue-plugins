import SelectPage from './SelectPage'

SelectPage.install = (Vue, options = {}) => {
  if (Object.keys(options).length) {
    const { title, language, placeholder, pageSize, rtl, dataLoad } = options
    const props = SelectPage.mixins[0].props

    if (typeof title === 'string') props.title.default = title
    if (typeof language === 'string') props.language.default = language
    if (typeof placeholder === 'string') props.placeholder.default = placeholder
    if (typeof pageSize === 'number') props.pageSize.default = pageSize
    if (typeof rtl === 'boolean') props.rtl.default = rtl

    if (dataLoad && typeof dataLoad === 'function') {
      SelectPage.extends = {
        methods: {
          dataLoad: dataLoad
        }
      }
    }
  }
  Vue.component(SelectPage.name, SelectPage)
}

export default SelectPage

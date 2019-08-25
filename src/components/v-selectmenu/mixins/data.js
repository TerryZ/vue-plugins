import { languages, REGULAR } from '../constants'

export default {
  data () {
    return {
      show: false,
      i18n: languages[this.language] || languages['cn'],
      // menu data or current group menu data
      results: [],
      tabIndex: -1,
      message: '',
      group: false,
      /**
       * advanced menu options
       */
      search: '',
      picked: [],
      highlight: -1
    }
  },
  computed: {
    btnText () {
      return this.picked.length
        ? this.picked.map(val => val[this.showField]).join(',')
        : this.i18n.advanced_default
    },
    /**
     * caption display rule
     *
     * close header bar
     *   set title option to false
     *
     * Regular menu
     *   set some text for the title option
     * Advanced menu
     */
    caption () {
      if (this.type === REGULAR) {
        if (typeof this.title === 'string' && this.title) return this.title
      }
      if (this.title) {
        return this.title
      } else {
        if (this.type === REGULAR) {
          if (this.group) return this.i18n.regular_group
        } else {
          return this.i18n.advanced_default
        }
      }
    }
  },
  watch: {
    tabIndex (val) {
      this.tabIndex = val
      this.switchGroup()
    },
    value () {
      this.init()
    },
    picked (val) {
      if (this.message && this.maxSelected && val.length < this.maxSelected) this.message = ''
      this.$emit('input', val.slice().map(value => value[this.keyField]).join(','))
      this.$emit('values', val.slice())
    },
    data (val) {
      if (Array.isArray(val) && val.length) this.populate()
    },
    message (val, oldVal) {
      if (val !== oldVal) this.adjust()
    }
  },
  provide () {
    return {
      i18n: this.i18n,
      keyField: this.keyField,
      showField: this.showField,
      inPicked: this.inPicked,
      getRowText: this.getRowText
    }
  }
}

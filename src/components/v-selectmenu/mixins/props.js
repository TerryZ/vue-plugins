import { ADVANCED } from '../constants'

export default {
  props: {
    /**
     * basic options
     */
    data: {
      type: Array,
      required: true
    },
    language: {
      type: String,
      default: 'cn'
    },
    align: {
      type: String,
      default: 'left'
    },
    embed: {
      type: Boolean,
      default: false
    },
    rightClick: {
      type: Boolean,
      default: false
    },
    /**
     * menu caller container with
     * false: inline-block
     * true: block
     */
    fullWidth: {
      type: Boolean,
      default: false
    },
    /**
     * the menu type
     * 'regular'
     * 'advanced'
     */
    type: {
      type: String,
      default: ADVANCED
    },
    title: {
      type: [String, Boolean],
      default: false
    },
    // the width of drop down menu
    width: Number,
    /**
     * advanced mode options
     */
    value: String,
    keyField: {
      type: String,
      default: 'id'
    },
    showField: {
      type: String,
      default: 'name'
    },
    query: {
      type: Boolean,
      default: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    // maximum number of selected items in advanced mode
    maxSelected: {
      type: Number,
      default: 0
    },
    scroll: {
      type: Boolean,
      default: true
    },
    rtl: {
      type: Boolean,
      default: false
    }
  }
}

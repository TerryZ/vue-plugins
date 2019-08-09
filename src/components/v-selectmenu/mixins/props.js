export default {
  props: {
    value: String,
    data: {
      type: Array,
      required: true
    },
    regular: {
      type: Boolean,
      default: false
    },
    title: {
      type: [String, Boolean],
      default: false
    },
    keyField: {
      type: String,
      default: 'id'
    },
    showField: {
      type: String,
      default: 'name'
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
    query: {
      type: Boolean,
      default: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    language: {
      type: String,
      default: 'cn'
    },
    maxSelected: {
      type: Number,
      default: 0
    },
    scroll: {
      type: Boolean,
      default: true
    },
    // the width of drop down menu
    width: Number,
    rtl: {
      type: Boolean,
      default: false
    }
  }
}

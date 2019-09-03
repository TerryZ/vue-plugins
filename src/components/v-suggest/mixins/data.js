export default {
  props: {
    data: Array,
    value: String,
    name: String,
    keyField: {
      type: String,
      default: 'id'
    },
    showField: {
      type: [String, Function],
      default: 'name'
    },
    placeholder: String,
    delay: {
      type: Number,
      default: 0.2
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      text: typeof (this.value) === 'undefined' ? '' : this.value,
      list: [],
      highlight: -1,
      width: 0,
      dropShow: false,
      last: null,
      lastInputTime: -1
    }
  },
  watch: {
    value (val) {
      this.text = val
    },
    text (val) {
      this.$emit('input', val)
    }
  }
}

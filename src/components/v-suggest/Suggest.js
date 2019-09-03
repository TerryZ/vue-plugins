import './suggest.scss'
import dropdown from 'v-dropdown'
import data from './mixins/data'
import methods from './mixins/methods'

export default {
  name: 'v-suggest',
  components: { dropdown },
  mixins: [data, methods],
  mounted () {
    const tmpClass = this.$el.className
    this.$el.className = 'v-suggest'
    this.$refs.input.className = tmpClass
    // this.populate();
    this.adjust()
  }
}

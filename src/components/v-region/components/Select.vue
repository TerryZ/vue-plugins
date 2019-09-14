<template>
  <dropdown ref="drop" :border="false" @show="showChange" class="rg-select" :disabled="disabled">
    <template #caller>
      <div :class="['rg-select__el', {'rg-select__el--active': show, 'rg-select_el--disabled': disabled}]">
        <div class="rg-select__content" v-text="content"></div>
        <span class="rg-select__caret"></span>
      </div>
    </template>
    <ul class="rg-select__list">
      <li v-if="blank" v-text="blankText" @click="pick(null)"></li>
      <li :key="index" v-for="(item,index) in list"
          :class="{selected:selected && selected.key === item.key}"
          v-text="item.value"
          @click="pick(item)"></li>
    </ul>
  </dropdown>
</template>

<script>
import dropdown from 'v-dropdown'
import selector from '../mixins/selector'
export default {
  name: 'SelectElement',
  components: { dropdown },
  mixins: [selector],
  props: {
    list: {
      type: Array,
      required: true
    },
    blankText: String,
    value: Object
  },
  data () {
    return {
      selected: this.value
    }
  },
  inject: ['disabled', 'blank'],
  watch: {
    value: {
      handler (val) {
        this.selected = val
      },
      deep: true
    }
  },
  computed: {
    content () {
      return (this.selected && this.selected.value)
        ? this.selected.value
        : this.blank ? this.blankText : '&nbsp;'
    }
  },
  methods: {
    pick (val) {
      this.selected = val
      this.$emit('input', val)
      this.close()
    }
  }
}
</script>

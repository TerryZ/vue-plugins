<template>
  <section>
    <h3 class="mt-5">
      Text
      <small>纯文本模式，初始化选中的项目，以纯文本的内容显示</small>
    </h3>
    <div class="alert alert-secondary">
      <strong>当前选中地区：</strong>
      <v-region
        :town="true"
        type="text"
        v-model="selected"
      />
      <!-- <region-conatiner v-model="selected">
        <region-text />
      </region-conatiner> -->
      <div>
        <region-text v-model="selected" />
      </div>
    </div>
  </section>
</template>

<script>
import { RegionText } from '@/components/v-region'

export default {
  components: {
    RegionText
  },
  data () {
    return {
      selected: {
        province: '350000',
        city: '350100',
        area: '350103',
        town: '350103012'
      }
    }
  }
}
</script>

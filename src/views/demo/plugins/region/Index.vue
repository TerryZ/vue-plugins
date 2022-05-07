<template>
  <div class="p-5">
    <h1>
      v-region
      <button
        type="button"
        class="btn btn-outline-secondary btn-sm"
        @click="$router.push({path: '/demo'})"
      >
        Back to List
      </button>
    </h1>

    <hr>

    <div class="alert alert-warning">
      北京、天津、上海、重庆等直辖市与省同级，若选择的省是直辖市，则下级行政级别为 <strong>区/县</strong>，不是 <strong>市</strong>，在数据处理上注意区分！
    </div>

    <region-group />
    <region-columns />
    <region-selects />
    <region-city />
    <region-text />
  </div>
</template>

<script>
import RegionText from './Text.vue'
import RegionGroup from './Group.vue'
import RegionColumns from './Columns.vue'
import RegionSelects from './Selects.vue'
import RegionCity from './City.vue'

export default {
  components: {
    RegionText,
    RegionGroup,
    RegionColumns,
    RegionSelects,
    RegionCity
  }
}
</script>

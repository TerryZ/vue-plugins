<template>
  <section>
    <h3 class="mt-5">
      Column
      <small>下拉选择器多列竖排模式</small>
    </h3>
    <div class="p-3 shadow-sm rounded-3 border">
      <div class="mb-3">
        <region-columns
          :city="true"
          :area="true"
          :town="true"
          language="en"
          v-model="modelColumn"
          @change="cbColumn"
          @complete="columnGroupCoreDone"
        />
      </div>
      <div class="bg-light p-3 mb-3 rounded-3">
        <pre
          class="m-0 mb-3"
          v-text="JSON.stringify(modelColumn, null, 2)"
        />
        <pre
          class="m-0"
          v-text="JSON.stringify(valuesColumn, null, 2)"
        />
      </div>
      <div class="d-flex mb-3">
        <region-columns-core
          :town="true"
          class="border rounded-3"
          language="en"
          v-model="modelCore"
          @complete="columnGroupCoreDone"
        />
      </div>

      <h4 class="">
        下拉选择器多列竖排模式（自定义呼出按钮）
      </h4>
      <div>
        <region-columns>
          <template #default="{ region, show }">
            <button
              type="button"
              class="btn btn-primary"
            >
              region:{{ resultText(region) }},
              show: {{ show }}
            </button>
          </template>
        </region-columns>
      </div>
    </div>
  </section>
</template>

<script>
import { RegionColumnsCore, RegionColumns } from '@/components/v-region'

export default {
  components: {
    RegionColumnsCore,
    RegionColumns
  },
  data () {
    return {
      modelCore: null,
      modelColumn: {
        province: '350000',
        city: '350100',
        area: '350104',
        town: '350104008'
      },
      valuesColumn: null
    }
  },
  methods: {
    cbColumn (data) {
      // if (!this.valuesColumn) {
      this.valuesColumn = data
      // console.log('set data')
      // }
      // console.dir(data)
    },
    columnGroupCoreDone () {
      console.log('columnGroupCoreDone')
    },
    resultText (region) {
      if (!region) return '无数据'

      if (!Object.values(region).some(val => val) || !region) {
        return '无数据'
      }
      return Object
        .values(region)
        .filter(val => val)
        .map(val => val.value)
        .join(',')
    }
  }
}
</script>

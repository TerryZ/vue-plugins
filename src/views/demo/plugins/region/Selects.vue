<template>
  <section>
    <h3 class="mt-5">
      Select
      <small>下拉列表模式</small>
    </h3>
    <div class="p-3 shadow-sm rounded-3 border">
      <h5>
        省
      </h5>
      <v-region
        :city="false"
        :area="false"
      />

      <h5 class="mt-3">
        省、市
      </h5>
      <div class="bg-light p-3 mb-3">
        <pre
          class="m-0"
          v-text="JSON.stringify(value1, null, 2)"
        />
      </div>
      <v-region
        :area="false"
        v-model="value1"
      />

      <h5 class="mt-3">
        省、市、区/县
      </h5>
      <v-region />

      <h5 class="mt-3">
        省、市、区/县、乡/镇/街道
      </h5>
      <div class="bg-light p-3 mb-3">
        <pre
          class="m-0 mb-3"
          v-text="JSON.stringify(modelSelect, null, 2)"
        />
        <pre
          class="m-0"
          v-text="JSON.stringify(valuesSelect, null, 2)"
        />
      </div>
      <v-region
        :town="true"
        v-model="modelSelect"
        @change="cbSelect"
      />

      <h5 class="mt-3">
        初始化值
      </h5>
      <v-region
        :town="true"
        v-model="selected"
      />

      <h5 class="mt-3">
        初始化值并禁用
      </h5>
      <v-region
        :town="true"
        v-model="selected"
        :disabled="true"
      />
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      value1: {},
      selected: {
        province: '350000',
        city: '350100',
        area: '350103',
        town: '350103012'
      },
      modelSelect: null,
      valuesSelect: null
    }
  },
  methods: {
    cbSelect (data) {
      this.valuesSelect = data
    }
  }
}
</script>

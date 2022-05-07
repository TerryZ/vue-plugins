<template>
  <section>
    <h3 class="mt-3">
      Group
      <small>下拉选择器模式</small>
    </h3>
    <div class="p-3 shadow-sm rounded-3 border">
      <div class="bg-light p-3 mb-3">
        <pre
          class="m-0 mb-3"
          v-text="JSON.stringify(modelGroup, null, 2)"
        />
        <pre
          class="m-0"
          v-text="JSON.stringify(valuesGroup, null, 2)"
        />
      </div>
      <p>
        <v-region
          :city="true"
          :area="true"
          :town="true"
          type="group"
          v-model="modelGroup"
          class="me-3"
          @values="cbGroup"
        />
        <button
          type="button"
          class="btn btn-secondary btn-sm"
          @click="resetGroup"
        >
          reset region
        </button>
      </p>

      <h5 class="mt-3">
        下拉选择器模式（自定义呼出按钮）
      </h5>
      <div>
        <v-region type="group">
          <template #default="{ region, show }">
            <button
              type="button"
              class="btn btn-primary"
            >
              region:{{ resultText(region) }},
              show: {{ show }}
            </button>
          </template>
        </v-region>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      modelGroup: null,
      valuesGroup: null
    }
  },
  methods: {
    cbGroup (data) {
      // console.log(data)
      this.valuesGroup = data
    },
    resetGroup () {
      this.modelGroup = {
        province: '350000',
        city: '350100',
        area: '350104',
        town: '350104008'
      }
    },
    resultText (region) {
      if (!Object.values(region).some(val => val) || !region) {
        return 'null'
      }
      return Object.values(region).filter(val => val).map(val => val.value).join(',')
    }
  }
}
</script>

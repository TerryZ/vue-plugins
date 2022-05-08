<template>
  <div class="p-5">
    <h1>
      v-region
      <button
        type="button"
        class="btn btn-outline-secondary btn-sm"
        @click="$router.push({path: '/demo'});"
      >
        Back to List
      </button>
    </h1>

    <hr>

    <div class="alert alert-warning">
      北京、天津、上海、重庆等直辖市与省同级，若选择的省是直辖市，则下级行政级别为 <strong>区/县</strong>，不是 <strong>市</strong>，在数据处理上注意区分！
    </div>

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

    <h3 class="mt-5">
      Column
      <small>下拉选择器多列竖排模式</small>
    </h3>
    <div class="p-3 shadow-sm rounded-3 border">
      <div class="bg-light p-3 mb-3">
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
          v-model="modelColumn"
          @done="columnGroupCoreDone"
        />
      </div>
      <div class="">
        <region-columns
          :city="true"
          :area="true"
          :town="true"
          type="column"
          v-model="modelColumn"
          @values="cbColumn"
        />
      </div>

      <h4 class="mt-3">
        下拉选择器多列竖排模式（自定义呼出按钮）
      </h4>
      <div>
        <v-region type="column">
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

    <h3 class="mt-5">
      City
      <small>城市选择器</small>
    </h3>
    <div class="p-3 shadow-sm rounded-3 border">
      <div class="bg-light p-3 mb-3">
        <pre
          class="m-0 mb-3"
          v-text="modelCity"
        />
        <pre
          class="m-0"
          v-text="JSON.stringify(valuesCity, null, 2)"
        />
      </div>
      <div>
        <v-region
          type="city"
          language="EN"
          v-model="modelCity"
          @values="cbCity"
        />
      </div>
    </div>

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
        @values="cbSelect"
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
  </div>
</template>

<script>
import RegionConatiner from '@/components/v-region/RegionConatiner'
import RegionColumns from '@/components/v-region/RegionColumns'
import RegionColumnsCore from '@/components/v-region/components/Columns'

export default {
  components: {
    RegionConatiner,
    RegionColumnsCore,
    RegionColumns
  },
  data () {
    return {
      value1: {},
      value2: {},
      selected: {
        province: '350000',
        city: '350100',
        area: '350103',
        town: '350103012'
      },
      uiSelected: {
        province: '350000',
        city: '350100',
        area: '350104',
        town: '350104008'
      },
      selectedArray: ['110000', '350100'],
      regionSet: null,
      model: {
        province: '',
        city: '',
        area: ''
      },
      btnText: '请选择',

      modelGroup: null,
      modelColumn: null,
      modelSelect: null,
      modelCity: ['110000', '350100'],

      valuesGroup: null,
      valuesColumn: null,
      valuesSelect: null,
      valuesCity: null
    }
  },
  methods: {
    resultText (region) {
      if (!Object.values(region).some(val => val) || !region) return 'null'
      return Object.values(region).filter(val => val).map(val => val.value).join(',')
    },
    cbGroup (data) {
      // console.log(data)
      this.valuesGroup = data
    },
    cbColumn (data) {
      this.valuesColumn = data
    },
    cbSelect (data) {
      this.valuesSelect = data
    },
    cbCity (data) {
      this.valuesCity = data
    },
    validateValues (data) {
      console.log(data)
      if (data) {
        this.model.province = data.province
        this.model.city = data.city
        this.model.area = data.area
      }
    },
    uiValues (d) {
      // console.log(JSON.stringify(d));
      this.btnText = (!d.province && !d.city && !d.area && !d.town)
        ? '请选择'
        : `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim()
    },
    getValue (obj) {
      return obj ? obj.value : ''
    },
    resetGroup () {
      this.modelGroup = {
        province: '350000',
        city: '350100',
        area: '350104',
        town: '350104008'
      }
    },
    columnGroupCoreDone () {
      console.log('columnGroupCoreDone')
    }
  },
  watch: {
    model: {
      handler (val) {
        this.regionSet = !((!this.model.province && !this.model.area))
      },
      deep: true
    }
  },
  mounted () {
    // setTimeout(() => {
    //   this.selected = {
    //     province: '350000',
    //     city: '350100',
    //     area: '350103',
    //     town: '350103012'
    //   }
    //   // this.selectedArray = ['110000', '350100'];
    // }, 1000)
  }
}
</script>

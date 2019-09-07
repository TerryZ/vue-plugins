<template>
  <div class="card p-5">
    <h1>
      v-suggest
      <button type="button" class="btn btn-outline-secondary btn-sm" @click="$router.push({path: '/demo'});">Back to List</button>
    </h1>

    <hr>

    <h5 class="mt-5">禁用</h5>
    <p>
      <v-suggest :data="sample"
        :disabled="true"
        v-model="disabled"
        :show-field="showField" ></v-suggest>
    </p>

    <h5 class="mt-5">输入自动完成 ( {{input}} )</h5>
    <p>
      <v-suggest :data="sample" name="abc" v-model="input" @values="values"></v-suggest>
    </p>

    <h5 class="mt-5">自定义行内容展示</h5>
    <p>
      <v-suggest :data="sample"
        placeholder="Type something..."
        :show-field="showField" ></v-suggest>
    </p>

    <h5 class="mt-5">使用 slot 进行自定义显示</h5>
    <p>
      <v-suggest :data="sample" >
        <template #default="{ row }">
          <div>
            <strong v-text="row.name"></strong>
            <small class="ml-2" v-text="row.abbr"></small>
          </div>
          <div class="text-muted" v-text="row.desc"></div>
        </template>
      </v-suggest>
    </p>

    <h5 class="mt-5">限制显示结果列表个数</h5>
    <p>
      <v-suggest :data="sample" :max-length="5" >
      </v-suggest>
    </p>
  </div>
</template>

<script>
import nbaTeams from '@test/sample/nba-teams'
export default {
  data () {
    return {
      input: '',
      disabled: 'Chicago Bulls',
      sample: nbaTeams
    }
  },
  methods: {
    showField (row) {
      return row.name + ' ' + row.desc
    },
    values (row) {
      console.log(JSON.stringify(row))
    }
  },
  mounted () {
    setTimeout(() => {
      this.input = 'ch'
    }, 1000)
  }
}
</script>

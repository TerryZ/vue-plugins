<template>
  <div class="panel panel-default">
    <div class="panel-body">
      <h3>
        editor <button
          type="button"
          class="btn btn-inverse btn-xs"
          @click="$router.push({path: '/demo'});"
        >
          Back to List
        </button>
      </h3>
      <div class="alert alert-warning">
        由于富文本的特殊情况，需要做表单非空校验时，仅需要对 <code>v-model</code> 绑定的变量判断是否为空，为空则使用消息对话框进行提示即可，不使用常规表单元素校验方式
      </div>

      <h4>只读模式</h4>
      <p>
        <editor
          v-model="content"
          :readonly="true"
        />
      </p>

      <h4>自定义高度</h4>
      <p>
        <editor
          v-model="content"
          :height="500"
        />
      </p>
      <p>
        <button
          type="button"
          class="btn btn-primary"
          @click="viewContent"
        >
          view content
        </button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      content: ''
    }
  },
  methods: {
    viewContent () {
      const that = this
      this.$nextTick(() => {
        that.$vDialog.alert(that.content)
      })
    }
  },
  mounted () {
    const that = this
    setTimeout(() => {
      that.content = '<p>Once properly set up, all file manager features will automatically become available. This includes the <strong>Upload</strong> tab <code>(1)</code> in the <strong>Link</strong>, <strong>Image</strong>, and <strong>Flash Properties</strong> dialog windows as well as the <strong>Browse Server</strong> button <code>(2)</code>.</p>'
    }, 1000)
  }
}
</script>

<style scoped>

</style>

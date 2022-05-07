<template>
  <div class="panel panel-default">
    <div class="panel-body">
      <h3>
        v-ztree <button
          type="button"
          class="btn btn-inverse btn-xs"
          @click="$router.push({path: '/demo'});"
        >
          Back to List
        </button>
      </h3>
      <v-tree
        @selected="selected"
        :data="json"
        :data-format="dataFormat"
        :check="true"
        :expand-all="false"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Plugins',
  methods: {
    selected: (node) => {
      console.log(node)
    },
    dataFormat: (treeId, parentNode, resp) => resp.values.treeData
  },
  data () {
    return {
      url: 'http://localhost/func/loadFuncList',
      json: []
    }
  },
  mounted () {
    setTimeout(() => {
      this.json = [
        { id: 1, pId: 0, name: 'pNode 1', open: true },
        { id: 11, pId: 1, name: 'pNode 11' },
        { id: 111, pId: 11, name: 'leaf node 111' },
        { id: 112, pId: 11, name: 'leaf node 112' },
        { id: 113, pId: 11, name: 'leaf node 113' },
        { id: 114, pId: 11, name: 'leaf node 114' },
        { id: 12, pId: 1, name: 'pNode 12' },
        { id: 121, pId: 12, name: 'leaf node 121' },
        { id: 122, pId: 12, name: 'leaf node 122' },
        { id: 123, pId: 12, name: 'leaf node 123' },
        { id: 124, pId: 12, name: 'leaf node 124' },
        { id: 13, pId: 1, name: 'pNode 13 - no child', isParent: true },
        { id: 2, pId: 0, name: 'pNode 2' },
        { id: 21, pId: 2, name: 'pNode 21', open: true },
        { id: 211, pId: 21, name: 'leaf node 211' },
        { id: 212, pId: 21, name: 'leaf node 212' },
        { id: 213, pId: 21, name: 'leaf node 213' },
        { id: 214, pId: 21, name: 'leaf node 214' },
        { id: 22, pId: 2, name: 'pNode 22' },
        { id: 221, pId: 22, name: 'leaf node 221' },
        { id: 222, pId: 22, name: 'leaf node 222' },
        { id: 223, pId: 22, name: 'leaf node 223' },
        { id: 224, pId: 22, name: 'leaf node 224' },
        { id: 23, pId: 2, name: 'pNode 23' },
        { id: 231, pId: 23, name: 'leaf node 231' },
        { id: 232, pId: 23, name: 'leaf node 232' },
        { id: 233, pId: 23, name: 'leaf node 233' },
        { id: 234, pId: 23, name: 'leaf node 234' },
        { id: 3, pId: 0, name: 'pNode 3 - no child', isParent: true }
      ]
    }, 1000)
  }
}
</script>

<style scoped>

</style>

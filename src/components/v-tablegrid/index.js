import vTableGrid from './TableGrid'
const Plugin = {
  install (Vue, config) {
    if (config && Object.keys(config).length && config.dataLoad && typeof (config.dataLoad) === 'function') {
      vTableGrid.extends = {
        methods: {
          dataLoad: config.dataLoad
        }
      }
    } else {
      const msg = `v-tablegrid plugin "dataLoad" function has not initialization, if you using server side data source for v-tablegrid, you need set that hook.
    import Vue from 'vue';
    import vTableGird from 'v-tablegrid';
    //dataLoad is your function
    let config = {dataLoad:function(){...}};
    Vue.use(vTableGrid, config);`
      // eslint-disable-next-line no-console
      console.warn(msg)
    }

    Vue.component(vTableGrid.name, vTableGrid)
  }
}

export default Plugin

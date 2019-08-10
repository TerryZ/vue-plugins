import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import { routerGuards } from '@/utils/auth/router'

import './config/plugins'

Vue.config.productionTip = false

routerGuards(router)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

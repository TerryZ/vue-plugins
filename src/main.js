import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import { routerGuards } from '@/utils/auth/router'

import './config/plugins'

import 'bootstrap/dist/css/bootstrap.min.css'

Vue.config.productionTip = false

routerGuards(router)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

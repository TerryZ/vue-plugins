import Vue from 'vue';
import App from './App.vue';
import router from '@/router';
import { routerGuards } from '@/utils/auth/router';

Vue.config.productionTip = false;

import './config/plugins';

routerGuards(router);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');

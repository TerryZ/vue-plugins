import Vue from 'vue';
import App from './App.vue';
import router from '@/router';

Vue.config.productionTip = false;

import './config/plugins';

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');

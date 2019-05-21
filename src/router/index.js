import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import demo from './demo';

const root = [
    {
        path: '/',
        component: resolve => require(['@/views/demo/Main'], resolve)
    }
];

const routes = [...root, ...demo];
const routerConfig = new Router({routes});


export default routerConfig;
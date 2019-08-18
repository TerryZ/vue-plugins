import Vue from 'vue'
import Router from 'vue-router'

import demo from './demo'

Vue.use(Router)

const root = [
  {
    path: '/',
    component: () => import('@/views/demo/Main')
  }
]

const routes = [...root, ...demo]
const routerConfig = new Router({ routes })

export default routerConfig

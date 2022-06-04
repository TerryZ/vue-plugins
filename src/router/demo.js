export default [
  { path: '/demo', component: () => import('@/views/demo/Main') },
  { path: '/demo/list', component: () => import('@/views/demo/List') },
  { path: '/demo/form', component: () => import('@/views/demo/Form') },
  { path: '/demo/datetime', component: () => import('@/views/demo/plugins/DateTime') },
  { path: '/demo/dialog', component: () => import('@/views/demo/plugins/dialog/Index.vue') },
  { path: '/demo/dropdown', component: () => import('@/views/demo/plugins/Dropdown') },
  { path: '/demo/selectMenu', component: () => import('@/views/demo/plugins/SelectMenu') },
  { path: '/demo/selectPage', component: () => import('@/views/demo/plugins/SelectPage') },
  { path: '/demo/tree', component: () => import('@/views/demo/plugins/Tree') },
  {
    path: '/demo/region',
    component: () => import('@/views/demo/plugins/region/Index'),
    children: [
      { path: '/demo/region/selects', component: () => import('@/views/demo/plugins/region/Selects') },
      { path: '/demo/region/group', component: () => import('@/views/demo/plugins/region/Group') },
      { path: '/demo/region/columns', component: () => import('@/views/demo/plugins/region/Columns') },
      { path: '/demo/region/city', component: () => import('@/views/demo/plugins/region/City') },
      { path: '/demo/region/text', component: () => import('@/views/demo/plugins/region/Text') }
    ]
  },
  { path: '/demo/upload', component: () => import('@/views/demo/plugins/Upload') },
  { path: '/demo/page', component: () => import('@/views/demo/plugins/Page') },
  { path: '/demo/editor', component: () => import('@/views/demo/plugins/Editor') },
  { path: '/demo/composite', component: () => import('@/views/demo/plugins/Composite') },
  { path: '/demo/video', component: () => import('@/views/demo/plugins/Video') },
  { path: '/demo/suggest', component: () => import('@/views/demo/plugins/Suggest') },
  { path: '/demo/gallery', component: () => import('@/views/demo/plugins/Gallery') }
]

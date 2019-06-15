export default [
	{path:'/demo', component: resolve=>require(['@/views/demo/Main'], resolve)},
	{path:'/demo/list', component: resolve=>require(['@/views/demo/List'], resolve)},
	{path:'/demo/form', component: resolve=>require(['@/views/demo/Form'], resolve)},
	{path:'/demo/datetime', component: resolve=>require(['@/views/demo/plugins/DateTime'], resolve)},
	{path:'/demo/dialog', component: resolve=>require(['@/views/demo/plugins/Dialog'], resolve)},
    {path:'/demo/dropdown', component: resolve => require(['@/views/demo/plugins/Dropdown'], resolve)},
	{path:'/demo/selectMenu', component: resolve => require(['@/views/demo/plugins/SelectMenu'], resolve)},
	{path:'/demo/selectPage', component: resolve => require(['@/views/demo/plugins/SelectPage'], resolve)},
	{path:'/demo/tree', component: resolve => require(['@/views/demo/plugins/Tree'], resolve)},
	{path:'/demo/region', component: resolve => require(['@/views/demo/plugins/Region'], resolve)},
	{path:'/demo/upload', component: resolve => require(['@/views/demo/plugins/Upload'], resolve)},
	{path:'/demo/page', component: resolve => require(['@/views/demo/plugins/Page'], resolve)},
	{path:'/demo/editor', component: resolve => require(['@/views/demo/plugins/Editor'], resolve)},
	{path:'/demo/composite', component: resolve => require(['@/views/demo/plugins/Composite'], resolve)},
	{path:'/demo/video', component: resolve => require(['@/views/demo/plugins/Video'], resolve)},
	{path:'/demo/suggest', component: resolve => require(['@/views/demo/plugins/Suggest'], resolve)},
	{path:'/demo/gallery', component: resolve => require(['@/views/demo/plugins/Gallery'], resolve)}
];
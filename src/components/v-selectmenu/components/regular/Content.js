import Vue from 'vue';
export default {
	name:'RegularMenuContent',
	props:{
		content: String
	},
	// components:{
	// 	'custom': Vue.component('custom',{
	// 		props:['temp'],
	// 		template: this.temp
	// 	})
	// },
	render(h){
		// if(this.content){
		// 	return h('div',this.$slots.default);
		// }
		return h('');
	}
}
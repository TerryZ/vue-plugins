export default {
	name:'AdvancedMenuRow',
	props:{
		row: Object
	},
	inject:['showField', 'inPicked'],
	data(){
		return {
			hover: false
		};
	},
	watch:{
		hover(val){
			this.$emit('highlight',val);
		}
	},
	render(h){
		// console.log(this.$slots)
        console.log(this.$scopedSlots)
		const child = [];
		child.push(h('div',{class:'sm-selected-icon'},[h('i',{class:'sm-iconfont icon-selected'})]));
		child.push(h('div',{
			class:'sm-item-text',
			// domProps:{
			// 	innerHTML: this.getRowText()
			// }
		},[
            this.$scopedSlots.row({
                row: this.row
            })
        ]));
		return h('li',{
			class:{
				'sm-selected': this.inPicked(this.row),
				'sm-over': this.hover
			},
            // scopedSlots:{
			//     row: props => {
			//         console.log(props)
			//         return h('span', props.text);
            //     }
            // },
			on:{
				click:e=>{
					e.stopPropagation();
					this.$emit('select');
				},
				mouseenter:()=>this.hover = true,
				mouseleave:()=>this.hover = false
			}
		},child);
	},
	methods:{
		getRowText(){
			// switch (typeof this.showField) {
			// 	case 'string':   return this.row[this.showField];
			// 	case 'function': return this.showField(this.row);
			// }

		}
	}
}

{/*<li pkey="11" v-for="(item,index) in list" :key="index" v-if="!message"*/}
{/*@click="selectItem(item)"*/}
{/*@mouseenter="highlight(index)"*/}
{/*@mouseleave="highlight(-1)"*/}
{/*:class="{'sm-selected': selected.includes(item), 'sm-over': index===highlight }">*/}
{/*<div class="sm-selected-icon"><i class="sm-iconfont icon-selected"></i></div>*/}
{/*<div class="sm-item-text" v-html="getRowText(item)"></div>*/}
{/*</li>*/}
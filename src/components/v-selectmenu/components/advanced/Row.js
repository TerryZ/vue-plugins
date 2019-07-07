export default {
	name:'AdvancedMenuRow',
	props:{
		row: Object,
        hover: {
		    type: Boolean,
            default: false
        }
	},
	inject:['showField', 'inPicked', 'getRowText'],
	render(h){
		const child = [];
		child.push(h('div',{class:'sm-selected-icon'},[h('i',{class:'sm-iconfont icon-selected'})]));
		if('row' in this.$scopedSlots){
            /**
             * build scoped slot with named slot
             */
            child.push(h('div',{class:'sm-item-text'},[
                this.$scopedSlots.row({
                    row: this.row
                })
            ]));
        }else{
            child.push(h('div',{
                class:'sm-item-text',
                domProps:{
                	innerHTML: this.getRowText(this.row)
                }
            }));
        }

		return h('li',{
			class:{
				'sm-selected': this.inPicked(this.row),
				'sm-over': this.hover
			},
			on:{
				click:e=>{
					e.stopPropagation();
					this.$emit('select');
				},
				mouseenter:()=>this.$emit('highlight',true),
				mouseleave:()=>this.$emit('highlight',false)
			}
		},child);
	}
}
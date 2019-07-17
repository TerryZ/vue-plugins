export default {
    name: "v-menu-item",
    render(h){
        if(this.data && Object.keys(this.data).length){
            const child = [];
            if(this.data.content !== 'sm_divider'){
                const item = [];

                if('row' in this.$scopedSlots){
					/**
					 * build scoped slot with named slot
					 */
					item.push(h('span',[
						this.$scopedSlots.row({
							row: this.data
						})
					]));
				}else{
					item.push(h('span',{ domProps:{ innerHTML: this.data.content } }));
				}

                if(this.data.children){
                    item.push(h('span',{ class:'sm-caret-right' }));
                }

                const linkOption = {
					attrs:{
						href:  'javascript:void(0);',
						target:this.data.open ? '_blank' : '_self'
					}
				};
                if(!this.data.disabled){
					if(this.data.url){
						linkOption.attrs.href = this.data.url;
					}else{
						linkOption.on = {
							click:()=>this.click()
						};
					}
				}


                child.push(h('a',linkOption,item));
            }
            return h('li',{ class:this.classes },child);
        }
    },
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    computed: {
        classes(){
            return {
                'sm-divider': this.data.content === 'sm-divider' || this.data.content === 'sm_divider',
                'sm-header': this.data.header,
                'sm-disabled': this.data.disabled
            };
        }
    },
    methods: {
        click(){
            if(this.data && this.data.callback && typeof this.data.callback === 'function'){
                //this.data.callback.call(this.parentInst);
                this.data.callback();
            }
        }
    }
}
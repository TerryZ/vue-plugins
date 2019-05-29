<!--<template>-->
<!--    <div class="sp-base sp-inputs" ref="input" >-->
<!--        <span class="sp-placeholder" v-show="!picked.length" v-text="placeholder"></span>-->
<!--        <span class="sp-selected-tag" :key="index" v-for="(sel,index) in picked">-->
<!--            <span v-html="renderCell(sel)"></span>-->
<!--            <span @click="remove(index)" v-show="!disabled">-->
<!--                <i class="sp-iconfont sp-icon-close"></i>-->
<!--            </span>-->
<!--        </span>-->
<!--    </div>-->
<!--</template>-->

<script>
    export default {
        name: "SelectPageTag",
        props: {
            picked: Array,
            disabled: Boolean,
            placeholder: String
        },
        inject: ['renderCell'],
		render(h){
        	const tags = [];
        	if(this.picked.length){
        		this.picked.forEach((val, index) => {
        			const tag = [];
        			tag.push(h('span',{
						domProps:{
							innerHTML: this.renderCell(val)
						}
					}));
        			// close button
        			if(!this.disabled) {
        				tag.push(h('span', {
        					on: {
        						click: ()=>{
									this.remove(index);
                                }
                            }
                        }, [h('i', {class:'sp-iconfont sp-icon-close'})]));
                    }
					tags.push(h('span',{class: 'sp-selected-tag',key: index},tag));
                });
            }else{
				tags.push(h('span', {class: 'sp-placeholder'}, this.placeholder));
            }
        	return h('div', {class: 'sp-base sp-inputs'}, tags);
        },
        methods: {
            remove(index){
                this.$emit('remove', index);
            }
        }
    }
</script>
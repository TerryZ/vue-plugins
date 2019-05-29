<script>
    import view from '../mixins/view';
    export default {
        name: "SelectPageList",
        mixins: [view],
        render(h){
        	const items = [];
        	this.list.forEach((val, index) => {
        		items.push(h('li', {
        			class: this.rowClass(val, index),
                    attrs: {
        				title: val[this.showField] || ''
                    },
                    domProps: {
        				innerHTML: this.renderCell(val)
                    },
                    key: index,
                    on: {
                        click: e=>{
                        	e.stopPropagation();
                        	this.rowClick(val);
                        },
                        mouseenter: ()=>{
                        	this.highlight(!this.picked.includes(val) ? index : -1);
                        }
                    }
                }));
            });
        	return h('ul', {
        		class: 'sp-results',
                on: {
					mouseleave: ()=>{
						this.highlight(-1);
                    }
                }
            }, items);
        }
    }
</script>
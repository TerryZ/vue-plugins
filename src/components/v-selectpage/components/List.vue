<!--<template>-->
<!--    <ul class="sp-results" @mouseleave="highlight(-1)" >-->
<!--        <li v-for="(row,index) in list" :key="index"-->
<!--            :title="row[showField]"-->
<!--            :class="rowClass(row, index)"-->
<!--            v-html="renderCell(row)"-->
<!--            @click.stop="click(row)"-->
<!--            @mouseenter="highlight(!picked.includes(row)?index:-1)" ></li>-->
<!--    </ul>-->
<!--</template>-->
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
                    on: {
                        click: e => {
                        	e.stopPropagation();
                        	this.rowClick(val);
                        },
                        mouseenter(){
                        	this.highlight(!this.picked.includes(val) ? index : -1);
                        }
                    }
                }));
            });
        	return h('ul', {class: 'sp-results'}, items);
        }
    }
</script>
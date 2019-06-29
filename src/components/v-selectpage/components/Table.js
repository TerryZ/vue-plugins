import view from '../mixins/view';
export default {
    name: "SelectPageTable",
    mixins: [view],
    props: {
        tbColumns:  Array
    },
    render(h){
        return h('table',{class:'sp-table'},[
            //table thead
            h('thead',[h('tr',{
                class:{'sp-rtl': this.rtl}
            },this.tbColumns.map((val,index)=>{
                return h('th',val.title);
            }))]),
            //table tbody
            h('tbody',{
                on:{
                    mouseleave: ()=>this.highlight(-1)
                }
            },this.list.map((val,index)=>{
                //table row
                return h('tr',{
                    key: index,
                    class: this.rowClass(val, index),
                    on: {
                        click: e => {
                            e.stopPropagation();
                            this.rowClick(val);
                        },
                        mouseenter: ()=>this.highlight(this.inPicked(val)?index:-1)
                    }
                },this.tbColumns.map((col,idx)=>{//table cells
                    return h('td',{
                        key: idx,
                        domProps:{
                            innerHTML: val[col.data]
                        }
                    });
                }));
            }))
        ]);
    }
}
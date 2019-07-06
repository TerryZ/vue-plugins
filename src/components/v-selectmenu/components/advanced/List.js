import row from './Row';
export default {
    name: "AdvancedMenu",
    render(h){
        const child = [];
        if(this.message){
            child.push(this.getMessage(h, this.message));
        }else if(this.list.length){
            child.push(...this.list.map((val,index)=>{
                const options = {
                    key:index,
                    props:{
                        row: val
                    },
                    on:{
                        select:e=>{
                            e.stopPropagation();
                            this.select(val);
                        },
                        highlight:enter=>this.highlight(index, enter)
                    }
                };
                /**
                 * scoped slot with named slot
                 */
                if('row' in this.$scopedSlots){
                    options.scopedSlots = {
                        row:props=>{
                            return this.$scopedSlots.row({ row: props.row });
                        }
                    };
                }
                return h('menu-row',options);
            }));
        }else{
            child.push(this.getMessage(h, this.i18n.not_found));
        }
        return h('div',{class:this.classes},[
            h('ul',{class:'sm-results'},child)
        ]);
    },
    components:{
        'menu-row': row
    },
    props: {
        list: Array,
        picked: Array,
        scroll: Boolean,
        group: Boolean,
        search: String,
        message: String,
        value: Number
    },
    inject: ['i18n'],
    computed: {
        classes(){
            return {
                'sm-result-area':true,
                'sm-scroll-limit': this.scroll,
                'sm-list-mode': !this.group
            };
        }
    },
    methods: {
        highlight(index, enter){
            this.$emit('input', enter ? index : -1);
        },
        select(row){
            if(!row || !Object.keys(row).length) return;
            this.$emit('select', row);
        },
        getMessage(h, msg){
            return h('li',{class:'sm-message-box'},[
                h('i',{class:'sm-iconfont icon-warn'}),
                h('span',{
                    domProps:{
                        innerHTML:msg
                    }
                })
            ]);
        }
    }
}
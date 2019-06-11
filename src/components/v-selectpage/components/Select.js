export default {
    name: "SelectPageSelect",
    props: {
        results: String,
        disabled: Boolean,
        placeholder: String
    },
    inject: ['i18n'],
    render(h){
        const children = [];
        let result = null;
        if(this.results){
            result = h('span',{domProps:{innerHTML:this.results}});
        }else{
            result = h('span',{class:'sp-placeholder'},this.placeholder);
        }
        children.push(h('div',{class:'sp-base sp-input'},[result]));
        //clear button
        if(this.results && !this.disabled){
            children.push(h('div',{
                class:'sp-clear',
                attrs:{
                    title: this.i18n.clear
                },
                on:{
                    click: e => {
                        e.stopPropagation();
                        this.remove();
                    }
                }
            },[h('i',{class:'sp-iconfont sp-icon-close'})]));
        }
        return h('div',children);
    },
    methods: {
        remove(){
            this.$emit('remove');
        }
    }
}
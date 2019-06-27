import './selectpage.scss';
import data from './mixins/data';
import methods from './mixins/methods';

import dropdown from 'v-dropdown';
import tag from './components/Tag';
import select from './components/Select';
import page from './components/Pagination';
import listView from './components/List';
import tableView from './components/Table';

export default {
	name: "v-selectpage",
	mixins: [data, methods],
	components: {
		'v-dropdown': dropdown,
		'sp-tag': tag,
		'sp-select': select,
		'sp-page': page,
		'sp-list': listView,
		'sp-table': tableView
	},
	provide(){
		return {
			i18n: this.i18n,
			renderCell: this.renderCell,
			keyField: this.keyField,
			showField: this.showField,
			rtl: this.rtl
		};
	},
	computed: {
		headerTitle(){
			const headerStr = this.i18n.items_selected,
				replace = val => headerStr.replace('selected_count', `<b>${val}</b>`);
			if(this.picked.length) return this.multiple?replace(this.picked.length):this.getResults();
			else return this.title;
		},
		results(){
			return this.getResults();
		},
		placeholderString(){
			return this.placeholder?this.placeholder:this.i18n.placeholder;
		},
		inputClasses(){
			return { 'sp-input-container': true, 'sp-open': this.show, 'sp-disabled': this.disabled };
		}
	},
    render(h){
	    const child = [];
	    child.push(this.buildCaller(h));
        child.push(this.buildHeader(h));
        child.push(this.buildSearch(h));
        child.push(this.buildMessage(h));
        child.push(this.buildContent(h));
        child.push(this.buildPagination(h));

	    return h('v-dropdown',{
	        props: {
	            'full-width': true,
                'width': this.width,
                'disabled': this.disabled,
                'align': this.rtl ? 'right' : 'left'
            },
            class: 'v-selectpage',
            on: {
	            show: this.showChange
            },
            ref: 'drop'
        },child);
    },
    methods:{
        /**
         * select panel
         */
	    buildCaller(h){
            const input = [];
            const inputAttrs = {
                props: {
                    disabled: this.disabled,
                    placeholder: this.placeholderString,
                    picked: this.picked
                },
                on:{
                    remove: this.remove
                }
            };
            input.push(h(this.multiple ? 'sp-tag' : 'sp-select', inputAttrs));
            input.push(h('div',{
                class: {
                    'sp-button': true,
                    'open': this.show
                }
            },[h('span',{class:'sp-caret'})]));
            return h('template',{slot:'caller'},[
                h('div',{class:this.inputClasses},input)
            ]);
        },
        /**
         * header bar
         */
        buildHeader(h){
            const header = [];
            header.push(h('h3',{domProps:{innerHTML:this.headerTitle}}));
            const genButton = (title, btnClass, iconClass, event)=>{
                return h('button',{
                    attrs:{
                        type: 'button',
                        title: title
                    },
                    class: btnClass,
                    on:{click:()=>{event()}}
                },[
                    h('i',{class:`sp-iconfont ${iconClass}`})
                ]);
            };

            if(this.multiple){
                header.push(genButton(this.i18n.select_all, 'sp-select-all-btn', 'sp-icon-select-all'), ()=>{this.pickPage(true)});
                header.push(genButton(this.i18n.unselect_all, 'sp-remove-all-btn', 'sp-icon-unselect-all'), ()=>{this.pickPage(false)});
            }
            header.push(genButton(this.i18n.clear_all, 'sp-clear-all-btn', 'sp-icon-clear'), this.remove);
            header.push(genButton(this.i18n.close_btn, 'sp-close-btn', 'sp-icon-close'), this.close);

            return h('div',{class:'sp-header'},header);
        },
        buildSearch(h){

        },
        buildMessage(h){

        },
        buildContent(h){

        },
        /**
         * pagination bar
         */
        buildPagination(h){
            if(this.pagination){
                return h('sp-page',{
                    props:{
                        'total-row':this.totalRows,
                        'page-size':this.pageSize
                    },
                    model:{
                        value:this.pageNumber,
                        callback:value=>{}
                    },
                    ref:'page'
                });
            }
        }
    },
	mounted(){
		//switch class name
		//let className = this.$el.className;
		//this.$el.className = 'v-selectpage';
		//this.$refs.input.className += ' ' + className;

		//set searchField when user not config
		if(!this.searchField){
			if(typeof this.showField === 'string') this.searchColumn = this.showField;
			else if(Array.isArray(this.showField) && this.showField.length)
				this.searchColumn = this.showField[0].data;
		}else this.searchColumn = this.searchField;

		//sort data list
		this.sortList();

		this.initSelection();

		this.$on('clear', this.remove);
	},
	destroyed(){
		this.$off('clear', this.remove);
	}
}
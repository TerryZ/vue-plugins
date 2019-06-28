import './selectpage.scss';
import dropdown from 'v-dropdown';

import data from './mixins/data';
import methods from './mixins/methods';
import render from './mixins/render';

import tag from './components/Tag';
import select from './components/Select';
import page from './components/Pagination';
import listView from './components/List';
import tableView from './components/Table';

export default {
	name: "v-selectpage",
	mixins: [data, methods, render],
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
		placeholderString(){
			return this.placeholder || this.i18n.placeholder;
		},
		inputClasses(){
			return { 'sp-input-container': true, 'sp-open': this.show, 'sp-disabled': this.disabled };
		}
	},
	mounted(){
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
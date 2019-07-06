import lang from '../language';
export default {
	data(){
		return {
			show: false,
			results: [],
			subMenus: [],
			picked: [],
			search: '',
			headerText: '',
			i18n: lang[this.language],
			tabIndex: -1,
			highlight: -1,
			message: '',
			menuClass:{
				'sm-regular': false
			},
			menuStyle: {
				top: '',
				left: ''
			},
			state: {
				group: false
			}
		};
	},
	computed: {
		btnText(){
			return this.picked.length?this.picked.slice().map(val=>val[this.showField]).join(','):this.i18n.advance_default;
		}
	},
	watch:{
		tabIndex(val){
			this.tabIndex = val;
			this.switchTab();
		},
		value(val){
			this.init();
		},
		picked(val){
			if(this.message && this.maxSelected && val.length < this.maxSelected) this.message = '';
			this.$emit('input', val.slice().map(value=>value[this.keyField]).join(','));
			this.$emit('values', val.slice());
		}
	},
	provide(){
		return {
			parentInst: this.$parent,
			i18n: this.i18n,
			keyField: this.keyField,
			showField: this.showField,
			inPicked: this.inPicked
		};
	}
}
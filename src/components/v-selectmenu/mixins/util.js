export default {
	methods:{
		inPickedIndex(row){
			if(!row || !Object.keys(row).length || !this.picked.length) return -1;
			return this.picked.findIndex(val=>val[this.keyField] === row[this.keyField]);
		},
		inPicked(row){
			return this.inPickedIndex(row) !== -1;
		}
	}
}
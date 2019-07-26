export default {
	methods:{
		inputFocus(){
			if(!this.query) return;
			this.$nextTick(()=>{
				//fix open drop down list and set input focus, the page will scroll to top
				//that.$refs.search.focus({preventScroll:true}); only work on Chrome and EDGE
				if(this.isChrome() || this.isEdge()) this.$refs.search.focus({preventScroll:true});
				else{
					const x = window.pageXOffset, y = window.pageYOffset;
					this.$refs.search.focus();
					if(window.pageYOffset !== y) setTimeout(function() { window.scrollTo(x, y); }, 0);
				}
			});
		},
		close(){
			if(this.show && !this.embed) this.$refs.drop.visible();
		},
		adjust(){
			this.$nextTick(()=>{
				this.$refs.drop.adjust();
			});
		},
		inPickedIndex(row){
			if(!row || !Object.keys(row).length || !this.picked.length) return -1;
			return this.picked.findIndex(val=>val[this.keyField] === row[this.keyField]);
		},
		inPicked(row){
			return this.inPickedIndex(row) !== -1;
		},
		isChrome(){
			return navigator.vendor !== undefined && navigator.vendor.indexOf("Google") !== -1;
		},
		isEdge(){
			return navigator.userAgent.indexOf("Edge") >= 0;
		}
	}
}
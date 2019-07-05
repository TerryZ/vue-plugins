export default {
	methods: {
        showChange(val){
            this.show = val;
            if(val){
				if(!this.regular) this.inputFocus();
			}else{
				this.reset();
				this.$emit('hide');
			}
        },
		close(){
			if(this.show) this.$refs.drop.visible();
		},
		reset(){
			this.highlight = -1;
		},
		inputFocus(){
			if(!this.query) return;
			this.$nextTick(()=>{
				//fix open drop down list and set input focus, the page will scroll to top
				//that.$refs.search.focus({preventScroll:true}); only work on Chrome and EDGE
				if(this.isChrome() || this.isEdge()) this.$refs.input.focus({preventScroll:true});
				else{
					const x = window.pageXOffset, y = window.pageYOffset;
					this.$refs.input.focus();
					if(window.pageYOffset !== y) setTimeout(function() { window.scrollTo(x, y); }, 0);
				}
			});
		},
		clear() {
			if(!this.regular){
				this.picked = [];
				if(!this.multiple) this.close();
			}
		},
		selectAll(){
			if(this.results.length && !this.message) {
				if(this.maxSelected){
					const left = this.maxSelected - this.picked.length;
					const available = this.results.slice()
						.filter(val=>!this.picked.includes(val))
						.filter((val,idx)=>idx<left);
					this.picked = [...this.picked, ...available];
				}else this.picked = this.results;
			}
		},
		processKey(){
			this.results = this.filter();
		},
		processControl(e){
			if (this.show &&
				([38, 40, 27, 9].includes(e.keyCode) ||
					[13, 9].includes(e.keyCode) && this.highlight !== -1)) {
				switch (e.keyCode) {
					case 38:// up
						this.prevLine();
						break;
					case 40:// down
						this.nextLine();
						break;
					case 9: // tab
					case 13:// return
						if(this.highlight !== -1) this.selectItem(this.results[this.highlight]);
						break;
					case 27:// escape
						this.close();
						break;
				}
			}
		},
		selectItem(item){
			if(this.multiple){
				if(!this.picked.includes(item)) {
					if(this.maxSelected && this.picked.length === this.maxSelected) this.buildMessage();
					else this.picked.push(item);
				}else{
					const idx = this.picked.findIndex(value => Object.is(item, value));
					if(idx !== -1) this.picked.splice(idx, 1);
				}
			}else {
				this.picked = [item];
				this.close();
			}
		},
		nextLine(){
			if(this.highlight < this.results.length-1) this.highlight++;

			if(!this.scroll) return;

			this.$nextTick(()=>{
				const cur = this.$refs.list.querySelectorAll('.sm-over')[0],
					curPos = cur.getBoundingClientRect(),
					listPos = this.$refs.listUl.getBoundingClientRect(),
					relTop = curPos.top - listPos.top,
					dist = parseInt(relTop + curPos.height - listPos.height);
				if(parseInt(relTop + curPos.height) > listPos.height)
                    this.$refs.list.scrollTop = dist;
			});
		},
		prevLine(){
			if(this.highlight > 0) this.highlight--;
			else if(this.highlight === -1 && this.results.length) this.highlight = this.results.length -1;

			if(!this.scroll) return;

			this.$nextTick(()=>{
				const cur = this.$refs.list.querySelectorAll('.sm-over')[0],
					curPos = cur.getBoundingClientRect(),
					listPos = this.$refs.listUl.getBoundingClientRect(),
					relTop = curPos.top - listPos.top,
					dist = parseInt(this.$refs.list.scrollTop - curPos.height);
				if(parseInt(relTop) < parseInt(this.$refs.list.scrollTop))
                    this.$refs.list.scrollTop = dist;
				if(relTop > listPos.height && this.highlight === this.results.length -1)
                    this.$refs.list.scrollTop = relTop - listPos.height + curPos.height;
			});
		},
		filter(){
			const list = this.state.group ? this.data[this.tabIndex].list.concat() : this.data.concat();
			return list.filter(val=>this.getRowText(val).toLowerCase().includes(this.search.toLowerCase()));
		},
		switchTab(){
			this.results = this.regular?
                this.data[this.tabIndex].list:
                this.search ? this.filter() : this.data[this.tabIndex].list;
		},
		checkDataType(){
			if(this.data && Array.isArray(this.data) && this.data.length){
				const sample = this.data[0];
				if(sample.title && sample.list) this.state.group = true;
			}
		},
		buildMessage(){
			this.message = this.i18n.max_selected.replace('max_selected_limit',`<b>${this.maxSelected}</b>`);
		},
		isChrome(){
			return navigator.vendor !== undefined && navigator.vendor.indexOf("Google") !== -1;
		},
		isEdge(){
			return navigator.userAgent.indexOf("Edge") >= 0;
		},
		init(){
            if(!this.value) return;
            let vals = this.value.split(',');
            if(vals.length){
                if(!this.regular && !this.multiple) vals = [vals[0]];
                if(this.state.group){
                    let arr = [];
                    for(let d of this.data){
                        arr = [...arr, ...d.list.concat().filter(val=>{
                            return vals.includes(String(val[this.keyField]));
                        })];
                    }
                    this.picked = arr.concat();
                }else{
                    this.picked = this.data.concat().filter(val=>vals.includes(String(val[this.keyField])));
                }
            }
		}
	}
};
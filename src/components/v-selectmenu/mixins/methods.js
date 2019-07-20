const UP = 38, DOWN = 40, ESC = 27, TAB = 9, ENTER = 13;
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
			if(this.show && !this.embed) this.$refs.drop.visible();
		},
		reset(){
			this.highlight = -1;
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
				}else{
					this.picked = this.results;
				}
			}
		},
		processKey(){
			this.results = this.filter();
		},
		processControl(e){
			if (this.show && ([UP, DOWN, ESC, ENTER, TAB].includes(e.keyCode) && this.highlight !== -1)) {
				switch (e.keyCode) {
					case UP:// up
                        this.$refs.list.prev();
						break;
					case DOWN:// down
						this.$refs.list.next();
						break;
					case TAB: // tab
					case ENTER:// return
						if(this.highlight !== -1) this.selectItem(this.results[this.highlight]);
						break;
					case ESC:// escape
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
		filter(){
			const list = this.state.group ? this.data[this.tabIndex].list.slice() : this.data.slice();
			return list.filter(val=>this.getRowText(val).toLowerCase().includes(this.search.toLowerCase()));
		},
		switchTab(){
			this.results = this.regular
				? this.data[this.tabIndex].list
				: this.search 
					? this.filter() 
					: this.data[this.tabIndex].list;
		},
		checkDataType(){
			if(this.data && Array.isArray(this.data) && this.data.length){
				const sample = this.data[0];
				if(sample.title && sample.list) this.state.group = true;
			}
		},
        getRowText(row){
            switch (typeof this.showField) {
                case 'string':   return row[this.showField];
                case 'function': return this.showField(row);
            }
        },
		buildMessage(){
			this.message = this.i18n.max_selected.replace('max_selected_limit',`<b>${this.maxSelected}</b>`);
		},
		init(){
            if(!this.value) return;
            let vals = this.value.split(',');
            if(vals.length){
                if(!this.regular && !this.multiple) vals = [vals[0]];
                if(this.state.group){
                    let arr = [];
                    for(let d of this.data){
                        arr = [...arr, ...d.list.slice().filter(val=>{
                            return vals.includes(String(val[this.keyField]));
                        })];
                    }
                    this.picked = arr.slice();
                }else{
                    this.picked = this.data.slice().filter(val=>vals.includes(String(val[this.keyField])));
                }
            }
		},
		populate(){
			this.checkDataType();

			if(this.title){
				this.headerText = this.title;
			}else{
				if(this.regular){
					if(this.state.group) this.headerText = this.i18n.regular_group;
				}else{
					this.headerText = this.i18n.advance_default;
				}
			}

			if(this.data.length){
				if(this.state.group){
					this.tabIndex = 0;
				}else{
					this.results = this.data.slice();
				}
			}
			if(this.regular){
				this.menuClass['sm-regular'] = true;
			}else{
				this.init();
			}
		}
	}
};
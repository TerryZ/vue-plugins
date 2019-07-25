export default {
	render(h){
		return h('dropdown',{
			props: {
				'width': this.width,
				'disabled': this.disabled,
				'border': false,
				'embed': this.embed,
				'right-click': this.rightClick,
				'align': this.align
			},
			on: {
				show: this.showChange
			},
			ref: 'drop'
		},[
			this.buildCaller(h),
			this.buildContainer(h)
		]);
	},
	methods:{
		buildCaller(h) {
			if(!this.embed){
				let child = null;
				if('default' in this.$scopedSlots){
					child = this.$scopedSlots.default({
						show: this.show
					});
				}else{
					child = [h('button',{
						attrs:{ type: 'button' },
						class:{
							'sm-default-btn': true,
							'sm-opened': this.show
						}
					},[
						h('span', this.btnText),
						h('span', { class:'sm-caret sm-caret-down' })
					])];
				}
				return h('template',{slot:'caller'},[
					h('div',{class:'sm-caller-container'},child)
				]);
			}
		},
		buildContainer(h){
			return h('div',{ class:'v-selectmenu' },[
				this.buildHeader(h),
				this.buildSearch(h),
				this.buildMessage(h),
				this.buildTab(h),
				this.buildContent(h)
			]);
		},
		buildHeader(h) {
			if(this.title || !this.regular || this.state.group){
				const header = [];
				const genBtn = (title, btnClass, iconClass, event)=>{
					return h('span',{
						attrs:{
							title: title
						},
						class: btnClass,
						on:{click:()=>{event()}}
					},[
						h('i',{class:`sm-iconfont ${iconClass}`})
					]);
				};

				if(!this.regular){
					if(this.multiple){
						header.push(genBtn(this.i18n.select_all_btn, 'sm-selectall-button', 'sm-icon-select-all', ()=>this.selectAll()));
					}
					header.push(genBtn(this.i18n.remove_all_btn, 'sm-removeall-button', 'sm-icon-remove-all', ()=>this.clear()));
				}

				if(!this.embed){
					header.push(genBtn(this.i18n.close_btn, 'sm-close-button', 'sm-icon-close', ()=>this.close()));
				}

				return h('div',{ class:'sm-header' },[
					h('h3',this.headerText),
					h('div',{ class:'sm-control' },header)
				]);
			}
		},
		buildSearch(h) {
			if(!this.regular && this.query){
				return h('div',{class:'sm-search'},[
					h('input',{
						attrs:{
							type:'text',
							autocomplete:'off',
							value: this.search.trim()
						},
						on:{
							keyup:e=>this.processKey(e),
							keydown:e=>{
								e.stopPropagation();
								this.processControl(e);
							},
							input:e=>this.search = e.target.value
						},
						ref:'search'
					})
				]);
			}
		},
		buildMessage(h){
			if(this.message){
				return h('div',{class:'sm-message'},[
					h('i',{class:'sm-iconfont sm-icon-warn'}),
					h('span',{
						domProps:{
							innerHTML: this.message
						}
					})
				]);
			}
		},
		buildTab(h){
			if(this.state.group && this.data.length){
				return h('div',{ class:'sm-result-tabs' },[
					h('ul',this.data.map((val,index)=>{
						return h('li',{ key:index },[
							h('a',{
								attrs:{
									'href':'javascript:void(0);',
									'data-index': index,
									'tab-id': `selectmenu-tab-${index+1}`
								},
								class:{
									active: index === this.tabIndex
								},
								on:{
									click:()=>this.tabIndex = index
								}
							}, val.title)
						]);
					}))
				]);
			}
		},
		buildNamedSlot(option){
			/**
			 * scoped slot with named slot
			 */
			if('row' in this.$scopedSlots){
				//same as <template #row="{ row }">
				option.scopedSlots = {
					row:props=>{
						//same as <slot name="row" :row="row">
						return this.$scopedSlots.row({ row: props.row });
					}
				};
			}
		},
		buildContent(h){
			let options = null;
			if(this.regular){
				options = {
					props:{
						data: this.results,
						show: this.show
					},
					on:{
						close:()=>this.close()
					}
				};
			}else{
				options = {
					props:{
						list:this.results,
						scroll:this.scroll,
						message:this.message,
						picked:this.picked,
						value:this.highlight
					},
					on:{
						select: this.selectItem,
						input:val => this.highlight = val
					},
					ref:'list'
				};
			}
			this.buildNamedSlot(options);
			return h(this.regular ? 'regular' : 'advanced', options);
		}
	}
}
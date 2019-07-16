export default {
	render(h){
		return h('dropdown',{
			props: {
				'width': this.width,
				'disabled': this.disabled,
				'border': false,
				'embed': this.embed,
				'right-click': this.rightClick,
				'align': this.rtl ? 'right' : 'left'
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
					child = this.$scopedSlots.default();
				}else{
					child = [h('button',{
						attrs:{ type: 'button' },
						class:{
							'sm-default-btn': true,
							'sm-opened': this.show
						}
					},[
						h('span', this.btnText),
						h('span', { class:'sm-caret-down' })
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
				this.buildTab(h),
				this.buildContent(h)
			]);
		},
		buildHeader(h) {
			if(this.title || !this.regular || this.state.group){
				const header = [];
				header.push(h('h3',this.headerText));
				const genBtn = (title, btnClass, iconClass, event)=>{
					return h('button',{
						attrs:{
							type: 'button',
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
						header.push(genBtn(this.i18n.select_all_btn, 'sm-selectall-button', 'icon-selectall', ()=>this.selectAll()));
					}
					header.push(genBtn(this.i18n.remove_all_btn, 'sm-removeall-button', 'icon-removeall', ()=>this.clear()));
				}

				if(!this.embed){
					header.push(h('button',{
						attrs:{
							type: 'button',
							title: this.i18n.close_btn
						},
						class: 'sm-close-button',
						on:{click:()=>this.close()}
					},'×'));
				}

				return h('div',{ class:'sm-header' },header);
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
		buildContent(h){
			if(this.regular){
				let slot = undefined;
				if('row' in this.$scopedSlots){
					slot = this.$scopedSlots.row();
				}
				return h('regular',{
					props:{
						data: this.results,
						show: this.show
					},
					on:{
						close:()=>this.close()
					}
				},slot);
			}else{
				const options = {
					props:{
						list:this.results,
						scroll:this.scroll,
						message:this.message,
						picked:this.picked
					},
					domProps:{
						value:this.highlight
					},
					on:{
						select: this.selectItem,
						input:val => this.highlight = val
					},
					ref:'list'
				};
				/**
				 * scoped slot with named slot
				 */
				if('row' in this.$scopedSlots){
					//same as <template #row="{ row }">
					options.scopedSlots = {
						row:props=>{
							//same as <slot name="row" :row="row">
							return this.$scopedSlots.row({ row: props.row });
						}
					};
				}
				return h('advanced', options);
			}
		}
	}
}
import './dropdown.scss';

export default {
    name: "v-dropdown",
    props:{
        value:{
            type: Boolean,
            default: false
        },
		/**
		 * align with the dropdown layer direction
		 */
        align: {
            type: String,
            default: 'left'
        },
		/**
		 * dropdown layer embedded to page/component
		 */
        embed: {
            type: Boolean,
            default: false
        },
		/**
		 * mouse right click caller area to display dropdown
		 */
        rightClick: {
            type: Boolean,
            default: false
        },
        /**
		 * whether to reopen dropdown when caller click
         */
        reOpen: {
            type: Boolean,
            default: false
        },
        animated: {
            type: [String, Boolean],
            default: true
        },
        /**
         * the width of drop down menu
         * min-width: 80
         */
        width: Number,
		/**
		 * container with
		 * false: inline-block
		 * true: block
		 */
		fullWidth: {
        	type: Boolean,
			default: false
		}
    },
    data(){
        return {
            show: this.value,
            styleSheet: { top: '',left: '' },
            dropdownClass: 'v-dropdown-container',
            dropUp: false,
			x: null,
			y: null
        };
    },
    computed: {
        animate(){
            if(typeof this.animated === 'string') return this.animated;
            if(!this.embed && this.animated) return this.dropUp ? 'animate-up' : 'animate-down';
            return '';
        }
    },
    render(h){
        //console.log(this.animate)
		const children = [];
        //the dropdown layer caller
		if(this.$slots.caller && Object.keys(this.$slots.caller).length && !this.embed){
        	children.push(this.$slots.caller);
		}
		//the dropdown layer container
		children.push(h('transition',{
			props: {
				name: this.animate,
				type: 'transition'
			}
		},[h('div',{
			class: {
				[this.dropdownClass]: true,
				'v-dropdown-embed': this.embed
			},
			style: this.styleSheet,
			directives: [{name: 'show', value: this.show}],
			ref: 'dropdown',
			on:{
				mousedown: e=>{
					//do not close dropdown container layer when do some operations in that
					e.stopPropagation();
				}
			}
		},this.$slots.default)]));

        return h('div',{
        	class: {
        		'v-dropdown-caller': true,
				'v-dropdown-caller--full-width': this.fullWidth
			},
			on: {
        		click: e=>{
        			if(this.embed || this.rightClick) return;
        			e.stopPropagation();
        			this.visible();
				},
				//mouse right button click
				contextmenu: e=>{
					if(this.embed || !this.rightClick) return;
        			e.stopPropagation();
					e.preventDefault();

					const info = this.scrollInfo();
					this.x = e.pageX || (e.clientX + info.x);
					this.y = e.pageY || (e.clientY + info.y);
					this.visible();
				}
			}
		},children);
    },
    methods: {
        visible(){
            this.$nextTick(()=>{
                //calculation display direction(up or down) and top axis
                if(!this.show && !this.embed && this.$slots.caller) this.adjust();

                this.show = !this.show;

                this.$emit('show-change', this.show);
            });
        },
        adjust(){
            const pos = this.$el.getBoundingClientRect();
            let menu = null;

            if(this.show) menu = this.$refs.dropdown.getBoundingClientRect();
            else{
                //change hide drop down container way from 'display:none' to 'visibility:hidden',
                //be used for get width and height
				this.$refs.dropdown.style.visibility = 'hidden';
				this.$refs.dropdown.style.display = 'inline-block';
                menu = this.$refs.dropdown.getBoundingClientRect();
                //restore style
				this.$refs.dropdown.style.visibility = 'visible';
				this.$refs.dropdown.style.display = 'none';
            }

            this.adjustTop(pos, menu);
			this.styleSheet.left = `${this.adjustLeft(pos, menu)}px`;
        },
        //get container show up direction and top axis
        adjustTop(pos, menu){
            const gap = 5,
                scrollTop = window.pageYOffset,
                viewHeight = document.documentElement.clientHeight,
                srcTop = this.rightClick ? this.y : pos.top + scrollTop;
            let t = this.rightClick ? this.y : pos.top + pos.height + gap + scrollTop;
            let overDown = false, overUp = false;
            //list over screen
            if((t + menu.height) > (scrollTop + viewHeight)) overDown = true;
            if((srcTop - gap - menu.height) < 0) overUp = true;

            if(!overUp && overDown){
                t = srcTop - gap - menu.height;
				this.dropUp = true;
            }
            this.styleSheet.top = `${t}px`;
        },
        adjustLeft(pos, menu){
            const scrollLeft = window.pageXOffset, viewWid = document.documentElement.clientWidth;
            const wid = this.rightClick ? 0 : pos.width,
                //align left's left
                left = this.rightClick ? this.x : pos.left + scrollLeft,
                //align center's left
                center = (left + (wid / 2)) - (menu.width / 2),
                //align right's left
                right = (left + wid) - menu.width;

            switch (this.align){
                case 'left': return (left + menu.width) > (scrollLeft + viewWid) ? right : left;
                case 'center':
                    if((center + menu.width) > (scrollLeft + viewWid)) return right;
                    else if(right < scrollLeft) return left;
                    else return center;
                case 'right': return (right < scrollLeft) ? left : right;
            }
        },
		/**
		 * the dropdown container outside click handle
		 * @param e - MouseEvent
		 */
        whole(e){
            if(this.show){
				//is caller click
				const inCaller = this.eventPath(e).findIndex(val=>val === this.$el);
				/**
				 * close the dropdown when clicking outside the dropdown container
				 * reopen the dropdown when caller click(reOpen = true) or right-click in caller(rightClick = true)
				 */
				if(inCaller === -1 || (inCaller !== -1 && (this.reOpen || this.rightClick ))){
					this.visible();
				}
            }
        },
		scrollInfo(){
			const supportPageOffset = window.pageXOffset !== undefined;
			const isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");

			const x = supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft;
			const y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
			return { x: x, y: y };
		},
		/**
		 * returns the event’s path which is an array of the objects on which listeners will be invoked
		 * @param e - MouseEvent
		 * @returns {Array|EventTarget[]|*}
		 */
		eventPath(e){
        	if('composedPath' in e) return e.composedPath();
        	if('path' in e) return e.path;
        	//polyfill
			const path = [];
			let currentElem = e.target;
			while (currentElem) {
				path.push(currentElem);
				currentElem = currentElem.parentElement;
			}
			if (path.indexOf(window) === -1 && path.indexOf(document) === -1) path.push(document);
			if (path.indexOf(window) === -1) path.push(window);
			return path;
		}
    },
    mounted(){
        if(this.width) this.styleSheet.width = this.width + 'px';

        if(this.embed) this.visible();
        else{
            document.body.appendChild(this.$refs.dropdown);

            this.$on('show', this.visible);
            this.$on('adjust', this.adjust);
            document.body.addEventListener('mousedown', this.whole);
        }
    },
	beforeDestroy(){
    	//remove drop down layer
		if(!this.embed) {
			this.$refs.dropdown.remove();
		}
	},
    destroyed(){
        if(!this.embed) {
            document.body.removeEventListener('mousedown', this.whole);
            this.$off('show', this.visible);
            this.$off('adjust', this.adjust);
            this.$el.remove();
        }
    }
}
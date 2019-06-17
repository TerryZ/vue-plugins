import './dropdown.scss';

export default {
    name: "v-dropdown",
    props:{
        value:{
            type: Boolean,
            default: false
        },
        align: {
            type: String,
            default: 'left'
        },
        embed: {
            type: Boolean,
            default: false
        },
        rightClick: {
            type: Boolean,
            default: false
        },
        /**
         * when the drop-down container is already open, whether to open the drop-down container
         * again after clicking the caller
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
        x: Number,
        y: Number
    },
    data(){
        return {
            show: this.value,
            styleSheet: { top: '',left: '' },
            dropdownClass: 'v-dropdown-container',
            dropUp: false,
            lastCaller: null
        };
    },
    computed: {
        animate(){
            let cls = '';
            if(!this.embed && this.animated) cls = this.dropUp ? 'animate-up' : 'animate-down';
            if(typeof this.animated === 'string') cls = this.animated;
            return cls;
        }
    },
    render(h){
        //console.log(this.$slots)
		const children = [];
        //the dropdown layer caller
		if(this.$slots.caller && Object.keys(this.$slots.caller).length && !this.embed){
        	children.push(this.$slots.caller);
		}
		//the dropdown layer container
        children.push(h('div',{
        	class: {
				[this.dropdownClass]: true,
				'v-dropdown-embed': this.embed
			},
			style: this.styleSheet,
			directives: [{name: 'show', value: this.show}],
			ref: 'dropdown'
		},this.$slots.default));

        return h('transition',{
            props: {
                name: this.animate
            }
        },[h('div',{
        	class: 'v-dropdown-caller',
			on: {
        		click: e=>{
        			e.stopPropagation();
        			this.visible();
				}
			}
		},children)]);
    },
    methods: {
        visible(){
            this.$nextTick(()=>{
                //calculation show direction(up or down) and top axis
                if(!this.show && !this.embed && this.$slots.caller) this.adjust();

                this.show = !this.show;

                //this.lastCaller = caller;
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
            this.adjustLeft(pos, menu);
        },
        //get container show up direction and top axis
        adjustTop(pos, menu){
            const gap = 5,
                scrollTop = window.pageYOffset,
                viewHeight = document.documentElement.clientHeight,
                srcTop = this.rightClick ? this.y : pos.top + scrollTop;
            let t = 0, u = false;

            t = this.rightClick ? this.y : pos.top + pos.height + gap + scrollTop;
            let overDown = false, overUp = false;
            //list over screen
            if((t + menu.height) > (scrollTop + viewHeight)) overDown = true;
            if((srcTop - gap - menu.height) < 0) overUp = true;

            if(!overUp && overDown){
                t = srcTop - gap - menu.height;
                u = true;
            }
            this.dropUp = u;
            this.styleSheet.top = `${t}px`;
        },
        adjustLeft(pos, menu){
            const scrollLeft = window.pageXOffset,
                viewWid = document.documentElement.clientWidth;
            let l = 0, wid = this.rightClick ? 0 : pos.width,
                //align left's left
                left = this.rightClick ? this.x : pos.left + scrollLeft,
                //align center's left
                center = (left + (wid / 2)) - (menu.width / 2),
                //align right's left
                right = (left + wid) - menu.width;

            switch (this.align){
                case 'left':
                    l = (left + menu.width) > (scrollLeft + viewWid) ? right : left;
                    break;
                case 'center':
                    if((center + menu.width) > (scrollLeft + viewWid)) l = right;
                    else if(right < scrollLeft) l = left;
                    else l = center;
                    break;
                case 'right':
                    l = (right < scrollLeft) ? left : right;
                    break;
            }

            this.styleSheet.left = `${l}px`;
        },
        whole(e){
            if(this.show){
                let callerClick = false, idx = e.path.findIndex(val=>val.className &&
                    typeof val.className === 'string' &&
                    val.className.includes(this.dropdownClass));
                if(!this.reOpen && e.path.find(val=>val === this.lastCaller) && !this.rightClick) callerClick = true;
                if(idx === -1 && !callerClick) this.visible();
            }
        },
        MouseEventPolyfill(){
            if (!('path' in Event.prototype)) {
                Object.defineProperty(Event.prototype, 'path', {
                    get() {
                        const path = [];
                        let currentElem = this.target;
                        while (currentElem) {
                            path.push(currentElem);
                            currentElem = currentElem.parentElement;
                        }
                        if (path.indexOf(window) === -1 && path.indexOf(document) === -1) path.push(document);
                        if (path.indexOf(window) === -1) path.push(window);
                        return path;
                    }
                });
            }
        }
    },
    created(){
        this.MouseEventPolyfill();
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
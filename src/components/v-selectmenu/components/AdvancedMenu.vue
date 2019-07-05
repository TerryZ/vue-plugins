<template>
    <div :class="classes" ref="list">
        <!-- max-height: 300px; -->
        <ul class="sm-results" :style="listStyle" ref="listUl">
            <!-- advance menu list -->
            <!-- eslint-disable-next-line -->
            <li pkey="11" v-for="(item,index) in list" :key="index" v-if="!message"
                @click="selectItem(item)"
                @mouseenter="highlight(index)"
                @mouseleave="highlight(-1)"
                :class="{'sm-selected': selected.includes(item), 'sm-over': index===highlight }">
                <div class="sm-selected-icon"><i class="sm-iconfont icon-selected"></i></div>
                <div class="sm-item-text" v-html="getRowText(item)"></div>
            </li>
            <!-- no result message -->
            <li class="sm-message-box" v-if="!list.length">
                <i class="sm-iconfont icon-warn"></i>
                <span v-text="i18n.not_found"></span>
            </li>
            <li class="sm-message-box" v-if="message">
                <i class="sm-iconfont icon-warn"></i>
                <span v-html="message"></span>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "AdvancedMenu",
        props: {
            list: Array,
            scroll: Boolean,
            group: Boolean,
            search: String,
            message: String,
            selected: Array,
			value: Number
        },
        inject: ['i18n'],
        data(){
        	return {
				listStyle: {},
            };
        },
        computed: {
            classes(){
                return {
                    'sm-result-area':true,
                    'sm-scroll-limit': this.scroll,
                    'sm-list-mode': !this.group
                };
            }
        },
        methods: {
            getRowText(row){
                if(typeof this.showField === 'string') return row[this.showField];
                else if(typeof this.showField === 'function') return this.showField(row);
            },
			highlight(index){
				this.$emit('input', index);
			}
        }
    }
</script>
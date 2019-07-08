<template>
    <li v-if="data && Object.keys(data).length" :class="classes" >
        <a :href="data.url&&!data.disabled?data.url:'javascript:void(0);'"
           :target="data.open?'_blank':'_self'" @click="click"
           v-if="data.content !== 'sm-divider' && data.content !== 'sm_divider'">
<!--            <span v-html="data.content"></span>-->
            <item-content :content="data.content"></item-content>
            <span class="sm-caret-right" v-if="data.menus"></span>
        </a>
    </li>
</template>

<script>
    import content from './Content';
    export default {
        name: "v-menu-item",
        components:{'item-content': content},
        props: {
            data: {
                type: Object,
                required: true
            }
        },
        inject: ['parentInst'],
        computed: {
            classes(){
                return {
                    'sm-divider': this.data.content === 'sm-divider' || this.data.content === 'sm_divider',
                    'sm-header': this.data.header,
                    'sm-disabled': this.data.disabled
                };
            }
        },
        methods: {
            click(){
                if(this.data.disabled) return;
                if(this.data && this.data.callback && typeof this.data.callback === 'function'){
					//this.data.callback.call(this.parentInst);
                    this.data.callback();
                }
            }
        }
    }
</script>
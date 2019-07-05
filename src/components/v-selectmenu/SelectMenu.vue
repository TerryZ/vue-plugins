<template>
    <!-- drop down list -->
    <v-dropdown class="v-selectmenu" ref="drop" @show-change="showChange"
                :align="align"
                :embed="embed"
                :x="x"
                :y="y"
                :right-click="rightClick" >

        <template #caller v-if="!embed">
            <div class="caller-container" ref="caller"
                 @mouseenter="moveIn"
                 @mouseleave="moveOut"
                 @contextmenu="mouseRight"
                 @click="click">
                <slot :show="show">
                    <button type="button" :class="['sm-default-btn', {'sm-opened': show}]">
                        {{btnText}}
                        <span class="sm-caret-down"></span>
                    </button>
                </slot>
            </div>
        </template>

        <!-- header bar -->
        <div class="sm-header" v-if="title || !regular || state.group">
            <h3 v-text="headerText"></h3>
            <button type="button" :title="i18n.select_all_btn" class="sm-selectall-button"
                    @click="selectAll" v-if="!regular && multiple"><i class="sm-iconfont icon-selectall"></i></button>
            <button type="button" :title="i18n.remove_all_btn" class="sm-removeall-button" @click="clear"
                    v-if="!regular"><i class="sm-iconfont icon-removeall"></i></button>
            <button type="button" @click="close" :title="i18n.close_btn" v-if="!embed"
                    class="sm-close-button">×</button>
        </div>

        <!-- search bar -->
        <div class="sm-input-area" v-if="!regular && query">
            <input type="text" autocomplete="off" ref="input"
                   v-model.trim="search"
                   @keyup="processKey"
                   @keydown.stop="processControl"
                   class="sm-input">
        </div>

        <!-- tabs bar -->
        <div class="sm-result-tabs" v-if="state.group">
            <ul>
                <li v-for="(tab,index) in data" :key="index">
                    <a href="javascript:void(0);"
                       :tab-id="'selectmenu-tab-' + (index+1)"
                       :data-index="index"
                       @click="tabIndex = index"
                       :class="{active:index === tabIndex}">{{tab.title}}</a>
                </li>
            </ul>
        </div>

        <!-- results list -->
        <advanced v-if="!regular" :list="results" :search="search" :message="message" :selected="selected"></advanced>
        <regular v-if="regular" :show="show" :data="results"
                        :parent-instance="$parent" @close="close"></regular>
    </v-dropdown>
</template>

<script>
    import './selectmenu.scss';
    import lang from './language';

    import props from './mixins/props';
    import methods from './mixins/methods';

    import drop from 'v-dropdown';
    import regular from './components/RegularMenu';
    import advanced from './components/AdvancedMenu';

    export default {
        name: "v-selectmenu",
        components: {
            'regular': regular,
            'advanced': advanced,
            'v-dropdown': drop
        },
        mixins: [props, methods],
        provide(){
            return {
                parentInst: this.$parent,
                i18n: this.i18n
            };
        },
        data(){
            return {
                results: [],
                subMenus: [],
                selected: [],
                search: '',
                headerText: '',
                i18n: lang[this.language],
                tabIndex: -1,
                show: false,
                highlight: -1,
                message: '',
                x: null,
                y: null,
                menuClass:{
                    'sm-regular': false
                },
                menuStyle: {
                    top: '',
                    left: ''
                },
                state: {
                    group: false
                }
            };
        },
        computed: {
            btnText(){
                return this.selected.length?this.selected.concat().map(val=>val[this.showField]).join(','):this.i18n.advance_default;
            }
        },
        watch:{
            tabIndex(val){
                this.tabIndex = val;
                this.switchTab();
            },
            value(val){
                this.init();
            },
            selected(val){
                if(this.message && this.maxSelected && val.length < this.maxSelected) this.message = '';
                this.$emit('input', val.slice().map(value=>value[this.keyField]).join(','));
                this.$emit('values', val.slice());
            }
        },
        mounted(){
            this.checkDataType();

            if(this.title){
                this.headerText = this.title;
            }else{
                if(this.regular && this.state.group) this.headerText = this.i18n.regular_group;
                if(!this.regular) this.headerText = this.i18n.advance_default;
            }

            if(this.data.length){
                if(this.state.group) this.tabIndex = 0;
                else this.results = this.data.slice();
            }
            if(this.regular) this.menuClass['sm-regular'] = true;
            else this.init();


            console.log(this.results)
            this.$on('clear', this.clear);
        },
        destroyed(){
            this.$off('clear', this.clear);
        }
    }
</script>
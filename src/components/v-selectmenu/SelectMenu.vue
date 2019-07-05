<template>
    <!-- drop down list -->
    <dropdown class="v-selectmenu" ref="drop" @show="showChange"
                :border="false"
                :align="align"
                :embed="embed"
                :right-click="rightClick" >

        <template #caller v-if="!embed">
            <div class="caller-container">
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
        <div class="sm-search" v-if="!regular && query">
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
        <regular v-if="regular" :show="show" :data="results"
                 :parent-instance="$parent" @close="close"></regular>
        <advanced v-else :list="results"
                  v-model="highlight"
                  :search="search"
                  :scroll="scroll"
                  :message="message"
                  :picked="picked"
                  @select="selectItem">
            <template #row v-slot:default="row">
                <slot name="row" :row="row"></slot>
            </template>
        </advanced>

    </dropdown>
</template>

<script>
    import './selectmenu.scss';

	import data from './mixins/data';
    import props from './mixins/props';
    import methods from './mixins/methods';
    import util from './mixins/util';

    import drop from 'v-dropdown';
    import regular from './components/regular/Menu';
    import advanced from './components/advanced/List';

    export default {
        name: "v-selectmenu",
        components: {
            'regular': regular,
            'advanced': advanced,
            'dropdown': drop
        },
        mixins: [data, props, methods, util],
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


            // console.log(this.results)
            // console.log(this.$slots)
            this.$on('clear', this.clear);
        },
        destroyed(){
            this.$off('clear', this.clear);
        }
    }
</script>
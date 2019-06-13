<template>
    <div class="v-selectpage">
        <!-- select panel -->
        <div :class="inputClasses" ref="caller" @click="open">
            <!-- multiple with tag form -->
            <sp-tag :disabled="disabled" :placeholder="placeholderString" @remove="remove"
                    :picked="picked" v-if="multiple" />
            <sp-select :disabled="disabled" :results="results"
                      :placeholder="placeholderString" @remove="remove" v-else />
            <div :class="{'sp-button':true,open: show}"><span class="sp-caret"></span></div>
        </div>

        <!-- drop down list -->
        <v-dropdown ref="drop" @show-change="showChange" :width="width" :align="rtl?'right':'left'" >
            <!-- header bar -->
            <div class="sp-header">
                <h3 v-html="headerTitle"></h3>
                <button type="button" :title="i18n.select_all" class="sp-select-all-btn"
                        @click="pickPage(true)" v-if="multiple"><i class="sp-iconfont sp-icon-select-all"></i></button>
                <button type="button" :title="i18n.unselect_all" class="sp-remove-all-btn" v-if="multiple"
                        @click="pickPage(false)" ><i class="sp-iconfont sp-icon-unselect-all"></i></button>
                <button type="button" :title="i18n.clear_all" class="sp-clear-all-btn"
                        @click="remove" ><i class="sp-iconfont sp-icon-clear"></i></button>
                <button type="button" :title="i18n.close_btn" @click="close"
                        class="sp-close-btn"><i class="sp-iconfont sp-icon-close"></i></button>
            </div>
            <!-- search bar -->
            <div class="sp-search">
                <input type="text" autocomplete="off" ref="search" v-model="search"
                       @keyup="processKey" @keydown.stop="processControl" class="sp-search-input">
            </div>
            <!-- message bar -->
            <transition name="sp-message-slide" :appear="true">
                <div class="sp-message" v-if="message">
                    <i class="sp-iconfont sp-icon-warning"></i>
                    <span v-html="message"></span>
                </div>
            </transition>
            <!-- content list bar -->
            <div class="sp-result-area" >
                <!-- single column(list) mode -->
                <sp-list v-if="!tbColumns" v-show="list.length" :list="list"
                        :picked="picked" v-model="highlight" @select="selectItem" />
                <!-- multiple columns(table) mode -->
                <sp-table v-if="Array.isArray(tbColumns)&&tbColumns.length" v-show="list.length" :list="list"
                         :tb-columns="tbColumns" :picked="picked" v-model="highlight" @select="selectItem" />
                <!-- no result message -->
                <div v-if="!list.length" class="sp-result-message" v-text="i18n.not_found"></div>
            </div>
            <!-- pagination bar -->
            <sp-page ref="page" :total-row="totalRows" v-if="pagination"
                          v-model="pageNumber" :page-size="pageSize" />
        </v-dropdown>
    </div>
</template>

<script>
    import './selectpage.scss';
    import data from './mixins/data';
    import methods from './mixins/methods';

    //import dropdown from 'v-dropdown';
    import dropdown from '../v-dropdown/Dropdown';
    import tag from './components/Tag';
    import select from './components/Select';
    import page from './components/Pagination';
    import listView from './components/List';
    import tableView from './components/Table';

    export default {
        name: "v-selectpage",
        mixins: [data, methods],
        components: {
            'v-dropdown': dropdown,
            'sp-tag': tag,
            'sp-select': select,
            'sp-page': page,
            'sp-list': listView,
            'sp-table': tableView
        },
        provide(){
            return {
                i18n: this.i18n,
                renderCell: this.renderCell,
                keyField: this.keyField,
                showField: this.showField,
                rtl: this.rtl
            };
        },
        computed: {
            headerTitle(){
                const headerStr = this.i18n.items_selected,
                    replace = val => headerStr.replace('selected_count', `<b>${val}</b>`);
                if(this.picked.length) return this.multiple?replace(this.picked.length):this.getResults();
                else return this.title;
            },
            results(){
                return this.getResults();
            },
            placeholderString(){
                return this.placeholder?this.placeholder:this.i18n.placeholder;
            },
            inputClasses(){
                return { 'sp-input-container': true, 'sp-open': this.show, 'sp-disabled': this.disabled };
            }
        },
        mounted(){
            this.scrollPolyfill();

            //switch class name
            //let className = this.$el.className;
            //this.$el.className = 'v-selectpage';
            //this.$refs.input.className += ' ' + className;

            //set searchField when user not config
            if(!this.searchField){
                if(typeof this.showField === 'string') this.searchColumn = this.showField;
                else if(Array.isArray(this.showField) && this.showField.length)
                    this.searchColumn = this.showField[0].data;
            }else this.searchColumn = this.searchField;

            //sort data list
            this.sortList();

            this.initSelection();

            this.$on('clear', this.remove);
        },
        destroyed(){
            this.$off('clear', this.remove);
        }
    }
</script>
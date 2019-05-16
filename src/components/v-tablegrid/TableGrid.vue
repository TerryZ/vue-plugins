<template>
    <div :class="tableTheme">
        <div class="v-table-grid__scroller">
            <table :class="classes" class="v-table-grid">
                <thead>
                    <tr>
                        <th v-if="checkRow" class="select-column">
                            <span v-if="checkRow === 'single'">选择</span>
                            <input type="checkbox" v-model="checkAll" @click="selectAll" v-if="checkRow === 'multi'" >
                        </th>
                        <th v-for="(col,index) in columns" :key="index" @click="sortChange(col.data, index)"
                            :class="titleClass(index, col.align)" :column="col.data" v-text="col.title"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr :key="index" v-for="(row,index) in dataRows"
                        @click.stop="rowClick(index)" :class="{'row-selected':selectedIndex.includes(index)}">
                        <td v-if="checkRow !== false" class="select-column">
                            <input type="checkbox" :checked="selectedIndex.includes(index)">
                        </td>
                        <slot :row="row">
                            <td v-for="(cell,idx) in columns" :key="idx"
                                :class="alignClass(cell.align)" v-text="row[cell.data]"></td>
                        </slot>
                    </tr>
                    <tr v-if="dataRows.length === 0" class="v-table-grid--empty">
                        <td :colspan="checkRow !== false?columns.length+1:columns.length" >无数据返回</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="v-table-grid__pagination">
            <v-pagination v-bind="pagerOptions" :total-row="totalRow"
                          @page-change="pageChange" v-if="pagination" ></v-pagination>
        </div>
    </div>
</template>

<script>
    import './tablegrid.scss';
    import { con } from './constants';
    //import {vPage} from 'v-page';
    import { vPage } from '../v-page';
    import mixins from './mixins';
    export default {
        name: "v-tablegrid",
        components: { 'v-pagination': vPage },
        mixins: [mixins],
        data(){
            return {
				totalRow: 0,
                dataRows:[],
                con: con,
                checkAll: false,

                sortIndex: -1,
                sortCol: this.sortColumn,
                sortOrd: this.sortOrder,

                currentIndex: -1,
                selectedIndex: [],
                pageNumber: -1,
                pageSizeNum: -1,
                first: true
            }
        },
        computed: {
            classes(){
                const classes = {
					'v-table-grid--bordered': this.border,
					'v-table-grid--striped': this.stripe
				};
                if(this.theme === 'material') {
					classes['v-table-grid--bordered'] = false;
					classes['v-table-grid--striped'] = false;
                }
                return classes;
            },
            pagerOptions(){
                let options = { border: false };
                if(this.pageSizeMenu === false || (Array.isArray(this.pageSizeMenu) && this.pageSizeMenu.length))
                    options['page-size-menu'] = this.pageSizeMenu;
                return options;
            },
            tableTheme(){
                return {
                    'v-table-grid__container': true,
                    'v-table-grid--material': this.theme === 'material'
                };
            }
        },
        watch:{},
        methods:{
            titleClass(index, align){
                const sort = {
                    sorting: this.sorting,
                    sorting_asc: this.sorting && this.sortIndex === index && this.sortOrd === 'asc',
                    sorting_desc: this.sorting && this.sortIndex === index && this.sortOrd === 'desc'
                }, cls = this.alignClass(align);
                if(cls) sort[cls] = true;
                return sort;
            },
            alignClass(align){
                switch (align) {
                    case 'center': return 'v-table-grid--align-center';
                    case 'right': return 'v-table-grid--align-right';
                    default: return '';
                }
            },
            /**
             * update data to table
             * @param values - server side return data
             */
            dataRender(values){
                if(values && Object.keys(values).length){
                    this.dataRows = values.list;
                    this.totalRow = values.totalRow;
                }
            },
            /**
             * clear state when grid data load
             */
            clearState(){
                this.currentIndex = -1;
                if(this.selectedIndex.length) this.selectedIndex = [];
                this.$emit('selected', []);
            },
            /**
             * table column click
             */
            /*
            cellEvent(cell, data, row){
                let e = {};
                if(cell && cell.callback && typeof cell.callback ==='function'){
                    e['click'] = ev =>{
                        ev.stopPropagation();
                        cell.callback(data, row);
                    };
                }
                return e;
            },
            */
            /**
             * Load table data
             */
            populate(){
                if(typeof this.data === 'string') this.paginationServer();
                else if(Array.isArray(this.data)) this.dataRender(this.paginationJson());
                this.clearState();
            },
            /**
             * Receive page switch and do request
             * @param pInfo - page switch info
             */
            pageChange(pInfo){
                if(!this.autoload && this.first) this.first = false;
                else{
                    if(pInfo && Object.keys(pInfo).length){
                        this.pageNumber = pInfo.pageNumber;
                        this.pageSizeNum = pInfo.pageSize;
                        this.populate();
                    }
                }
            },
            /**
             * Column sort change
             * @param column
             * @param index
             */
            sortChange(column, index){
                if(!this.sorting) return;
                this.sortCol = column;
                if(this.sortIndex === index) {//sorting
                    if(!this.sortOrd || this.sortOrd === con.orderDesc) this.sortOrd = con.orderAsc;
                    else if(this.sortOrd === con.orderAsc) this.sortOrd = con.orderDesc;
                }else{
                    this.sortIndex = index;
                    this.sortOrd = con.orderAsc;
                }
            },
            /**
             * Table row click
             * @param index
             */
            rowClick(index){
                if(!this.checkRow) return;
                if(!this.selectedIndex.includes(index)) {
					if(this.checkRow === con.checkSingle) this.selectedIndex = [];
                    this.selectedIndex.push(index);
				}else this.selectedIndex = this.selectedIndex.filter(val=>val!==index);
                this.currentIndex = index;
                this.$emit('selected', this.dataRows.filter( (val, idx) => this.selectedIndex.includes(idx) ));

                if(this.checkRow === con.checkMulti) this.checkAll = this.selectedIndex.length === this.dataRows.length;
            },
            /**
             * Select all rows
             */
            selectAll(){
                this.$nextTick(()=>{
                    if(this.checkAll) this.selectedIndex = this.dataRows.map((val, idx)=>idx);
                    else this.selectedIndex = [];
                });
            }
        },
        mounted(){
            if(!this.pagination && this.autoload) this.populate();
            this.$on('reload', this.populate);
            this.$on('search', ()=>{
                this.pageNumber = 1;
                this.populate();
            });
        },
        destroyed(){
            this.$off('reload');
            this.$off('search');
        }
    }
</script>
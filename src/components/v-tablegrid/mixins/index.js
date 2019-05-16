import { con } from '../constants';

export default {
    props: {
		/**
		 * default selected item
		 */
		value: Array,
        /**
         * Table data source
         * @type array | string
         * array type format
         * [
         *     {"id":1,"field1":"xxx","field2":222},
         *     {...}
         * ]
         * string type url format
         * '/user/profile'
         */
        data: {
            type: [String, Array],
            required: true
        },
        /**
         * table columns set
         * format:
         * [
         *     {data: 'name', title: 'UserName', align: 'center|right'},
         *     {data: 'sex', title: 'Sex'},
         *     {...}
         * ]
         */
        columns: {
            type: Array,
            required: true
        },
        /**
         * Row select mode
         * @type string | boolean
         * @enum 'single' - default
         * @enum 'multi'
         * @enum false - close check column
         */
        checkRow: {
            type: [String, Boolean],
            default: 'single'
        },
        /**
         * Table column sort
         */
        sorting: {
            type: Boolean,
            default: false
        },
        /**
         * Sort column name
         */
        sortColumn: String,
        /**
         * Column sort order
         * @enum 'asc' - default
         * @enum 'desc'
         */
        sortOrder: {
            type: String,
            default: 'asc'
        },
        /**
         * Whether show pagination bar
         */
        pagination: {
            type: Boolean,
            default: true
        },
        /**
         * page length menu
         */
        pageSizeMenu: {
            type: [Array, Boolean],
            default: true
        },
        /**
         * number of records displayed on page, available in pagination set to false
         */
        pageSize: {
            type: Number,
            default: 100
        },
        /**
         * auto load data when grid init
         */
        autoload: {
            type: Boolean,
            default: true
        },
        /**
         * the parameters send to server side
         */
        params: Object,
        /**
         * the table border
         */
        border: {
            type: Boolean,
            default: true
        },
        stripe: {
            type: Boolean,
            default: false
        },
        /**
         * table theme
         * 'material' - Material Design
         */
        theme: {
            type: String,
            default: ''
        }
    },
    methods: {
        paginationJson(){
            if(!this.data || !Array.isArray(this.data) || !this.data.length) return [];
            const num = this.pageNumber === -1 ? 1 : this.pageNumber,
                size = this.pageSizeNum === -1 ? 10 : this.pageSizeNum,
                start = (num - 1) * size, end = (num * size) -1;
            let list = this.data.concat();
            //do sort
            if(this.sorting && this.sortCol && list[0].hasOwnProperty(this.sortCol)){
                let order = this.sortOrd===con.orderAsc || this.sortOrd===con.orderDesc?this.sortOrd:con.orderAsc,
                    col = this.sortCol;
                list = list.sort((a, b)=>{
                    if(order === con.orderAsc){
                        return typeof a[col] === 'number'?a[col]-b[col]:String(a[col]).localeCompare(String(b[col]));
                    }else if(order === con.orderDesc){
                        return typeof a[col] === 'number'?b[col]-a[col]:String(b[col]).localeCompare(String(a[col]));
                    }
                });
            }
            return {
                totalRow: list.length,
                list: list.filter((val,index)=>index >= start && index <= end)
            };
        },
        paginationServer(){
            let params = {};
            //sort parameters set
            if(this.sorting && this.sortCol){
                params.sortName = this.sortCol;
                params.sortOrder = this.sortOrd ? this.sortOrd : con.orderAsc;
            }
            //page parameters set
            if(this.pagination){
                if(this.pageSizeNum !== -1) params.pageSize = this.pageSizeNum;
            }else params.pageSize = this.pageSize;
            params.pageNumber = this.pageNumber === -1 || !this.pagination ? 1 : this.pageNumber;

            if(this.params && Object.keys(this.params).length) params = Object.assign({}, params, this.params);

            if(this.dataLoad && typeof this.dataLoad === 'function')
                this.dataLoad(this, this.data, params).then(values=>{ this.dataRender(values); });
        }
    }
};
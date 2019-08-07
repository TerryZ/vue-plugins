<template>
    <dropdown ref="drop" :border="false" @show="showChange">
        <template #caller>
            <div class="rg-caller-container">
                <slot>
                    <!-- default region selector caller button -->
                    <button type="button" :class="['rg-default-btn', {'rg-opened': show}]">
                        {{selectedText?selectedText:lang.pleaseSelect}}
                        <span class="rg-iconfont icon-clear rg-clear-btn" :title="lang.clear" v-if="selectedText" @click.stop="clear"></span>
                        <span class="rg-caret-down" v-else></span>
                    </button>
                </slot>
            </div>
        </template>
        <!-- header bar -->
        <div class="rg-header">
            <h3>
                <span v-show="!selectedText" v-text="lang.defaultHead"></span>
                <span v-show="selectedText" class="rg-header-selected" v-text="selectedText"></span>
            </h3>

            <button type="button" :title="lang.clear" @click="clear" class="rg-removeall-button" >
                <i class="rg-iconfont icon-remove"></i>
            </button>
            <button type="button" :title="lang.done" @click="close" class="rg-done-button" >
                <i class="rg-iconfont icon-done"></i>
            </button>
        </div>
        <!-- search bar -->
        <div class="rg-search" v-if="search">
            <input type="text" autocomplete="off" ref="search" v-model.trim="query" class="rg-input" placeholder="">
        </div>
        <!-- region level tabs -->
        <div class="rg-level-tabs" >
            <ul>
                <!-- eslint-disable-next-line -->
                <template v-if="levelAvailable">
                <li :key="index" v-for="(tab,index) in levels">
                    <a href="javascript:void(0);" @click="level = index"
                       v-text="tab.title" :class="{active:index === level}"></a>
                </li>
                </template>
            </ul>
        </div>
        <!-- selector mode -->
        <div class="rg-results-container">
            <ul class="rg-results">
                <li :class="{'rg-item':true,active:matchItem(item)}" @mouseup="itemSelect(item)"
                    v-text="item.value" :key="index" v-for="(item,index) in list"></li>
                <li class="rg-message-box" v-if="list.length === 0" v-text="lang.noMatch"></li>
            </ul>
        </div>
    </dropdown>
</template>

<script>
    import dropdown from 'v-dropdown';
    import data from '../mixins/data';
    import method from '../mixins/method';
    import search from '../mixins/selectorWithSearch';
    import selector from '../mixins/selector';
    import {PROVINCE_LEVEL, CITY_LEVEL, AREA_LEVEL, TOWN_LEVEL} from '../constants';
    export default {
        name: "TabSelector",
        mixins: [data, method, search, selector],
        inheritAttrs: false,
        components: { dropdown },
        props: {
            search: {
                type: Boolean,
                default: true
            }
        },
        data(){
            return {
                ui: true,
                list: [],
                query: '',
                levels: [
                    {index:PROVINCE_LEVEL,title:'省/直辖市'},
                    {index:CITY_LEVEL,title:'市'},
                    {index:AREA_LEVEL,title:'区/县'},
                    {index:TOWN_LEVEL,title:'乡/镇/街道'}
                ],
                level: -1
            };
        },
        watch: {
            /**
             * region search(ui mode)
             * search region description first, if no result, then search region key
             * @param value
             */
            query(value){
                let list = this.getList(this.level),tmp = [];
                tmp = list.filter(val=>val.value.toLowerCase().includes(value.toLowerCase()));
                if(tmp.length === 0) tmp = list.filter(val=>val.key.includes(value));
                this.list = tmp;
            },
            /**
             * current region group(ui selector mode)
             */
            level(val){
                this.$nextTick(()=>{
                    this.list = this.getList(val);
                });
            }
        },
        computed: {
			//check level available
			levelAvailable(){
				switch(this.level){
					case PROVINCE_LEVEL: return true;
					case CITY_LEVEL: return this.city;
					case AREA_LEVEL: return !!(this.city && this.area);
					case TOWN_LEVEL: return !!(this.city && this.area && this.town && this.haveTown);
                    default: return false;
				}
			},
        },
        methods: {
            //load list when switch to next level
            getList(val){
                switch(val){
                    case PROVINCE_LEVEL: return this.listProvince;
                    case CITY_LEVEL: return this.listCity;
                    case AREA_LEVEL: return this.listArea;
                    case TOWN_LEVEL: return this.listTown;
                }
            },
            matchItem(item){
                if(!item || !Object.keys(item).length) return false;
                switch(this.level){
                    case PROVINCE_LEVEL: return Object.is(item, this.dProvince);
                    case CITY_LEVEL: return Object.is(item, this.dCity);
                    case AREA_LEVEL: return Object.is(item, this.dArea);
                    case TOWN_LEVEL: return Object.is(item, this.dTown);
                }
            },
            itemSelect(item){
                let nextLevel = this.level;
                //console.log(item)
                switch(this.level){
                    case PROVINCE_LEVEL:
                        this.dProvince = item;
                        if(this.city) nextLevel = CITY_LEVEL;
                        else this.close();
                        break;
                    case CITY_LEVEL:
                        this.dCity = item;
                        if(this.area) nextLevel = AREA_LEVEL;
                        else this.close();
                        break;
                    case AREA_LEVEL:
                        this.dArea = item;
                        this.$nextTick(()=>{
                            if(this.town && this.haveTown) nextLevel = TOWN_LEVEL;
                            else this.close();
                        });
                        break;
                    case TOWN_LEVEL:
                        this.dTown = item;
                        this.close();
                        break;
                }
                this.$nextTick(()=>{
                    if(this.level !== nextLevel) this.level = nextLevel;
                });
            },
            clear(){
                this.dProvince = null;
                this.level = PROVINCE_LEVEL;
            },
            provinceChange(newVal, oldVal){
                this.baseProvinceChange(newVal, oldVal);
            },
            cityChange(newVal, oldVal){
                this.baseCityChange(newVal, oldVal);
            },
            areaChange(newVal, oldVal){
                this.baseAreaChange(newVal, oldVal);
            },
            townChange(newVal, oldVal){
                this.baseTownChange(newVal, oldVal);
            }
        },
        beforeMount(){
            this.level = PROVINCE_LEVEL;
        }
    }
</script>
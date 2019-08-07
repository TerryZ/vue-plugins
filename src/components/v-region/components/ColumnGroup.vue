<template>
    <v-drop-down ref="drop" :border="false" @show-change="showChange">
        <template #caller>
            <div class="rg-caller-container">
                <slot>
                    <!-- default region selector caller button -->
                    <button type="button" :class="['rg-default-btn', {'rg-opened': show}]">
                        {{selectedText?selectedText:lang.pleaseSelect}}
                        <span class="rg-iconfont rg-icon-clear rg-clear-btn" :title="lang.clear" v-if="selectedText" @click.stop="clear"></span>
                        <span class="rg-caret-down" v-else></span>
                    </button>
                </slot>
            </div>
        </template>
        <div class="rg-column-container">
            <v-column @click.native="operLevel=con.PROVINCE_LEVEL" v-if="listProvince.length"
                      :list="listProvince" :have-child="city" v-model="dProvince"></v-column>
            <v-column @click.native="operLevel=con.CITY_LEVEL" v-if="listCity.length"
                      :list="listCity" :have-child="area" v-model="dCity"></v-column>
            <v-column @click.native="operLevel=con.AREA_LEVEL" v-if="listArea.length"
                      :list="listArea" :have-child="town && haveTown" v-model="dArea"></v-column>
            <v-column @click.native="operLevel=con.TOWN_LEVEL" v-if="listTown.length"
                      :list="listTown" :have-child="false" v-model="dTown"></v-column>
        </div>
    </v-drop-down>
</template>

<script>
    import '../styles/icons.styl';
    import dropDown from 'v-dropdown';
    import data from '../mixins/data';
    import method from '../mixins/method';
    import selector from '../mixins/selector';
    import * as constants from '../constants';
    import column from './Column';

    const {PROVINCE_LEVEL, CITY_LEVEL, AREA_LEVEL, TOWN_LEVEL} = constants;

    export default {
        name: "ColumnGroup",
        mixins: [data, method, selector],
        inheritAttrs: false,
        components: {
            'v-drop-down': dropDown,
            'v-column': column
        },
        data(){
            return {
                operLevel: -1,
                con : constants
            }
        },
        methods: {
            provinceChange(newVal, oldVal){
                this.baseProvinceChange(newVal, oldVal);
                this.checkLevel(PROVINCE_LEVEL);
            },
            cityChange(newVal, oldVal){
                this.baseCityChange(newVal, oldVal);
                this.checkLevel(CITY_LEVEL);
            },
            areaChange(newVal, oldVal){
                this.baseAreaChange(newVal, oldVal);
                this.checkLevel(AREA_LEVEL);
            },
            townChange(newVal, oldVal){
                this.baseTownChange(newVal, oldVal);
                this.checkLevel(TOWN_LEVEL);
            },
            checkLevel(level){
                if(this.operLevel === -1 || this.operLevel !== level) return;
                let close = false;
                switch(this.operLevel){
                    case PROVINCE_LEVEL:
                        if(!this.city) close = true;
                        break;
                    case CITY_LEVEL:
                        if(!this.area) close = true;
                        break;
                    case AREA_LEVEL:
                        if(!this.town || (this.town && !this.haveTown)) close = true;
                        break;
                    case TOWN_LEVEL:
                        close = true;
                        break;
                }
                if(close) {
                    this.operLevel = -1;
                    this.close();
                }
            },
            clear(){
                this.dProvince = null;
            }
        }
    }
</script>
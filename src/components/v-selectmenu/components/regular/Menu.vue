<template>
    <div v-if="data && data.length" class="sm-result-area">
        <ul :class="[baseClass, 'sm-menu-root', {fadeInLeft}]"
            v-show="currentMenu === 'root'" >
            <!-- regular menu items -->
            <v-menu-item :data="menu" is="v-menu-item" :key="'root-'+index"
                         @click.native="switchSub(menu)"
                         v-for="(menu,index) in data"></v-menu-item>
        </ul>
        <!--<transition-group tag="span" name="vivify" enter-class="fadeInLeft" leave-class="fadeInRight">-->
        <ul :class="[baseClass, 'sm-sub-menu', subMenuSlide]"
            :key="'sub-menu-'+index"
            v-show="currentMenu === sub.mKey"
            v-for="(sub,index) in subMenus">
            <li class="sm-sub-header">
                <button type="button" class="sm-sub-back" @click="switchSub(sub, true)">
                    <i class="sm-iconfont icon-back"></i>
                </button>
                <p v-html="sub.content"></p>
            </li>
            <li class="sm-divider"></li>
            <v-menu-item :data="item" is="v-menu-item"
                         :key="'item'+index+idx"
                         @click.native="switchSub(item)"
                         v-for="(item,idx) in sub.menus"></v-menu-item>
        </ul>
        <!--</transition-group>-->
    </div>
</template>

<script>
    import '../../animated.scss';
    import mItem from './Item';
    export default {
        name: "v-regular-menu",
        components: {
            'v-menu-item': mItem
        },
        props: {
            data:{
                type: Array,
                required: true
            },
            show: {
                type: Boolean,
                required: true
            }
        },
        inject: ['parentInst'],
        data(){
            return {
                subMenus: [],
                currentMenu: 'root',

                fadeInLeft: false,
                fadeInRight: true,
                subMenuSlide: {
                    fadeInLeft: false,
                    fadeInRight: true
                },
                baseClass: 'sm-results sm-regular vivify'
            };
        },
        watch:{
            show(val){
                this.$nextTick(()=>{
                    if(!val) {
                        this.currentMenu = 'root';
                        this.fadeInLeft = false;
                    }
                })
            },
            data(){
                this.getSubs();
            }
        },
        methods: {
            pushMenu(menu, parent, index){
                if(menu && menu.menus && menu.menus.length){
                    let prefix = 'menu-';
                    if(!parent) {
                        menu.mKey = prefix + index;
                        menu.pKey = 'root';
                    }else{
                        menu.mKey = parent.mKey + '-' + index;
                        menu.pKey = parent.mKey;
                    }
                    this.subMenus.push(menu);
                    for(let i=0;i < menu.menus.length; i++){
                        if(menu.menus[i] && menu.menus[i].menus) this.pushMenu(menu.menus[i], menu, i);
                    }
                }
            },
            getSubs(){
                if(this.data && this.data.length){
                    this.subMenus = [];
                    let list = this.data.concat();
                    for(let i=0;i < list.length; i++){
                        this.pushMenu(list[i], null, i);
                    }
                }
            },
            switchSub(row, parent){
                if(row && Object.keys(row).length){
                    if(!parent){
                        if(row.mKey) this.currentMenu = row.mKey;
                        if(row.menus){
                            this.subMenuSlide.fadeInLeft = false;
                            this.subMenuSlide.fadeInRight = true;
                        }
                    }else{
                        if(row.pKey) this.currentMenu = row.pKey;
                        if(row.pKey === 'root') this.fadeInLeft = true;
                        else {
                            this.subMenuSlide.fadeInLeft = true;
                            this.subMenuSlide.fadeInRight = false;
                        }
                    }
                    if(!row.disabled && !row.menus) this.$emit('close');
                }

            }
        },
        mounted(){
            this.getSubs();
        }
    }
</script>
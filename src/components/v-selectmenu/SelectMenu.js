import './styles/selectmenu.scss';

import render from './mixins/render';
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
    mixins: [render, data, props, methods, util],
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

        // console.log(this.$slots)
        // console.log(typeof this.$scopedSlots.row)
    },
    destroyed(){
        this.$off('clear', this.clear);
    }
}
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
        this.populate();
    }
}
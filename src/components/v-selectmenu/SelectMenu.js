import './styles/selectmenu.scss';

import render from './mixins/render';
import data from './mixins/data';
import props from './mixins/props';
import methods from './mixins/methods';
import util from './mixins/util';

import drop from 'v-dropdown';

export default {
    name: "v-selectmenu",
    components: {
        'regular': () => import('./components/regular/Menu'),
        'advanced': () => import('./components/advanced/List'),
        'dropdown': drop
    },
    mixins: [render, data, props, methods, util],
    mounted(){
        this.populate();
    }
}
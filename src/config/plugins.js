import Vue from 'vue';


import vDialog from '@/components/v-dialogs';
import vPage from '@/components/v-page';
import vTableGrid from '@/components/v-tablegrid';
import vUploader from '@/components/v-uploader';
import vRegion from '@/components/v-region';
import vSelectMenu from '@/components/v-selectmenu';
import vSelectPage from '@/components/v-selectpage';
//import vTree from '@/components/v-tree';
import vGallery from '@/components/v-gallery';
import vSuggest from '@/components/v-suggest';
import vPlayback from '@/components/v-playback';
//import vDropDown from '@/components/v-dropdown';

import http from '@/utils/http/index';

import * as hooks from './hooks';


Vue.use(vDialog);
Vue.use(vTableGrid, hooks.gridConfig);
Vue.use(vPage);
Vue.use(vUploader, hooks.uploaderConfig);
Vue.use(vRegion);
Vue.use(vSelectMenu);
Vue.use(vSelectPage, {
    dataLoad: hooks.gridConfig.dataLoad,
    language: 'en'
});
//Vue.use(vTree);
Vue.use(vGallery);
Vue.use(vSuggest);
Vue.use(vPlayback);
//Vue.component(vDropDown.name, vDropDown);
//Vue.use(vDropDown);

Vue.use(http);
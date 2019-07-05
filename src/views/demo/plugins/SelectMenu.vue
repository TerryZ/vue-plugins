<template>
    <div class="card p-5">
        <h3 class="mb-5">v-selectmenu
            <button type="button" class="btn btn-outline-secondary btn-sm" @click="$router.push({path: '/demo'});">Back to List</button>
        </h3>

        <h5>常规模式菜单</h5>
        <p>
            <v-selectmenu :data="menu"
                          :regular="true"
                          @show="showLog"
                          @hide="hideLog" ></v-selectmenu>
        </p>
        <br>

        <h5>常规菜单多分组模式</h5>
        <p>
            <v-selectmenu :data="groupMenu" :regular="true" ></v-selectmenu>
        </p>
        <br>

        <h5>常规模式多级菜单</h5>
        <p>
            <v-selectmenu :data="multiLevel" :regular="true" >
                <button type="button" class="btn btn-primary">SelectMenu</button>
            </v-selectmenu>
        </p>
        <br>

        <h5>菜单对齐方向</h5>
        <div class="row">
            <div class="col-md-3">
                <v-selectmenu :data="menu" :regular="true" align="left" >
                    <button type="button" class="btn btn-secondary">Align left</button>
                </v-selectmenu>
            </div>
            <div class="col-md-3">
                <v-selectmenu :data="menu" :regular="true" align="center" >
                    <button type="button" class="btn btn-secondary">Align center</button>
                </v-selectmenu>
            </div>
            <div class="col-md-3">
                <v-selectmenu :data="menu" :regular="true" align="right" >
                    <button type="button" class="btn btn-secondary">Align right</button>
                </v-selectmenu>
            </div>
        </div>
        <br>

        <h5>鼠标右键呼出菜单</h5>
        <v-selectmenu :data="menu" :regular="true" :right-click="true" >
            <div class="jumbotron text-center" style="margin: 0;width: 1000px;">
                <h1><i class="fa fa-fw fa-mouse-pointer"></i> mouse right click to call</h1>
            </div>
        </v-selectmenu>
        <br><br>

        <!--
        <h5>鼠标移动呼出菜单</h5>
        <v-selectmenu :data="menu" :regular="true" :move="true" >
            <div class="jumbotron text-center" style="margin: 0;width: 1000px;">
                <h1><i class="fa fa-fw fa-arrows"></i> mouse move to call</h1>
            </div>
        </v-selectmenu>
        <br><br>
        -->

        <h5>高级模式菜单</h5>
        <pre class="p-4 bg-light">{{JSON.stringify(value1, null, 4)}}</pre>
        <p>
            <v-selectmenu :data="listData" key-field="id" :title="false" v-model="value1">
            </v-selectmenu>
        </p>
        <br>

        <h5>高级多分组多选模式菜单</h5>
        <pre class="p-4 bg-light">{{JSON.stringify(value2, null, 4)}}</pre>
        <p>
            <v-selectmenu :data="groupData"
                          :max-selected="3"
                          :multiple="true"
                          key-field="id"
                          v-model="value2" >
            </v-selectmenu>
        </p>
        <br>

        <h5>嵌入式菜单</h5>
        <p>
            <v-selectmenu :data="menu" :regular="true" :embed="true" >
                <button type="button" class="btn btn-default">SelectMenu</button>
            </v-selectmenu>
        </p>
        <br>
    </div>
</template>

<script>
	import nbaTeams from '@test/sample/nba-teams';
    export default {
        methods: {
            doSome(){
                this.$dlg.alert('you can do anything in callback!');
            },
            showLog(){
                console.log('show')
            },
            hideLog(){
                console.log('hide')
            }
        },
        data(){
            return {
                value1: '7',
                value2: '3,5,17',
                groupData: [{
                    title : 'East',
                    list :[
                        {id:1 ,name:'Chicago Bulls',desc:'芝加哥公牛',abbr:'CHI'},
                        {id:2 ,name:'Cleveland Cavaliers',desc:'克里夫兰骑士',abbr:'CLE'},
                        {id:3 ,name:'Detroit Pistons',desc:'底特律活塞',abbr:'DET'},
                        {id:4 ,name:'Indiana Pacers',desc:'印第安纳步行者',abbr:'IND'},
                        {id:5 ,name:'Milwaukee Bucks',desc:'密尔沃基雄鹿',abbr:'MIL'},
                        {id:6 ,name:'Brooklyn Nets',desc:'布鲁克林篮网',abbr:'BKN'},
                        {id:7 ,name:'Boston Celtics',desc:'波士顿凯尔特人',abbr:'BOS'},
                        {id:8 ,name:'New York Knicks',desc:'纽约尼克斯',abbr:'NYK'},
                        {id:9 ,name:'Philadelphia 76ers',desc:'费城76人',abbr:'PHI'},
                        {id:10,name:'Toronto Raptors',desc:'多伦多猛龙',abbr:'TOR'},
                        {id:11,name:'Atlanta Hawks',desc:'亚特兰大老鹰',abbr:'ATL'},
                        {id:12,name:'Charlotte Hornets',desc:'夏洛特黄蜂',abbr:'CHA'},
                        {id:13,name:'Miami Heat',desc:'迈阿密热火',abbr:'MIA'},
                        {id:14,name:'Orlando Magic',desc:'奥兰多魔术',abbr:'ORL'},
                        {id:15,name:'Washington Wizards',desc:'华盛顿奇才',abbr:'WAS'}
                    ]
                },{
                    title : 'West',
                    list : [
                        {id:16,name:'Denver Nuggets',desc:'丹佛掘金',abbr:'DEN'},
                        {id:17,name:'Minnesota Timberwolves',desc:'明尼苏达森林狼',abbr:'MIN'},
                        {id:18,name:'Oklahoma City Thunder',desc:'俄克拉荷马雷霆',abbr:'OKC'},
                        {id:19,name:'Portland Trail Blazers',desc:'波特兰开拓者',abbr:'POR'},
                        {id:20,name:'Utah Jazz',desc:'犹他爵士',abbr:'UTA'},
                        {id:21,name:'Golden State Warriors',desc:'金州勇士',abbr:'GSW'},
                        {id:22,name:'Los Angeles Clippers',desc:'洛杉矶快船',abbr:'LAC'},
                        {id:23,name:'Los Angeles Lakers',desc:'洛杉矶湖人',abbr:'LAL'},
                        {id:24,name:'Phoenix Suns',desc:'菲尼克斯太阳',abbr:'PHX'},
                        {id:25,name:'Sacramento Kings',desc:'萨克拉门托国王',abbr:'SAC'},
                        {id:26,name:'Dallas Mavericks',desc:'达拉斯小牛',abbr:'DAL'},
                        {id:27,name:'Houston Rockets',desc:'休斯顿火箭',abbr:'HOU'},
                        {id:28,name:'Memphis Grizzlies',desc:'孟菲斯灰熊',abbr:'MEM'},
                        {id:29,name:'New Orleans Pelicans',desc:'新奥尔良鹈鹕',abbr:'NOP'},
                        {id:30,name:'San Antonio Spurs',desc:'圣安东尼奥马刺',abbr:'SAS'}
                    ]}
                ],
                listData: nbaTeams,
                menu: [
                    {content:'163 NetEase',url : 'http://www.163.com'},
                    {content:'Sina',url : 'http://www.sina.com'},
                    {content:'sm_divider'},
                    {content:'<i class="fa fa-fw fa-github"></i> GitHub',url : 'https://github.com'},
                    {content:'<i class="fa fa-fw fa-reddit"></i> Reddit',url : 'https://www.reddit.com'},
                    {content:'<i class="fa fa-fw fa-facebook"></i> Facebook',url : 'https://www.facebook.com',disabled : true},
                    {content:'<i class="fa fa-fw fa-twitter"></i> Twitter',url : 'https://twitter.com',disabled : true},
                    {content:'sm_divider'},
                    {content:'Click this menu item to trigger your callback',callback : this.doSome}
                ],
                headerMenu: [
                    {content:'News Site',header: true},
                    {content:'163 NetEase',url : 'http://www.163.com'},
                    {content:'Sina',url : 'http://www.sina.com'},
                    {content:'sm_divider'},
                    {content:'Technology Site',header: true},
                    {content:'<i class="fa fa-fw fa-github"></i> GitHub',url : 'https://github.com'},
                    {content:'<i class="fa fa-fw fa-reddit"></i> Reddit',url : 'https://www.reddit.com'},
                    {content:'<i class="fa fa-fw fa-facebook"></i> Facebook',url : 'https://www.facebook.com',disabled : true},
                    {content:'<i class="fa fa-fw fa-twitter"></i> Twitter',url : 'https://twitter.com',disabled : true},
                    {content:'sm_divider'},
                    {content:'Actions',header: true},
                    {content:'Click this menu item to trigger your callback',callback : function(){
                            //bDialog.alert('you can do anything in callback!');
                        }}
                ],
                multiLevel : [
                    {content:'Sports',menus: [
                        {content:'Fivb',url : 'http://www.fivb.com/'},
                        {content:'Fifa',url : 'http://www.fifa.com/'},
                        {content:'NBA',menus: [
                            {content:'NBA official site',url : 'http://www.nba.com'},
                            {content:'Chicago Bulls',url : 'http://www.nba.com/bulls/'},
                            {content:'Los Angeles Lakers',url : 'www.nba.com/lakers/'}
                        ]}
                    ]},
                    {content:'sm_divider'},
                    {content:'News',menus: [
                        {content:'BBC',url : 'http://www.bbc.com/news'},
                        {content:'CNN',url : 'http://www.cnn.com'},
                        {content:'Xinhua',url : 'http://www.xinhuanet.com'}
                    ]},
                    {content:'Technology',menus: [
                        {content:'Github',url : 'https://github.com'},
                        {content:'StackOverflow',url : 'https://stackoverflow.com/'},
                        {content:'Reddit',url : 'https://www.reddit.com'}
                    ]},
                    {content:'Social',menus: [
                        {content:'Facebook',url : 'https://www.facebook.com'},
                        {content:'Twitter',url : 'https://twitter.com'}
                    ]}
                ],
                groupMenu: [
                    {
                        title: 'Sports',
                        list: [
                            {content:'Fivb',url : 'http://www.fivb.com/'},
                            {content:'Fifa',url : 'http://www.fifa.com/'},
                            {content:'sm_divider'},
                            {content:'NBA official site',url : 'http://www.nba.com'},
                            {content:'Chicago Bulls',url : 'http://www.nba.com/bulls/'},
                            {content:'Los Angeles Lakers',url : 'www.nba.com/lakers/'}
                        ]
                    }, {
                        title: 'News',
                        list: [
                            {content:'BBC',url : 'http://www.bbc.com/news'},
                            {content:'CNN',url : 'http://www.cnn.com'},
                            {content:'sm_divider'},
                            {content:'Xinhua',url : 'http://www.xinhuanet.com'}
                        ]
                    }, {
                        title: 'Technology',
                        list: [
                            {content:'Github',url : 'https://github.com'},
                            {content:'StackOverflow',url : 'https://stackoverflow.com/'},
                            {content:'sm_divider'},
                            {content:'Reddit',url : 'https://www.reddit.com'}
                        ]
                    }, {
                        title: 'Social',
                        list: [
                            {content:'Facebook',url : 'https://www.facebook.com'},
                            {content:'Twitter',url : 'https://twitter.com'}
                        ]
                    }

                ]
            };
        }
    }
</script>

<style scoped>

</style>
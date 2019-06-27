<template>
    <div class="card p-5">
        <div class="panel-body">
            <h3 class="mb-5">
                v-selectpage
                <button type="button" class="btn btn-outline-dark btn-sm" @click="$router.push({path: '/demo'});">Back to List</button>
            </h3>
            <div >
                <h5>单选模式</h5>
                <pre class="bg-light p-3">{{JSON.stringify(value1, null, 4)}}</pre>
                <p>
                    <v-selectpage :data="sample"
                                  sort="id desc"
                                  v-model="value1">
                    </v-selectpage>
                </p>

                <h5>自定义内容渲染
                    <button type="button" class="btn btn-danger btn-sm mr-2" @click="disabled=true">禁用插件</button>
                    <button type="button" class="btn btn-outline-dark btn-sm" @click="disabled=false">启用插件</button>
                </h5>
                <p>
                    <v-selectpage :data="sample"
                                  key-field="id"
                                  language="en"
                                  :disabled="disabled"
                                  :show-field="renderRow" ref="selectpage2">
                    </v-selectpage>
                </p>

                <h5>单选无分页栏</h5>
                <p>
                    <v-selectpage :data="sample"
                                  :pagination="false" ></v-selectpage>
                </p>

                <h5>动态修改选中值
                    <button type="button" class="btn btn-outline-dark btn-sm" @click="selected='22'">修改选中项目</button>
                </h5>
                <p>
                    <v-selectpage :data="sample"
                                  @values="values2"
                                  v-model="selected" ></v-selectpage>
                </p>

                <h5>多选模式，限制最多选择 3 个
                    <button type="button" class="btn btn-default btn-xs" @click="tmpData=sample1.concat()">修改数据源</button>
                </h5>
                <pre class="bg-light p-3" >{{JSON.stringify(value3, null, 4)}}</pre>
                <pre class="bg-light p-3" >{{JSON.stringify(value31, null, 4)}}</pre>
                <p>
                    <v-selectpage :data="tmpData"
                                  :multiple="true"
                                  :max-select-limit="3"
                                  v-model="value3"
                                  key-field="id"
                                  @values="values3"
                                  show-field="name">
                    </v-selectpage>
                </p>

                <h5>表格模式 - 单选（设置宽度）</h5>
                <p>
                    <v-selectpage :data="sample1"
                                  key-field="id"
                                  sort="id asc"
                                  @values="values4"
                                  show-field="name"
                                  :width="600"
                                  :tb-columns="showFields">
                    </v-selectpage>
                </p>

                <h5>表格模式 - 多选</h5>
                <p>
                    <v-selectpage :data="sample"
                                  :multiple="true"
                                  key-field="id"
                                  sort="id asc"
                                  @values="values5"
                                  show-field="name"
                                  :tb-columns="showFields">
                    </v-selectpage>
                </p>



                <h5>服务端数据模式</h5>
                <p>
                    <v-selectpage data="/user/list"
                                  key-field="id"
                                  show-field="name"
                                  v-model="server"
                                  :result-format="resultFormat">
                    </v-selectpage>
                </p>

                <h5>文字右排模式</h5>
                <p>
                    <v-selectpage :data="sample" sort="id desc" :rtl="true" ></v-selectpage>
                </p>
                <p>
                    <v-selectpage :rtl="true" :data="sample1" :width="600" :tb-columns="showFields">
                    </v-selectpage>
                </p>

                <p style="margin-bottom: 500px;"></p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            values1(data){
                this.value1 = data;
            },
            values2(data){
                this.value2 = data;
            },
            values3(data){
                this.value31 = data;
            },
            values4(data){
                this.value4 = data;
            },
            values5(data){
                this.value5 = data;
            },
            resultFormat(resp){
                if(resp && Object.keys(resp).length){
                    return resp;
                }
            }
        },
        data(){
            return {
                value1: '7',
                value2: null,
                value3: '3,5,7',
                value31: null,
                value4: null,
                value5: null,
                server: "1",
                selected: '7',
                disabled: false,
                renderRow(row){
                    let result = '';
                    if(row && Object.keys(row).length)
                        result = `[<b>${row.id<10?'0'+row.id:row.id}</b>] - ${row.name} (${row.desc})`;
                    return result;
                },
                showFields:[
                    {title: 'id',data: 'id'},
                    {title: 'name',data: 'name'},
                    {title: 'desc',data: 'desc'},
                ],
                tmpData: [],
                sample: [
                    {id:1 ,name:'Chicago Bulls',desc:'芝加哥公牛'},
                    {id:2 ,name:'Cleveland Cavaliers',desc:'克里夫兰骑士'},
                    {id:3 ,name:'Detroit Pistons',desc:'底特律活塞'},
                    {id:4 ,name:'Indiana Pacers',desc:'印第安纳步行者'},
                    {id:5 ,name:'Milwaukee Bucks',desc:'密尔沃基雄鹿'},
                    {id:6 ,name:'Brooklyn Nets',desc:'布鲁克林篮网'},
                    {id:7 ,name:'Boston Celtics',desc:'波士顿凯尔特人'},
                    {id:8 ,name:'New York Knicks',desc:'纽约尼克斯'},
                    {id:9 ,name:'Philadelphia 76ers',desc:'费城76人'},
                    {id:10,name:'Toronto Raptors',desc:'多伦多猛龙'},
                    {id:11,name:'Atlanta Hawks',desc:'亚特兰大老鹰'},
                    {id:12,name:'Charlotte Hornets',desc:'夏洛特黄蜂'},
                    {id:13,name:'Miami Heat',desc:'迈阿密热火'},
                    {id:14,name:'Orlando Magic',desc:'奥兰多魔术'},
                    {id:15,name:'Washington Wizards',desc:'华盛顿奇才'},
                    {id:16,name:'Denver Nuggets',desc:'丹佛掘金'},
                    {id:17,name:'Minnesota Timberwolves',desc:'明尼苏达森林狼'},
                    {id:18,name:'Oklahoma City Thunder',desc:'俄克拉荷马雷霆'},
                    {id:19,name:'Portland Trail Blazers',desc:'波特兰开拓者'},
                    {id:20,name:'Utah Jazz',desc:'犹他爵士'},
                    {id:21,name:'Golden State Warriors',desc:'金州勇士'},
                    {id:22,name:'Los Angeles Clippers',desc:'洛杉矶快船'},
                    {id:23,name:'Los Angeles Lakers',desc:'洛杉矶湖人'},
                    {id:24,name:'Phoenix Suns',desc:'菲尼克斯太阳'},
                    {id:25,name:'Sacramento Kings',desc:'萨克拉门托国王'},
                    {id:26,name:'Dallas Mavericks',desc:'达拉斯小牛'},
                    {id:27,name:'Houston Rockets',desc:'休斯顿火箭'},
                    {id:28,name:'Memphis Grizzlies',desc:'孟菲斯灰熊'},
                    {id:29,name:'New Orleans Pelicans',desc:'新奥尔良鹈鹕'},
                    {id:30,name:'San Antonio Spurs',desc:'圣安东尼奥马刺'}
                ],
                sample1: [
                    {id:1 ,name:'The People\'s Republic of China',desc:'中华人民共和国'},
                    {id:2 ,name:'United States of America',desc:'美利坚合众国'},
                    {id:3 ,name:'United Kingdom of Great Britain and Northern Ireland',desc:'大不列颠及北爱尔兰联合王国'},
                    {id:4 ,name:'Japan',desc:'日本'},
                    {id:5 ,name:'Russian Federation',desc:'俄罗斯联邦'},
                    {id:6 ,name:'The Federal Republic of Germany',desc:'德意志联邦共和国'},
                    {id:7 ,name:'French Republic',desc:'法兰西共和国'},
                    {id:8 ,name:'The Kingdom of Spain',desc:'西班牙王国'},
                    {id:9 ,name:'Republic of India',desc:'印度共和国'},
                    {id:10,name:'Repubblica Italiana',desc:'意大利共和国'},
                    {id:11,name:'Canada',desc:'加拿大'},
                    {id:12,name:'The Republic of Argentina',desc:'阿根廷共和国'},
                    {id:13,name:'The Kingdom of Sweden',desc:'瑞典王国'},
                    {id:14,name:'The Kingdom of Norway',desc:'挪威王国'},
                    {id:15,name:'The Czech Republic',desc:'捷克共和国'}
                ]
            };
        },
        mounted(){
            this.tmpData = this.sample.concat();
        }
    }
</script>

<style scoped>

</style>
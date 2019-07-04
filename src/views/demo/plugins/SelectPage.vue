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
                                  title="v-selectpage title"
                                  v-model="value1">
                    </v-selectpage>
                </p>

                <h5>自定义内容渲染</h5>
                <p>
                    <button type="button" class="btn btn-danger btn-sm mr-2" @click="disabled=true">禁用插件</button>
                    <button type="button" class="btn btn-outline-dark btn-sm" @click="disabled=false">启用插件</button>
                </p>
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
                    <button type="button" class="btn btn-outline-dark btn-sm" @click="tmpData=sample1.concat()">修改数据源</button>
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
    import nbaTeams from '@test/sample/nba-teams';
    import countries from '@test/sample/countries';
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
                selected: '6',
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
                sample: nbaTeams,
                sample1: countries
            };
        },
        mounted(){
            this.tmpData = this.sample.concat();
        }
    }
</script>

<style scoped>

</style>
<template>
    <div>
        <div class="panel panel-default">
            <form class="form-horizontal">
                <div class="panel-body">
                    <div class="form-group col-md-4">
                        <label for="userName" class="col-md-3 control-label">用户名</label>
                        <div class="col-md-9">
                            <input type="text" id="userName" v-model="userName" class="form-control">
                        </div>
                    </div>
                    <div class="form-group col-md-4">
                        <label for="bb" class="col-md-3 control-label">性别</label>
                        <div class="col-md-9">
                            <select class="form-control" id="bb" readonly>
                                <option value="s.key" v-for="(s, index) in sex" :key="index">{{s.value}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-md-4">
                        <label for="cc" class="col-md-3 control-label">日期</label>
                        <div class="col-md-9">
                            <datetime id="cc" class="form-control" v-model="dTime"></datetime>
                        </div>
                    </div>



                    <div class="col-md-12">
                        <button type="button" @click="getSelected" class="btn btn-default">Show Selected</button>
                        <div class="pull-right">
                            <button type="button" class="btn btn-inverse" @click="$router.push({path: '/demo'});">Back to List</button>
                            <button type="button" @click="search" class="btn btn-primary"><i class="fa fa-search"></i> 查询</button>
                            <button type="button" @click="reload('grid')" class="btn btn-default"><i class="fa fa-refresh"></i> Reload</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>

        <v-tablegrid @selected="picked"
                     :check-row="'single'"
                     :sorting="true"
                     data="/user/loadUserListDatatable"
                     :columns="columns"
                     :border="false"
                     :stripe="false"
                     :params="params"
                     theme="material"
                     ref="grid"></v-tablegrid>

        <h5>自定义列内容</h5>
        <p>
            <button type="button" class="btn btn-default" @click="reload('customColumn')">加载数据</button>
        </p>
        <v-tablegrid data="/user/loadUserListDatatable"
                     :columns="columnsCustom"
                     :autoload="false"
                     theme="material"
                     ref="customColumn">
            <template slot-scope="props">
                <td v-text="props.row.login_name"></td>
                <td v-text="props.row.name"></td>
                <td v-text="props.row.sexName"></td>
                <td v-text="props.row.birthday"></td>
                <td v-text="props.row.phone1"></td>
                <td v-text="props.row.email"></td>
                <td v-text="props.row.statusName"></td>
                <td v-text="props.row.update_time"></td>
                <td>
                    <button type="button" class="btn btn-primary btn-xs" @click.stop="showInfo(props.row)">添加</button>
                </td>
            </template>
        </v-tablegrid>
    </div>
</template>

<script>
    export default {
        name: "User",
        data(){
            return {
                userName: '',
                selected: [],
                dTime: '2018-04-20',
                sex: [{key:0,value:'男'},{key:1,value:'女'}],
				columns: [
					{ "data": "login_name", "title":"登录名"},
					{ "data": "name", "title":"姓名", "align": "right"},
					{ "data": "sexName", "title":"性别"},
					{ "data": "birthday", "title":"出生年月"},
					{ "data": "phone1", "title":"电话"},
					{ "data": "email", "title":"电子邮箱"},
					{ "data": "statusName", "title":"状态"},
					{ "data": "update_time", "title":"更新时间","width":90}
				],
				columnsCustom: [
					{ "data": "login_name", "title":"登录名"},
					{ "data": "name", "title":"姓名"},
					{ "data": "sexName", "title":"性别"},
					{ "data": "birthday", "title":"出生年月"},
					{ "data": "phone1", "title":"电话"},
					{ "data": "email", "title":"电子邮箱"},
					{ "data": "statusName", "title":"状态"},
					{ "data": "update_time", "title":"更新时间"},
					{ "data": "tg-solted", "title":"操作"}
				],
				params:{
					userName: ''
				}
            }
        },
        methods:{
            search(){
                this.params.userName = this.userName;
                this.$refs.grid.$emit('search');
            },
            reload(name){
                this.$refs[name].$emit('reload');
            },
            showInfo(row){
                this.$dlg.alert(row.name);
            },
            picked(list){
                console.log(JSON.stringify(list))
                this.selected = list;
            },
            getSelected(){
                if(this.selected.length) this.$dlg.alert(`You selected ${this.selected[0].name} item.`);
                else this.$dlg.alert('请至少选择一个项目！', null, { messageType: 'warning' });
            }
        }
    }
</script>
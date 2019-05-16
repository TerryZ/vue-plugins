<template>
    <div class="panel panel-default">
        <div class="panel-body">
            <h3>Form <button type="button" class="btn btn-inverse btn-xs" @click="$router.push({path: '/demo'});">Back to List</button></h3>
            <div class="block">
                <form class="form-horizontal">
                    <!--<div :class="{'form-group':true, 'col-md-4':true, 'has-error':errors.has('姓名')}">
                        <label class="col-md-3 control-label">姓名</label>
                        <div class="col-md-9">
                            <input v-validate="{required:true}" type="text" class="form-control" name="姓名" placeholder="姓名">
                            <span class="help-block">{{ errors.first('姓名') }}</span>
                        </div>
                    </div>-->
                    <input-el class="form-group col-md-4" title="姓名" :input-errors="errors">
                        <input v-validate="{required:true}" type="text" class="form-control" name="姓名" >
                    </input-el>

                    <input-el class="form-group col-md-4" title="手机" :input-errors="errors">
                        <input v-validate="{mobile_phone:true}" type="text" class="form-control" name="手机">
                    </input-el>

                    <input-el class="form-group col-md-4" title="身份证" :input-errors="errors">
                        <input v-validate="{id_card:true,max:18}" type="text" class="form-control" name="身份证" placeholder="15或18位身份证">
                    </input-el>

                    <input-el class="form-group col-md-4" title="性别" :input-errors="errors">
                        <select v-validate="{required:true}" class="form-control" name="性别" >
                            <option value="">请选择</option>
                            <option value="0">男</option>
                            <option value="1">女</option>
                        </select>
                    </input-el>

                    <!-- 完整输入元素结构，适用于部分需要自定义结构处理的内容 -->
                    <div :class="{'form-group':true, 'col-md-4':true, 'has-error':errors.has('邮箱')}">
                        <label class="col-md-3 control-label">邮箱</label>
                        <div class="col-md-9">
                            <input v-validate="{email:true}" type="text" name="邮箱" class="form-control">
                            <span class="help-block">{{errors.first('邮箱')}}</span>
                        </div>
                    </div>

                    <input-el class="form-group col-md-4" title="日期" :input-errors="errors">
                        <datetime v-validate="{required:true}" name="日期" class="form-control" ></datetime>
                    </input-el>
                </form>
            </div>
            <div class="col-md-12">
                {{errors}}
            </div>
            <div class="col-md-12">
                自带校验规则列表：<a href="https://baianat.github.io/vee-validate/guide/rules.html" target="_blank">点击这里</a>
            </div>
            <div class="col-md-12">自定义校验规则：<code>/src/config/validate-custom.js</code></div>
        </div>
        <div class="panel-footer text-right">
            <button type="button" @click="save" class="btn btn-primary">Save</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Form",
        methods:{
            save(){
                this.$validator.validate().then(function(resp){
                    console.log(resp)
                    if(resp){
                        this.$vDialog.alert('保存成功！', null, {
                            messageType: 'success'
                        });
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>
<template>
    <div class="card p-5">
        <h3>v-region <button type="button" class="btn btn-inverse btn-xs" @click="$router.push({path: '/demo'});">Back to List</button></h3>
        <div class="alert alert-warning">
            北京、天津、上海、重庆等直辖市与省同级，若选择的省是直辖市，则下级行政级别为 <strong>区/县</strong>，不是 <strong>市</strong>，在数据处理上注意区分！
        </div>

        <h4>下拉选择器模式</h4>
        <p>
            <v-region :city="true" :area="true" :town="true" :ui="true" :selected="uiSelected" @values="uiValues">
            </v-region>
            <button type="button" class="btn btn-default" @click="changeUiSelected">reset region</button>
        </p>

        <br>

        <h4>下拉选择器模式（自定义呼出按钮）</h4>
        <p>
            <v-region :ui="true" >
                <button type="button" class="btn btn-primary">Select a option</button>
            </v-region>
        </p>

        <br>

        <h4>下拉选择器多列竖排模式</h4>
        <p>
            <v-region :city="true" :area="true" :town="true" :ui="true" :column="true" @values="uiValues" >
            </v-region>
        </p>

        <br>

        <h4>下拉选择器多列竖排模式（自定义呼出按钮）</h4>
        <p>
            <v-region :ui="true" :column="true">
                <button type="button" class="btn btn-primary">Select a option</button>
            </v-region>
        </p>

        <br>

        <h4>城市选择器</h4>
        <p>
            <v-region :ui="true" :city-picker="true" :selected="selectedArray" @values="uiValues"></v-region>
        </p>

        <br>

        <h4>纯文本模式 <small>初始化选中的项目，以纯文本的内容显示</small></h4>
        <p class="alert alert-info">
            <strong>当前选中地区：</strong>
            <v-region :town="true" :text="true" :selected="selected" ></v-region>
        </p>

        <br>

        <h4>省</h4>
        <v-region :city="false" :area="false" @values="values"></v-region>

        <h4>省、市</h4>
        <v-region :area="false" @values="values"></v-region>

        <h4>省、市、区/县</h4>
        <v-region @values="values"></v-region>

        <h4>省、市、区/县、乡/镇/街道</h4>
        <v-region :town="true" @values="values"></v-region>

        <h4>初始化值</h4>
        <p>
            <v-region :town="true" :selected="selected" @values="values"></v-region>
        </p>

        <h4>初始化值并禁用</h4>
        <p>
            <v-region :town="true" :selected="selected" :disabled="true"></v-region>
        </p>
        <br><br><br>

        <h5>由于组件特殊，不能使用常规的表单验证模式，需要使用表单验证样例中特殊处理的方式</h5>

        <div class="panel panel-default">
            <div class="panel-heading">
                表单校验
                <button type="button" class="btn btn-default btn-xs" @click="check">检查表单元素</button>
            </div>
            <div class="panel-body">
                <div :class="{'form-group':true, 'col-md-9':true, 'has-error':regionSet===false}">
                    <label class="col-md-3 control-label">区域</label>
                    <div class="col-md-9">
                        <v-region @values="validateValues"></v-region>
                        <span class="help-block" v-if="regionSet===false">请选择区域</span>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        data(){
            return {
                selected: {
                    province: null,
                    city: null,
                    area: null,
                    town: null
                },
                uiSelected: {
					province: '350000',
					city: '350100',
					area: '350104',
					town: '350104008'
                },
                selectedArray: ['110000', '350100'],
                regionSet: null,
                model: {
                    province: '',
                    city: '',
                    area: ''
                },
                btnText: '请选择'
            }
        },
        methods:{
            values(data){
                console.log(JSON.stringify(data));
            },
            validateValues(data){
                console.log(data)
                if(data){
                    this.model.province = data.province;
                    this.model.city = data.city;
                    this.model.area = data.area;
                }
            },
            check(){
                if(this.model.province && this.model.area){
                    this.$vDialog.alert('校验成功！',null,{ messageType: 'success'});
                }else{
                    this.regionSet = false;
                    this.$vDialog.alert('校验不通过',null,{ messageType: 'error'});
                }
            },
            uiValues(d){
                console.log(JSON.stringify(d));
                this.btnText = (!d.province&&!d.city&&!d.area&&!d.town)?'请选择':
                    `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim();
            },
            getValue(obj){
                return obj?obj.value:'';
            },
            changeUiSelected(){
                this.uiSelected = {
					province: '350000',
					city: '350100',
					area: '350104',
					town: '350104008'
                };
            }
        },
        watch: {
            model:{
                handler(val){
                    this.regionSet = (!this.model.province && !this.model.area)?false:true;
                },
                deep: true
            }
        },
        mounted(){
            setTimeout(()=>{
                this.selected = {
                    province: '350000',
                    city: '350100',
                    area: '350103',
                    town: '350103012'
                };
                //this.selectedArray = ['110000', '350100'];
            }, 1000);
        }
    }
</script>

<style scoped>

</style>
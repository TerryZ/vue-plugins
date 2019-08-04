<template>
    <div class="card p-5">
        <h3>v-page
            <button type="button" class="btn btn-outline-dark btn-sm" @click="$router.push({path: '/demo'});">Back to List</button>
        </h3>

        <hr>

        <h5>照片墙实例</h5>
        <div class="photo-wall clearfix">
            <div v-for="(num, index) in pageArr" :key="index" class="brick"> {{num}} </div>
        </div>
        <v-page align="center"
                :total-row="arr.length"
                @page-change="pagePhotoChange">
        </v-page>

        <h5 class="mt-5 mb-3">完整分页栏</h5>
        <v-page align="left" :total-row="101" v-model="current" ref="page"></v-page>

        <div class="row mt-2">
            <div class="col-md-1">
                <input type="text" class="form-control" v-model="target">
            </div>
            <button class="btn btn-primary mr-3" type="button" @click="go">跳转</button>
            <button class="btn btn-primary" type="button" @click="current=current+1">page + 1</button>
        </div>

        <h5 class="mt-5 mb-3">无页数选择列表</h5>
        <v-page :total-row="100" :page-size-menu="false" align="left"></v-page>

        <h5 class="mt-5 mb-3">无分页信息栏</h5>
        <v-page :page-size-menu="false" :info="false" align="left" :total-row="100"></v-page>

        <h5 class="mt-5 mb-3">无首页、尾页</h5>
        <v-page :page-size-menu="false"
                :info="false"
                :total-row="100"
                :first="false"
                :last="false"
                align="left"></v-page>

        <h5 class="mt-5 mb-3">无分页码</h5>
        <v-page :page-size-menu="false"
                :info="false"
                :total-row="100"
                :first="false"
                :last="false"
                :page-number="false"
                align="left"></v-page>

        <h5 class="mt-5 mb-3">禁用</h5>
        <v-page :total-row="100"  align="left" :disabled="disabled" ></v-page>
        <div>
            <div class="btn-group mt-2" role="group" aria-label="...">
                <button type="button" class="btn btn-outline-dark" :disabled="!disabled" @click="disabled=false">Enabled</button>
                <button type="button" class="btn btn-danger" :disabled="disabled" @click="disabled=true">Disabled</button>
            </div>
        </div>

        <h5 class="mt-5 mb-3">无边框</h5>
        <v-page :total-row="100"  align="left" :border="false" ></v-page>
    </div>
</template>

<script>
    export default {
        name: "Page",
        data(){
            return {
                arr: Array(108).fill(0).map((val, index) => index + 1),
                pageArr: [],
                disabled: false,
                target: 1,
                current: 3
            };
        },
        methods: {
            pagePhotoChange(pInfo){
                //console.log(pInfo);
                this.pageArr = [];
                let start=0, end=0;
                start = pInfo.pageSize * (pInfo.pageNumber-1);
                end = start + pInfo.pageSize - 1;
                this.pageArr = this.arr.filter((val,idx)=>idx>=start && idx<=end);
            },
            go(){
                this.$refs.page.goPage(Number(this.target));
            }
        }
    }
</script>

<style lang="scss" scoped>
    div.photo-wall {
        display: block;
        margin: 0 auto;
        width: 970px;
        div.brick {
            border: 1px solid #DDDDDD;
            border-radius: 2px;
            background-color: #F4F4F4;
            text-align: center;
            line-height: 100%;
            float: left;
            margin: 0 10px 10px 0;
            width: 180px;
            height: 130px;
            font-size: 60px;
            color: #BBBBBB;
            padding-top: 35px;
        }
    }
</style>
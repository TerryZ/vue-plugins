<template>
    <div class="card p-5">
        <h3>v-uploader <button type="button" class="btn btn-outline-secondary btn-sm" @click="$router.push({path: '/demo'});">Back to List</button></h3>
        <hr>
        <!--<div class="btn singleFileUpload" ref="upload"><i class="fa fa-fw fa-upload"></i> 文件上传</div>-->
        <h4 class="mt-3">单文件上传 <small>自定义预览区尺寸、自定义按钮文件、自定义是否显示按钮图标，自定义初始预览图片</small></h4>
        <v-uploader :preview-width="400"
                    :preview-height="300"
                    button-text="请选择您的文件"
                    :button-icon="false"
                    preview-img="https://vuejs.bootcss.com/images/logo.png"
                    @done="uploadDone" ></v-uploader>

        <h4 class="mt-3">单文件无预览上传 <small>结合图片预览插件功能，控制上传数量</small></h4>
        <div class="preview-box">
            <a href="javascript:void(0);" v-if="list.length === 0">
                <div class="bgbox">
                    <img src="../../../assets/logo.png" alt="">
                </div>
            </a>
            <v-gallery v-if="list.length">
                <a href="javascript:void(0);" :data-image="img.url" :title="img.title"
                    :key="index" v-for="(img,index) in list">
                    <div class="bgbox">
                        <img :src="img.url">
                    </div>
                    <div @click.stop="deleteFile(index)">删除</div>
                </a>
            </v-gallery>
        </div>
        <v-uploader :preview="false"
                    :before-upload="beforeUpload"
                    fileTypeExts="jpeg,jpg,gif,png,mp4"
                    @done="customUpload" ></v-uploader>

        <h4 class="mt-3">批量上传 <small>限制文件上传数量</small></h4>
        <v-uploader :multiple="true" :item-limit="2" @done="uploadDone" ></v-uploader>
    </div>
</template>

<script>
    export default {
        name: "Upload",
        data(){
            return {
                list: []
            };
        },
        methods: {
            uploadDone(files){
                console.log(files);
            },
            customUpload(files){
                if(files && files.length) this.list.push(files[0]);
            },
            deleteFile(idx){
                this.list.splice(idx, 1);
            },
            beforeUpload(id, name){
                return new Promise((resolve, reject) => {
                    if(this.list.length >= 2){
						this.$dlg.alert('只允许上传 2 张图片！',()=>{
                            reject(false);
                        });
                    }else resolve(true);
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    div.preview-box {
        display: block;
        a{
            border: 1px solid #F0F0F0;
            margin: 0 15px 10px 0;
            padding: 5px;
            box-shadow: 0 1px 8px rgba(0, 0, 0, 0.1);
            display: inline-block;
            div.bgbox{
                display: table-cell;
                vertical-align: middle;
                height: 128px;
                img {
                    width: 128px;
                    vertical-align: middle;
                }
            }
        }
    }
</style>
<template>
    <div class="card p-5">
        <h3>v-gallery <button type="button" class="btn btn-outline-secondary btn-sm" @click="$router.push({path: '/demo'});">Back to List</button></h3>

        <hr>

        <h5>图片全屏查看模式</h5>
        <v-gallery :images="list" class="image-box">
            <a href="javascript:void(0);"
                :data-image="img.url"
                :title="img.title"
                v-for="(img, index) in list" :key="index" >
                <div class="bgbox">
                    <img :src="img.url">
                </div>
                <div class="img-title" v-html="img.title"></div>
            </a>
        </v-gallery>
        <br><br>

        <h5>内置画廊模式</h5>
        <p>
            <v-gallery :images="list" :caption="true" @showed="showed" ></v-gallery>
        </p>
        <br><br>

        <h5>内置画廊模式黑暗主题</h5>
        <p>
            <v-gallery :images="list" :dark="true" :caption="true" ></v-gallery>
        </p>
        <br><br>

        <h5>跑马灯模式</h5>
        <p>
            <v-gallery type="carousel" :images="list" :control-pause="true" ></v-gallery>
        </p>
    </div>
</template>

<script>
    export default {
        name: "Gallery",
        data(){
            return {
                images: [],
                list: []
            }
        },
        methods: {
            showed(idx){
                console.log(idx);
            }
        },
        mounted(){
            setTimeout(()=>{
                this.images = [
          {url: 'https://www.baidu.com/img/bd_logo1.png?where=super', title:'百度'},
          {url: 'http://i1.sinaimg.cn/dy/deco/2013/0329/logo/LOGO_1x.png', title:'新浪'},
          {url: 'http://mat1.gtimg.com/www/qq2018/imgs/qq_logo_2018x2.png', title:'腾讯'}
        ];
                this.list = [
          {url: require('../../../assets/gallery/1.jpg'), title:'image1'},
          {url: require('../../../assets/gallery/2.jpg'), title:'image2'},
          {url: require('../../../assets/gallery/3.jpg'), title:'image3'},
          {url: require('../../../assets/gallery/4.jpg'), title:'image4'},
          {url: require('../../../assets/gallery/5.jpg'), title:'image5'},
          {url: require('../../../assets/gallery/6.jpg'), title:'image6'},
          {url: require('../../../assets/gallery/7.jpg'), title:'image7'},
          {url: require('../../../assets/gallery/8.jpg'), title:'image8'},
          {url: require('../../../assets/gallery/9.jpg'), title:'image9'},
          {url: require('../../../assets/gallery/10.jpg'), title:'image10'}
        ];
            }, 1000);
        }
    }
</script>

<style lang="scss" scoped>
    .image-box{
        /*border: 1px solid #DDDDDD;*/
        /*padding: 5px;*/

        a {
            clear: both;
            display: inline-block;
            margin: 0 10px 10px 0;
            position: relative;
            text-align: center;
            .bgbox {
                background-color: #232323;
                height: 150px;
                display:table-cell;
                vertical-align:middle;
                padding: 4px;
                border-radius: 2px;
                img{
                    width: 200px;
                    display: block;
                }
            }
            .img-title {
                bottom: 5px;
                display: block;
                text-align: center;
                color: #999999;
                padding-top: 5px;
            }
            &:hover {
                .img-title { color: #232323; }
            }
        }
    }
</style>

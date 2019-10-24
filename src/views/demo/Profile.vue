<template>
    <div>

        <div class="box box-solid">
            <h4>Vuex content</h4>
            <p v-text="user && user.name"></p>

            <h4>Props content</h4>
            <p v-text="userName"></p>

            <h4>Other content</h4>
            <p>
                互联网科技与金融的结合变革了传统金融的经营思路，促使了金融行业的转型。如何利用科技进一步推动社会与经济的发展，成为了科技和金融领域需要共同思考的问题。11 日下午金融科技主论坛，不仅有蚂蚁金服发布在金融云、AI、风控、生物识别、开放平台等领域的最新进展以及技术突破，更有世界级别大咖：联合国粮农署副总干事 Mr. Daniel J. Gustafson 分享“科技如何消除贫困，推动农业发展”等。
                <!--<h3 class="box-title"><strong>asdfasf</strong> 的用户信息</h3>-->
            </p>

            <p v-for="(item, index) in list" :key="index">
                <input type="text" v-model="models[index]" class="form-control" :placeholder="item">
            </p>

            <p >
                <!-- <fa-icon icon="check"></fa-icon> -->
                <!-- <fa-icon icon="times"></fa-icon> -->
                <button type="button" class="btn btn-primary" @click="close" id="btn-modal-close"> close</button>
                <button type="button" class="btn btn-default" @click="save"> 保存</button>
            </p>
        </div>

    </div>
</template>

<script>
// import store from '../../store';
export default {
  name: 'UserProfile',
  props: {
    userName: String
  },
  data () {
    return {
      list: ['form input element1', 'form input element2', 'form input element3', 'form input element4'],
      models: Array(4).fill('')
    }
  },
  computed: {
    user () {
      return ''// this.$store.state.user
    }
  },
  methods: {
    save () {
      this.$dlg.alert('保存成功！', () => {
        this.$dlg.close({ name: 'abc' })
      }, {
        messageType: 'success'
      })
    },
    close () {
      this.$emit('close', { name: this.userName })
    }
  },
  mounted () {
    // console.log(store.state.user)
    // console.log(this.$store)
    /*
    let that = this;
    $(this.$refs.upload).eUploadBaseInit({
        callback : function(fileInfo){
            if(fileInfo){
                $(that.$refs.uploadImg).attr('src',fileInfo.url);
            }
        }
    });
    */
  }
}
</script>

<style scoped>
    .box {
        padding: 10px;
    }
</style>

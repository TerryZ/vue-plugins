<template>
    <div class="panel panel-default">
        <div class="panel-body">
            <h3>v-dialogs
                <button type="button"
                        class="btn btn-inverse btn-xs"
                        @click="$router.push({path: '/demo'});">Back to List</button>
            </h3>
            <br>
            <h5>Modal</h5>
            <p>
                <button type="button" class="btn btn-default" @click="callModal" id="btn-modal">Modal</button>
            </p>
            <br>

            <h5>Alert</h5>
            <p>
                <button type="button" class="btn btn-info" @click="callAlert('info')" id="btn-alert-info">Info</button>
                <button type="button" class="btn btn-warning" @click="callAlert('warning')" id="btn-alert-warning">Warning</button>
                <button type="button" class="btn btn-danger" @click="callAlert('error')" id="btn-alert-error">Error</button>
                <button type="button" class="btn btn-success" @click="callAlert('success')" id="btn-alert-success">Success</button>
                <button type="button" class="btn btn-inverse" @click="callAlert('confirm')" id="btn-alert-confirm">Confirm</button>
            </p>
            <br>

            <h5>Mask</h5>
            <p>
                <button type="button" class="btn btn-default" @click="callMask" id="btn-mask">Mask</button>
            </p>
            <br>

            <h5>Toast</h5>
            <p>
                <button type="button" class="btn btn-info" @click="callToast('info')" id="btn-toast-info">Info</button>
                <button type="button" class="btn btn-warning" @click="callToast('warning')" id="btn-toast-warning">Warning</button>
                <button type="button" class="btn btn-danger" @click="callToast('error')" id="btn-toast-error">Error</button>
                <button type="button" class="btn btn-success" @click="callToast('success')" id="btn-toast-success">Success</button>
            </p>
            <br>
        </div>
    </div>
</template>

<script>
    import profile from '../Profile';
    export default {
        name: "Dialog",
        methods: {
            callModal(){
                let that = this;
                this.$dlg.modal(profile, {
                    width: 500,
                    height: 620,
                    title: 'Modal of v-dialogs',
                    backdrop: true,
                    params: { userName: 'TerryZ' },
                    callback: function(data){
                        //console.log(data);
                        that.$dlg.alert(`Received user name: ${data.name}`);
                    }
                });
            },
            callAlert(type){
                //this.$dlg.alert('互联网科技与金融的结合变革了传统金融的经营思路，促使了金融行业的转型。如何利用科技进一步推动社会与经济的发展，成为了科技和金融领域需要共同思考的问题。11 日下午金融科技主论坛，不仅有蚂蚁金服发布在金融云、AI、风控、生物识别、开放平台等领域的最新进展以及技术突破，更有世界级别大咖：联合国粮农署副总干事 Mr. Daniel J. Gustafson 分享“科技如何消除贫困，推动农业发展”等。');
                let dlg = this.$dlg;
                let option = {
					language: 'cn',
					messageType: type
				};
                if(type === 'confirm'){
					option.cancelCallback = ()=>{
                        dlg.alert('You canceled the confirm Alert');
                    };
                }
                const key = dlg.alert('This is a Dialog plugin for <b>Vue2</b>, the name is <b>v-dialog</b>!',function(){
                    dlg.alert('You selected Ok!');
                }, option);
                console.log('Alert key:', key);
            },
            callMask(){
                let dlg = this.$dlg;
                let key = dlg.mask(null, function(){
                },{
                    //language: 'en',
                    closeTime: 0
                });
                console.log('mask dialog key:', key);
                setTimeout(function(){
                    dlg.close(key);
                },3000);
            },
            callToast(type){
                const options = {
                    messageType: type,
                    position: 'bottomRight'
                };
                if(type === 'info'){
                    options.closeTime = 3;
                    options.dialogCloseButton = false;
                }
                this.$dlg.toast('this is a Vue <b>v-dialog</b> Toast!', options);
            }
        },
        mounted(){
            //console.log(this)
            //console.log(this.$store.state.language)
        }
    }
</script>
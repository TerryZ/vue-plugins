<template>
    <div class="panel panel-default">
        <div class="panel-body">
            <h3>杂项 <button type="button" class="btn btn-inverse btn-xs" @click="$router.push({path: '/demo'});">Back to List</button></h3>
            <h5>数据提交按钮</h5>
            <p>
                <submit class="btn btn-primary" @click.native="submit" ref="sbb">
                    <i class="fa fa-fw fa-check"></i> submit form
                </submit>
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
            };
        },
        methods:{
            submit(){
                let that = this;
                setTimeout(()=>{
                    that.$refs.sbb.$emit('done');
                },2000);
                /*
                this.$http('/xx/save',model).then(function(resp){
                    //do your business
                    that.$refs.sbb.$emit('done');
                });
                */
            }
        }
    }
</script>

<style scoped>

</style>
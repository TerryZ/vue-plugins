<template>
    <div class="panel panel-default">
        <div class="panel-body">
            <h3>video <button type="button" class="btn btn-inverse btn-xs" @click="$router.push({path: '/demo'});">Back to List</button></h3>
            <div>
                <p style="width: 640px;">
                    <v-playback :url="url" language="en"></v-playback>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                url: ""
            };
        },
        mounted(){
            let that = this;
            //http://localhost/upload/dba465f878654148a8a9f0626d75c33e.mp4
            //let a = require(`../../../assets/video/movie.mp4`);
            //console.log(a)
            setTimeout(()=>{
                that.url = "http://localhost/upload/movie.mp4";
            }, 1000);
        }
    }
</script>

<style scoped>

</style>
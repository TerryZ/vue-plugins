<template>
  <div class="card p-5">
    <div class="">
      <h3>
        video <button
          type="button"
          class="btn btn-outline-secondary btn-ms"
          @click="$router.push({path: '/demo'});"
        >
          Back to List
        </button>
      </h3>
      <div>
        <p style="width: 640px;">
          <v-playback
            :url="url"
            language="en"
          />
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      url: ''
    }
  },
  mounted () {
    // http://localhost/upload/dba465f878654148a8a9f0626d75c33e.mp4
    // let a = require(`../../../assets/video/movie.mp4`);
    // console.log(a)
    setTimeout(() => {
      this.url = 'http://localhost/upload/movie.mp4'
    }, 1000)
  }
}
</script>

<style scoped>

</style>

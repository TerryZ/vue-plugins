<template>
  <section>
    <h3 class="mt-5">
      Mask
    </h3>
    <p>
      <button
        type="button"
        class="btn btn-secondary"
        @click="callMask"
        id="btn-mask"
      >
        Mask
      </button>
    </p>
  </section>
</template>

<script>
export default {
  methods: {
    callMask () {
      const dlg = this.$dlg
      const key = dlg.mask(null, function () {
      }, {
        // language: 'en',
        closeTime: 0
      })
      console.log('mask dialog key:', key)
      setTimeout(function () {
        dlg.close(key)
      }, 3000)
    }
  }
}
</script>

<template>
  <section>
    <h3 class="mt-2">
      Modal
    </h3>
    <div class="my-2">
      <strong>Vuex content:</strong>
      <span v-text="$store.state.user" />
    </div>
    <!-- <component :is="page"></component> -->
    <div>
      <button
        type="button"
        class="btn btn-secondary"
        @click="callModal()"
        id="btn-modal"
      >
        Modal
      </button>
    </div>
    <h5 class="mt-3">
      Header bar
    </h5>
    <div>
      <button
        type="button"
        class="btn btn-outline-dark me-2"
        @click="callModal(false)"
        id="btn-alert-info"
      >
        Close header bar
      </button>
      <button
        type="button"
        class="btn btn-outline-info"
        @click="callModal('Modal of v-dialogs')"
        id="btn-alert-info"
      >
        Custom content
      </button>
    </div>
  </section>
</template>

<script>
import profile from './Profile.vue'

export default {
  methods: {
    callModal (title) {
      const options = {
        width: 500,
        height: 620,
        title: title,
        customClass: 'aabbcc',
        backdrop: true,
        backdropClose: true,
        params: { name: 'Terry Zeng' },
        callback: data => {
          // console.log(data);
          this.$dlg.alert(`Received user name: ${data.name}`)
        }
      }
      if (typeof title !== 'undefined') options.title = title
      this.$dlg.modal(profile, options)
    }
  }
}
</script>

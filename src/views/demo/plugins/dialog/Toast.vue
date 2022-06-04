<template>
  <section>
    <h3 class="mt-5">
      Toast
    </h3>
    <div>
      <div
        class="btn-group"
        role="group"
      >
        <button
          type="button"
          class="btn btn-info"
          @click="callToast()"
          id="btn-toast-info"
        >
          Info
        </button>
        <button
          type="button"
          class="btn btn-warning"
          @click="callToast('warning')"
          id="btn-toast-warning"
        >
          Warning
        </button>
        <button
          type="button"
          class="btn btn-danger"
          @click="callToast('error')"
          id="btn-toast-error"
        >
          Error
        </button>
        <button
          type="button"
          class="btn btn-success"
          @click="callToast('success')"
          id="btn-toast-success"
        >
          Success
        </button>
      </div>
    </div>
    <h5 class="mt-3">
      No icon
    </h5>
    <div>
      <button
        type="button"
        class="btn btn-outline-info"
        @click="callToast('info', false)"
        id="btn-toast-info"
      >
        Info
      </button>
    </div>
  </section>
</template>

<script>
export default {
  methods: {
    callToast (type = 'info', icon = true, title) {
      const options = {
        messageType: type,
        icon: icon,
        position: 'topCenter'
      }
      if (typeof title !== 'undefined') options.titleBar = title
      if (type === 'info') {
        options.closeTime = 3
        options.dialogCloseButton = false
      }
      this.$dlg.toast('this is a Vue <b>v-dialog</b> Toast!', options)
    }
  }
}
</script>

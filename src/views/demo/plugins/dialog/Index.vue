<template>
  <div class="p-5">
    <h1>
      v-dialogs
      <button
        type="button"
        class="btn btn-outline-secondary btn-sm"
        @click="$router.push({path: '/demo'})"
      >
        Back to List
      </button>
    </h1>

    <hr>

    <dialog-model />
    <dialog-alert />
    <dialog-toast />
    <dialog-drawer />
    <dialog-mask />
  </div>
</template>

<script>
import DialogModel from './Model.vue'
import DialogAlert from './Alert.vue'
import DialogToast from './Toast.vue'
import DialogMask from './Mask.vue'
import DialogDrawer from './Drawer.vue'

export default {
  components: {
    DialogModel,
    DialogAlert,
    DialogToast,
    DialogDrawer,
    DialogMask
  }
}
</script>

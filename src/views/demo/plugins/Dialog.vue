<template>
  <div class="card p-5">
    <h1>
      v-dialogs
      <button type="button"
              class="btn btn-outline-secondary btn-sm"
              @click="$router.push({path: '/demo'})">Back to List</button>
    </h1>
    <hr>
    <h3 class="mt-2">Modal</h3>
    <div>
      <button type="button" class="btn btn-secondary" @click="callModal()" id="btn-modal">Modal</button>
    </div>
    <h5 class="mt-3">Header bar</h5>
    <div>
      <button type="button" class="btn btn-outline-dark mr-2" @click="callModal(false)" id="btn-alert-info">Close header bar</button>
      <button type="button" class="btn btn-outline-info" @click="callModal('Modal of v-dialogs')" id="btn-alert-info">Custom content</button>
    </div>

    <h3 class="mt-5">Alert</h3>
    <div>
      <div class="btn-group" role="group">
        <button type="button" class="btn btn-info" @click="callAlert()" id="btn-alert-info">Info</button>
        <button type="button" class="btn btn-warning" @click="callAlert('warning')" id="btn-alert-warning">Warning</button>
        <button type="button" class="btn btn-danger" @click="callAlert('error')" id="btn-alert-error">Error</button>
        <button type="button" class="btn btn-success" @click="callAlert('success')" id="btn-alert-success">Success</button>
        <button type="button" class="btn btn-secondary" @click="callAlert('confirm')" id="btn-alert-confirm">Confirm</button>
      </div>
    </div>
    <h5 class="mt-3">No icon</h5>
    <div>
      <button type="button" class="btn btn-outline-info" @click="callAlert('info', false)" id="btn-alert-info">Info</button>
    </div>
    <h5 class="mt-3">Header bar</h5>
    <div>
      <button type="button" class="btn btn-outline-dark mr-2" @click="callAlert('info', false, false)" id="btn-alert-info">Close header bar</button>
      <button type="button" class="btn btn-outline-info" @click="callAlert('info', false, 'The custom header content')" id="btn-alert-info">Custom content</button>
    </div>

    <h3 class="mt-5">Mask</h3>
    <p>
      <button type="button" class="btn btn-secondary" @click="callMask" id="btn-mask">Mask</button>
    </p>

    <h3 class="mt-5">Toast</h3>
    <div>
      <div class="btn-group" role="group">
        <button type="button" class="btn btn-info" @click="callToast()" id="btn-toast-info">Info</button>
        <button type="button" class="btn btn-warning" @click="callToast('warning')" id="btn-toast-warning">Warning</button>
        <button type="button" class="btn btn-danger" @click="callToast('error')" id="btn-toast-error">Error</button>
        <button type="button" class="btn btn-success" @click="callToast('success')" id="btn-toast-success">Success</button>
      </div>
    </div>
    <h5 class="mt-3">No icon</h5>
    <div>
      <button type="button" class="btn btn-outline-info" @click="callToast('info', false)" id="btn-toast-info">Info</button>
    </div>
  </div>
</template>

<script>
import profile from '../Profile'
export default {
  name: 'Dialog',
  methods: {
    callModal (title) {
      const options = {
        width: 500,
        height: 620,
        title: title,
        backdrop: true,
        backdropClose: true,
        params: { userName: 'TerryZ' },
        callback: data => {
          // console.log(data);
          this.$dlg.alert(`Received user name: ${data.name}`)
        }
      }
      if (typeof title !== 'undefined') options.title = title
      this.$dlg.modal(profile, options)
    },
    callAlert (type = 'info', icon = true, title) {
      // this.$dlg.alert('互联网科技与金融的结合变革了传统金融的经营思路，促使了金融行业的转型。如何利用科技进一步推动社会与经济的发展，成为了科技和金融领域需要共同思考的问题。11 日下午金融科技主论坛，不仅有蚂蚁金服发布在金融云、AI、风控、生物识别、开放平台等领域的最新进展以及技术突破，更有世界级别大咖：联合国粮农署副总干事 Mr. Daniel J. Gustafson 分享“科技如何消除贫困，推动农业发展”等。');
      const dlg = this.$dlg
      const option = {
        language: 'cn',
        icon: icon,
        messageType: type
      }
      if (typeof title !== 'undefined') option.title = title
      if (type === 'confirm') {
        option.cancelCallback = () => {
          dlg.alert('You canceled the confirm Alert')
        }
      }
      const key = dlg.alert('This is a Dialog plugin for <b>Vue2</b>, the name is <b>v-dialog</b>!', function () {
        dlg.alert('You selected Ok!')
      }, option)
      console.log('Alert key:', key)
      console.log(title)
    },
    callMask () {
      let dlg = this.$dlg
      let key = dlg.mask(null, function () {
      }, {
        // language: 'en',
        closeTime: 0
      })
      console.log('mask dialog key:', key)
      setTimeout(function () {
        dlg.close(key)
      }, 3000)
    },
    callToast (type = 'info', icon = true, title) {
      const options = {
        messageType: type,
        icon: icon,
        position: 'bottomRight'
      }
      if (typeof title !== 'undefined') options.titleBar = title
      if (type === 'info') {
        options.closeTime = 3
        options.dialogCloseButton = false
      }
      this.$dlg.toast('this is a Vue <b>v-dialog</b> Toast!', options)
    }
  },
  mounted () {
    // console.log(this)
    // console.log(this.$store.state.language)
  }
}
</script>

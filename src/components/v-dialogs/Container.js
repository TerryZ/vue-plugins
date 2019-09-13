import './dialog.scss'
import { messageTypes, alertIconClass, toastConstants, languages } from './constants'

export default {
  name: 'v-dialogs',
  components: {
    'dlg-modal': () => import('./components/Modal'),
    'dlg-alert': () => import('./components/Alert'),
    'dlg-mask': () => import('./components/Mask'),
    'dlg-toast': () => import('./components/Toast')
  },
  data () {
    return {
      dialogs: [],
      keyPrefix: 'v-dialogs-',
      keyNum: 0
    }
  },
  /*
  <template>
      <div class="v-dialog-container" v-show="dialogs.length">
          <v-dialog v-for="(dlg,index) in dialogs" :key="dlg.dialogKey" is="v-dialog"
                    -:type="dlg.type"
                    -:dialogIndex="index"
                    -:dialogKey="dlg.dialogKey"
                    -:singletonKey="dlg.singletonKey"
                    :backdrop="dlg.backdrop"
                    :titleBar="dlg.title"
                    :component="dlg.component"
                    :width="dlg.width"
                    :height="dlg.height"
                    :params="dlg.params"
                    :fullWidth="dlg.fullWidth"
                    :dialogCloseButton="dlg.dialogCloseButton"
                    :dialogMaxButton="dlg.dialogMaxButton"
                    :message="dlg.message"
                    :messageType="dlg.messageType"
                    :position="dlg.position"
                    :customClass="dlg.customClass"
                    :iconClassName="dlg.iconClassName"
                    -:i18n="dlg.i18n"
                    -:closeTime="dlg.closeTime"
                    :cancel="dlg.cancel"
                    :cancelCallback="dlg.cancelCallback"
                    :contentClass="dlg.contentClass"
                    -@close="closeDialog"></v-dialog>
      </div>
  </template>
  */
  render (h) {
    return h('div', {
      class: 'v-dialog-container',
      directives: [{
        name: 'show',
        value: this.dialogs.length
      }]
    },
    this.dialogs.map((val, index) => {
      const options = {
        key: val.dialogKey,
        props: {
          type: val.type,
          dialogIndex: index,
          dialogKey: val.dialogKey,
          closeTime: val.closeTime
        },
        on: {
          close: this.closeDialog
        }
      }
      if (val.singletonKey) options.props.singletonKey = val.singletonKey
      switch (val.type) {
        case 'modal':
          break
        case 'alert':
          options.props.i18n = val.i18n
          break
        case 'mask':
          break
        case 'toast':
          break
      }
      return h(`dlg-${val.type}`, options)
    }))
  },
  methods: {
    /**
     * Merge user options and default options
     * @param config - user options
     * @return merged options
     */
    buildDialogConfig (config) {
      // let merged = Object.assign({}, dialogDefaults, config);
      // return merged;
      config.i18n = languages[config.language]
      return config
    },
    /**
     * String cut
     * @param str [string] src string
     * @param n   [number] save string length
     * @returns string
     */
    stringSub (str, n) {
      if (typeof (str) !== 'string') return
      /* eslint-disable */
      const r=/[^\x00-\xff]/g;
        /* eslint-enable */
      if (str.replace(r, 'mm').length <= n) { return str }
      const m = Math.floor(n / 2)
      for (let i = m; i < str.length; i++) {
        if (str.substr(0, i).replace(r, 'mm').length >= n) {
          return str.substr(0, i) + '...'
        }
      }
      return str
    },
    /**
     * Init default options
     */
    buildDialog (config) {
      const idx = this.dialogs.findIndex(val => config.singletonKey && val.singletonKey === config.singletonKey)
      if (idx === -1) {
        this.keyNum++
        const key = this.keyPrefix + this.keyNum
        config.dialogKey = key
        this.dialogs.push(config)
        return key
      } else return null
    },
    /**
     * Open a Modal dialog
     * @param p - options
     */
    addModal (p) {
      const config = this.buildDialogConfig(p)
      config.type = 'modal'
      return this.buildDialog(config)
    },
    /**
     * Open a message alert dialog, types including info, warning, error, success, confirm
     * @param p - options
     */
    addAlert (p) {
      const config = this.buildDialogConfig(p)
      const MAX_CONTENT_LENGTH = 70
      config.type = 'alert'
      if (!config.messageType) config.messageType = messageTypes.info

      let title = config.i18n.titleInfo
      switch (config.messageType) {
        case messageTypes.warning:
          title = config.i18n.titleWarning
          break
        case messageTypes.error:
          title = config.i18n.titleError
          break
        case messageTypes.success:
          title = config.i18n.titleSuccess
          break
        case messageTypes.confirm:
          title = config.i18n.titleConfirm
          break
        default:
          title = config.i18n.titleInfo
      }
      config.iconClassName = alertIconClass[config.messageType]
      config.title = title
      config.width = config.message.length > MAX_CONTENT_LENGTH ? 700 : 450
      config.height = config.message.length > MAX_CONTENT_LENGTH
        ? 400
        : typeof config.title === 'undefined' || typeof config.title === 'string'
          ? 210
          : 180

      return this.buildDialog(config)
    },
    /**
     * Open a full screen mask
     * @param p - options
     */
    addMask (p) {
      const config = this.buildDialogConfig(p)
      config.type = 'mask'
      config.message = config.message || config.i18n.maskText
      config.message = this.stringSub(config.message, 65)
      config.width = 300
      config.height = 80
      config.backdrop = true

      return this.buildDialog(config)
    },
    /**
     * Open a Toast dialog (corner dialog)
     * @param p - options
     * @enum position
     * 'topLeft'
     * 'topCenter'
     * 'topRight'
     * 'bottomLeft'
     * 'bottomCenter'
     * 'bottomRight'
     */
    addToast (p) {
      const config = this.buildDialogConfig(p)
      config.type = 'toast'
      config.message = this.stringSub(config.message, 56)
      config.title = config.i18n.titleInfo
      config.width = 300
      config.height = 80
      if (!config.messageType) config.messageType = messageTypes.info
      config.iconClassName = toastConstants.iconClass[config.messageType]
      switch (config.messageType) {
        case messageTypes.warning:
          config.title = config.i18n.titleWarning
          config.contentClass = toastConstants.contentClass.warning
          break
        case messageTypes.error:
          config.title = config.i18n.titleError
          config.contentClass = toastConstants.contentClass.error
          break
        case messageTypes.success:
          config.title = config.i18n.titleSuccess
          config.contentClass = toastConstants.contentClass.success
          break
      }

      return this.buildDialog(config)
    },
    /**
     * Close dialog, last one or specified key dialog (Modal, Alert, Mask, Toast)
     * @param key - the dialog key, you can get it like this: let key = this.$vDialog.alert('your msg');
     */
    close (key) {
      if (!this.dialogs.length) return
      const dKey = key || this.dialogs[this.dialogs.length - 1].dialogKey
      this.closeDialog(dKey)
    },
    /**
     * Close dialog (remove dialogs array item) and call user callback function
     * @private
     * @param key[string] - dialog key
     * @param cancel[boolean] - trigger cancelCallback or not
     * @param data[object] - return data when close dialog(Modal)
     */
    closeDialog (key, cancel, data) {
      if (!key) return
      const dlg = this.dialogs.find(val => val.dialogKey === key)
      if (dlg) {
        this.dialogs = this.dialogs.filter(val => val.dialogKey !== key)
        this.$nextTick(() => {
          if (dlg.callback && typeof dlg.callback === 'function' && !cancel) dlg.callback(data)
          if (cancel && dlg.cancelCallback && typeof dlg.cancelCallback === 'function') dlg.cancelCallback()
        })
      }
    },
    /**
     * Close all dialog
     * @param callback[function] the callback when all dialogs closed
     */
    closeAll (callback) {
      if (this.dialogs.length) this.dialogs = []
      this.$nextTick(() => {
        if (callback && typeof callback === 'function') callback()
      })
    }
  }
}

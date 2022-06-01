import './styles/dialog.sass'

import language from './language'
import { types, messageTypes, alertIconClass, toastConstants } from './constants'
import { getTitle, toastTheme, stringSub } from './helper'
import { generateDialogOption } from './utils/options'

import DialogModel from './components/Modal'
import DialogAlert from './components/Alert'
import DialogToast from './components/Toast'
import DialogMask from './components/Mask'

const { info } = messageTypes
const { MODAL, ALERT, MASK, TOAST } = types

const KEY_PREFIX = 'v-dialogs-'

let keyNum = 0

export default {
  name: 'v-dialogs',
  components: {
    DialogModel,
    DialogAlert,
    DialogToast,
    DialogMask
  },
  data () {
    return {
      dialogs: []
    }
  },
  render (h) {
    const { dialogs, closeDialog } = this
    const dialogList = dialogs.map((val, index) => {
      const option = generateDialogOption(val, index, closeDialog)
      return h(`dialog-${val.type}`, option)
    })
    return h('div', { class: 'v-dialogs-container' }, dialogList)
  },
  methods: {
    /**
     * Merge user options and default options
     * @param {object} config - user options
     * @return {object} merged options
     */
    buildConfig (config) {
      // let merged = Object.assign({}, dialogDefaults, config);
      // return merged;
      config.i18n = language[config.language]
      if (!config.messageType) config.messageType = info
      return config
    },
    /**
     * Initialize default options
     */
    buildDialog (config) {
      const exist = this.dialogs.some(val => {
        return config.singletonKey && val.singletonKey === config.singletonKey
      })
      if (exist) return null

      keyNum++
      const key = KEY_PREFIX + keyNum
      config.dialogKey = key
      this.dialogs.push(config)
      return key
    },
    /**
     * Open a Modal dialog
     * @param p - options
     */
    addModal (p) {
      p.type = MODAL
      const config = this.buildConfig(p)
      return this.buildDialog(config)
    },
    /**
     * Open a message alert dialog, types including info, warning, error, success, confirm
     * @param p - options
     */
    addAlert (p) {
      p.type = ALERT
      const config = this.buildConfig(p)
      const MAX_CONTENT_LENGTH = 70

      if ('title' in config === false || config.title !== false) {
        config.title = getTitle(config.messageType, config.language)
      }
      config.iconClassName = alertIconClass[config.messageType]
      config.width = config.message.length > MAX_CONTENT_LENGTH ? 700 : 450
      config.height = config.message.length > MAX_CONTENT_LENGTH
        ? 400
        : typeof config.title === 'string' || typeof config.title === 'undefined'
          ? 210
          : 180

      return this.buildDialog(config)
    },
    /**
     * Open a full screen mask
     * @param p - options
     */
    addMask (p) {
      p.type = MASK
      const config = this.buildConfig(p)
      const MAX_CONTENT_LENGTH = 65
      config.message = config.message || config.i18n.maskText
      if (config.message.length > MAX_CONTENT_LENGTH) config.message = stringSub(config.message, 65)
      config.width = 300
      config.height = 80
      config.backdrop = true

      return this.buildDialog(config)
    },
    /**
     * Open a Toast dialog (corner dialog)
     *
     * @param p - options
     *
     * p.position option accept items:
     *
     * 'topLeft'
     * 'topCenter'
     * 'topRight'
     * 'bottomLeft'
     * 'bottomCenter'
     * 'bottomRight'
     */
    addToast (p) {
      p.type = TOAST
      const config = this.buildConfig(p)
      config.message = stringSub(config.message, 56)
      config.width = 300
      config.height = 80
      config.iconClassName = toastConstants.iconClass[config.messageType]
      config.title = getTitle(config.messageType, config.language)
      config.contentClass = toastTheme(config.messageType)

      return this.buildDialog(config)
    },
    /**
     * Close dialog, last one or specified key dialog (Modal, Alert, Mask, Toast)
     *
     * @param {string} key - the dialog key, you can get it like below
     *
     * const key = this.$dlg.alert('your msg')
     */
    close (key) {
      const { dialogs } = this
      if (!dialogs.length) return
      const dKey = key || dialogs[dialogs.length - 1].dialogKey
      this.closeDialog(dKey)
    },
    /**
     * Close dialog (remove dialogs array item) and call user callback function
     * @private
     *
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
          if (cancel && dlg.cancelCallback && typeof dlg.cancelCallback === 'function') {
            dlg.cancelCallback()
          }
        })
      }
    },
    /**
     * Close all dialog
     * @param callback[function] the callback fired when all dialogs closed
     */
    closeAll (callback) {
      if (this.dialogs.length) this.dialogs = []
      this.$nextTick(() => {
        if (callback && typeof callback === 'function') callback()
      })
    }
  }
}

import './styles/dialog.sass'

import language from './language'
import {
  types,
  messageTypes,
  alertIconClass,
  toastConstants,
  DIALOG_KEY_PREFIX
} from './constants'
import { getTitle, toastTheme, textTruncate } from './helper'
import { generateDialogOption } from './utils/options'

import DialogModel from './components/Modal'
import DialogAlert from './components/Alert'
import DialogToast from './components/Toast'
import DialogMask from './components/Mask'

const { info } = messageTypes
const { MODAL, ALERT, MASK, TOAST } = types

let serialNumber = 0

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
      const { singletonKey } = config
      if (singletonKey) {
        if (this.dialogs.some(val => val.singletonKey === singletonKey)) {
          return
        }
      }

      serialNumber++
      const key = DIALOG_KEY_PREFIX + serialNumber
      config.dialogKey = key
      this.dialogs.push(config)
      return key
    },
    /**
     * Open a Modal dialog
     * @param {object} p - options
     * @returns {string} new dialog key
     */
    addModal (p) {
      p.type = MODAL
      const config = this.buildConfig(p)
      return this.buildDialog(config)
    },
    /**
     * Open a message alert dialog, types including info, warning, error, success, confirm
     * @param {object} p - options
     * @returns {string} new dialog key
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
     * @param {object} p - options
     * @returns {string} new dialog key
     */
    addMask (p) {
      p.type = MASK
      const config = this.buildConfig(p)
      const MAX_CONTENT_LENGTH = 65
      config.message = config.message || config.i18n.maskText
      if (config.message.length > MAX_CONTENT_LENGTH) config.message = textTruncate(config.message, 65)
      config.width = 300
      config.height = 80
      config.backdrop = true

      return this.buildDialog(config)
    },
    /**
     * Open a Toast dialog (corner dialog)
     *
     * @param {object} p - options
     *
     * p.position option accept items:
     *
     * 'topLeft'
     * 'topCenter'
     * 'topRight'
     * 'bottomLeft'
     * 'bottomCenter'
     * 'bottomRight'
     * @returns {string} new dialog key
     */
    addToast (p) {
      p.type = TOAST
      const config = this.buildConfig(p)
      config.message = textTruncate(config.message, 56)
      config.width = 300
      config.height = 80
      config.iconClassName = toastConstants.iconClass[config.messageType]
      config.title = getTitle(config.messageType, config.language)
      config.contentClass = toastTheme(config.messageType)

      return this.buildDialog(config)
    },
    /**
     * Close dialog, the last one or specified key dialog (Modal, Alert, Mask, Toast)
     *
     * @param {string} key - the dialog key
     *
     * @example
     * const key = this.$dlg.mask('your msg')
     * this.$dlg.close(key)
     */
    close (key) {
      const { dialogs } = this
      if (!dialogs.length) return
      this.closeDialog(key || dialogs[dialogs.length - 1].dialogKey)
    },
    /**
     * Close dialog (remove dialogs array item) and call user callback function
     * @private
     *
     * @param {string} key - dialog key
     * @param {boolean} cancel - trigger cancelCallback or not
     * @param {object} data - return data when close dialog(Modal)
     */
    closeDialog (key, cancel, data) {
      if (!key) return
      const dlg = this.dialogs.find(val => val.dialogKey === key)
      if (!dlg) return
      // remove current dialog from list
      this.dialogs = this.dialogs.filter(val => val.dialogKey !== key)
      this.$nextTick(() => {
        const { callback, cancelCallback } = dlg

        if (cancel) {
          if (cancelCallback && typeof cancelCallback === 'function') {
            cancelCallback()
          }
        } else {
          if (callback && typeof callback === 'function') {
            callback(data)
          }
        }
      })
    },
    /**
     * Close all dialog
     * @param {function} callback - the callback fired when all dialogs closed
     */
    closeAll (callback) {
      if (this.dialogs.length) this.dialogs = []
      this.$nextTick(() => {
        if (callback && typeof callback === 'function') callback()
      })
    }
  }
}

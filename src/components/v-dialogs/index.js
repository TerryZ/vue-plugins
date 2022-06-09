import { CN } from './language'
import { getInstance, DialogAlert, DialogMask, DialogToast } from './utils/instance'

export { DialogAlert, DialogMask, DialogToast }

export default {
  install (Vue, options = {}) {
    const { language, closeButton, maxButton, icon, instanceName } = options

    const dlg = getInstance()

    /**
     * Merge options
     * @param {object} p
     */
    const merge = p => {
      const params = {}
      params.language = typeof language === 'string' ? language : CN
      if (typeof closeButton === 'boolean') params.closeButton = closeButton
      if (typeof maxButton === 'boolean') params.maxButton = maxButton
      if (typeof icon === 'boolean') params.icon = icon
      return Object.assign({}, params, p)
    }

    /**
     * Define v-dialogs api
     */
    Object.defineProperty(Vue.prototype, instanceName || '$dlg', {
      value: {
        modal (component, params = {}) {
          if (!component) return
          params = merge(params)
          params.component = component
          return dlg.addModal(params)
        },
        alert () {
          return DialogAlert(...arguments)
        },
        mask () {
          return DialogMask(...arguments)
        },
        toast () {
          return DialogToast(...arguments)
        },
        close (key) {
          dlg.close(key)
        },
        closeAll (callback) {
          dlg.closeAll(callback)
        }
      }
    })
  }
}

import { CN } from './language'
import { getInstance, DialogAlert, DialogMask } from './utils/instance'

export { DialogAlert, DialogMask }

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
     * Handle the arguments
     * @param {array} args
     *
     * use alert for example
     *
     * this.$dlg.alert('some text')
     * this.$dlg.alert('some text', callback)
     * this.$dlg.alert('some text', options)
     * this.$dlg.alert('some text', callback, options)
     */
    const paramSet = args => {
      let params = {}

      if (args.length === 3 && typeof args[2] === 'object') params = args[2]
      if (args.length === 2 && typeof args[1] === 'object') params = args[1]
      if (typeof args[1] === 'function') params.callback = args[1]

      params = merge(params)
      params.message = typeof args[0] === 'string' ? args[0] : ''
      return params
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
          if (!arguments.length || !arguments[0]) return
          return dlg.addToast(paramSet(arguments))
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

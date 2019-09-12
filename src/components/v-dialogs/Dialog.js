import './dialog.scss'

export default {
  components: {
    'dlg-modal': () => import('./components/Modal'),
    'dlg-alert': () => import('./components/Alert'),
    'dlg-mask': () => import('./components/Mask'),
    'dlg-toast': () => import('./components/Toast')
  },
  props: {
    /**
     * Dialog type
     * @type string
     * @enum 'modal' Modal dialog
     * @enum 'alert' Alert dialog
     * @enum 'mask' Mask dialog
     * @enum 'toast' Toast(corner) dialog
     */
    type: {
      type: String,
      default: 'modal',
      required: true
    }
  },
  provide () {
    return {
      type: this.type
    }
  },
  render (h) {
    const options = {
      attrs: this.$attrs,
      on: this.$listeners
    }
    if (['modal', 'alert', 'mask', 'toast'].includes(this.type.trim().toLowerCase())) {
      return h(`dlg-${this.type}`, options)
    }
  }
}

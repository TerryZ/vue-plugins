import { messageTypes } from '../constants'
import mixins from '../mixins'

export default {
  name: 'DialogToast',
  mixins: [mixins],
  props: {
    /**
     * Toast dialog message type
     *
     * - 'info'(default)
     * - 'warning'
     * - 'error'
     * - 'success'
     */
    messageType: { type: String, default: messageTypes.info },
    icon: { type: Boolean, default: true },
    iconClassName: String,
    /** Dialog corner position type */
    position: { type: String, default: 'bottomRight' },
    closeButton: { type: Boolean, default: true }
  },
  data () {
    return {
      dialogSize: {}
    }
  },
  render (h) {
    const child = []
    // Close button
    if (this.closeButton) {
      const buttonOption = {
        attrs: { type: 'button' },
        class: 'v-dialog-toast__close',
        on: {
          click: () => {
            this.closeDialog(false)
          }
        }
      }
      child.push(h('button', buttonOption, '×'))
    }
    // Type icon
    if (this.icon) {
      const icon = h('i', { class: ['dlg-icon-font', this.iconClassName] })
      child.push(h('div', { class: 'v-dialog-toast__icon' }, [icon]))
    }

    const contentOption = {
      domProps: {
        innerHTML: this.message
      }
    }
    // Title and content
    child.push(h('div', { class: 'v-dialog-toast__content' }, [
      h('h3', this.titleBar),
      h('p', contentOption)
    ]))

    const bodyOption = {
      class: 'v-dialog-body',
      style: {
        height: this.bodyHeight + 'px'
      }
    }
    const bodyClasses = ['v-dialog-toast__container', this.contentClass]
    if (!this.icon) {
      bodyClasses.push('no-icon')
    }
    const body = h('div', bodyOption, [
      h('div', { class: bodyClasses }, child)
    ])

    const dialog = h('div', {
      class: 'v-dialog-dialog',
      style: this.dialogStyles
    }, [
      h('div', { class: 'v-dialog-content' }, [body])
    ])

    const containerOption = {
      class: ['v-dialog', 'v-dialog-toast', this.position],
      style: {
        ...this.dialogSize,
        'z-index': this.dialogZIndex
      },
      directives: [{
        name: 'show',
        value: this.show
      }]
    }
    return h('transition', {
      props: {
        name: 'v-dialog--smooth',
        appear: true
      }
    }, [
      h('div', containerOption, [dialog])
    ])
  },
  mounted () {
    this.dialogSize = {
      width: this.width + 'px',
      height: this.height + 'px'
    }
    this.bodyHeight = this.height
  }
}

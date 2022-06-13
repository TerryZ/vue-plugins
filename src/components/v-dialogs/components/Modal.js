import mixins from '../mixins'
import render from '../mixins/render'
import {
  calculateDialogTop,
  hideDocumentBodyOverflow,
  restoreDocumentBodyOverflow
} from '../utils/helper'
import { DIALOG_HEADER_CLASS } from '../constants'

export default {
  name: 'DialogModal',
  mixins: [mixins, render],
  props: {
    component: Object,
    /**
     * Send parameters to Component
     * you need use props to receive this params in component
     */
    params: Object,
    /** Full screen dialog */
    fullWidth: { type: Boolean, default: false },
    maxButton: { type: Boolean, default: true },
    closeButton: { type: Boolean, default: true }
  },
  data () {
    return {
      maximize: false,
      animate: false
    }
  },
  computed: {
    classes () {
      return {
        'v-dialog': true,
        'v-dialog-modal': true,
        'v-dialog--maximize': this.maximize,
        'v-dialog--buzz-out': this.shake
      }
    },
    maxClass () {
      return this.maximize ? 'dlg-icon-restore' : 'dlg-icon-max'
    }
  },
  render (h) {
    const contents = []

    contents.push(this.generateHeader())
    contents.push(this.generateBody())

    const dialog = h('div', {
      class: {
        'v-dialog-dialog': true,
        'v-dialog-default-animated': this.animate
      },
      style: this.dialogStyles
    }, [
      this.generateDialogContent({
        className: 'v-dialog-content',
        transitionName: 'v-dialog--smooth',
        child: contents
      })
    ])

    return h('div', [
      this.generateDialogScreen(dialog),
      this.generateBackdrop()
    ])
  },
  methods: {
    generateHeader () {
      if (this.titleBar === false) return

      const h = this.$createElement
      const buttons = []
      if (this.closeButton) {
        const closeButtonOption = {
          class: 'v-dialog-btn__close',
          attrs: {
            type: 'button'
          },
          on: {
            click: this.closeButtonHandle
          }
        }
        const closeButtonIcon = h('i', {
          class: 'dlg-icon-font dlg-icon-close'
        })
        buttons.push(h('button', closeButtonOption, [closeButtonIcon]))
      }
      if (this.maxButton) {
        const maxButtonOption = {
          class: 'v-dialog-btn__maximize',
          attrs: {
            type: 'button'
          },
          on: {
            click: this.max
          }
        }
        const maxButtonIcon = h('i', {
          class: ['dlg-icon-font', this.maxClass]
        })
        buttons.push(h('button', maxButtonOption, [maxButtonIcon]))
      }
      return h('div', { class: DIALOG_HEADER_CLASS }, [
        ...buttons,
        h('h3', this.titleBar)
      ])
    },
    generateBody () {
      const h = this.$createElement
      // Dynamic component
      const component = h(this.component, {
        props: this.params,
        on: {
          close: this.closeModal
        }
      })
      const dialogOption = {
        class: 'v-dialog-body',
        style: {
          height: this.bodyHeight + 'px'
        }
      }
      return h('div', dialogOption, [component])
    },
    // Maximize the dialog
    max () {
      if (!this.animate) {
        this.animate = true
      }
      this.maximize = !this.maximize
      this.setBodyHeight()
    },
    modalAdjust () {
      if (this.maximize) {
        this.dialogTop = 0
        return
      }
      this.dialogTop = calculateDialogTop(this.height)
    },
    // Close button in header
    closeButtonHandle () {
      restoreDocumentBodyOverflow()
      this.closeDialog(true)
    },
    closeModal (data) {
      restoreDocumentBodyOverflow()
      this.closeDialog(false, data)
    },
    setBodyHeight () {
      const { titleBar, maximize, height } = this
      const header = this.$el.querySelector(`.${DIALOG_HEADER_CLASS}`)
      const headerHeight = titleBar ? header.offsetHeight : 0
      const dialogHeight = maximize ? window.innerHeight : height

      this.bodyHeight = dialogHeight - headerHeight
      this.$nextTick(() => {
        this.modalAdjust()
      })
    }
  },
  mounted () {
    this.setBodyHeight()
    hideDocumentBodyOverflow()
  }
}

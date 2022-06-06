import { messageTypes } from '../constants'
import { getLanguage } from '../language'

import mixins from '../mixins'
import render from '../mixins/render'

const { info, warning, error, success, confirm } = messageTypes

export default {
  name: 'DialogAlert',
  mixins: [mixins, render],
  props: {
    /**
     * Dialog message type (work on alert, toast mode)
     *
     * -'info' - default
     * -'warning'
     * -'error'
     * -'success'
     * -'confirm'
     */
    messageType: { type: String, default: info },
    icon: { type: Boolean, default: true },
    iconClassName: { type: String, default: '' }
  },
  computed: {
    shadow () {
      switch (this.messageType) {
        case warning: return 'v-dialog__shadow--warning'
        case error: return 'v-dialog__shadow--error'
        case success: return 'v-dialog__shadow--success'
        default: return ''
      }
    },
    classes () {
      return {
        'v-dialog': true,
        'v-dialog--buzz-out': this.shake
      }
    }
  },
  render (h) {
    const i18n = getLanguage(this.language)
    const child = []

    child.push(this.generateHeader())

    const buttons = []
    // Okey button
    const okButtonOption = {
      attrs: {
        type: 'button'
      },
      class: 'v-dialog-btn__ok',
      ref: 'btnOk',
      on: {
        click: () => {
          this.closeDialog(false)
        }
      }
    }
    buttons.push(h('button', okButtonOption, i18n.btnOk))
    // Cancel button
    if (this.messageType === confirm) {
      const cancelButtonOption = {
        attrs: {
          type: 'button'
        },
        class: 'v-dialog-btn__cancel',
        on: {
          click: () => {
            this.closeDialog(true)
          }
        }
      }
      buttons.push(h('button', cancelButtonOption, i18n.btnCancel))
    }
    // dialog body
    const contentOption = {
      class: 'v-dialog-alert__content',
      domProps: {
        innerHTML: this.message
      }
    }
    const bodyOption = {
      class: 'v-dialog-body',
      style: {
        height: this.bodyHeight + 'px'
      }
    }
    child.push(h('div', bodyOption, [
      h('div', { class: ['v-dialog-alert', this.icon ? this.iconClassName : 'no-icon'] }, [
        h('div', contentOption),
        h('div', { class: 'v-dialog-alert__buttons' }, buttons)
      ])
    ]))

    const dialog = h('div', {
      class: 'v-dialog-dialog',
      style: this.dialogStyles
    }, [
      this.buildDlgContent(h, {
        className: ['v-dialog-content', this.shadow],
        transitionName: 'v-dialog--candy',
        child
      })
    ])

    return h('div', [
      this.buildDlgScreen(h, dialog),
      this.buildBackdrop()
    ])
  },
  methods: {
    generateHeader () {
      const { titleBar } = this
      if (titleBar === false) return

      const h = this.$createElement
      const titleOption = {
        class: 'v-dialog-header',
        ref: 'header'
      }
      return h('div', titleOption, [h('h3', titleBar)])
    },
    generateBody () {

    },
    generateButtons () {
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (this.titleBar) {
        // this.$refs.header.getBoundingClientRect().height
        const headerHeight = this.$refs.header.offsetHeight
        this.bodyHeight = this.height - headerHeight
      } else {
        this.bodyHeight = this.height
      }

      this.adjust()
      this.$refs.btnOk.focus()
    })
  }
}

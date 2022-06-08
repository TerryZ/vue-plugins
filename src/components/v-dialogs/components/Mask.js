import mixins from '../mixins'
import render from '../mixins/render'
import { calculateDialogTop } from '../utils/helper'

export default {
  name: 'DialogMask',
  mixins: [mixins, render],
  computed: {
    classes () {
      return {
        'v-dialog': true,
        'v-dialog--buzz-out': this.shake
      }
    }
  },
  render (h) {
    const contentOption = {
      class: 'v-dialog-mask__content',
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
    const body = h('div', bodyOption, [
      h('div', { class: 'v-dialog-mask__container' }, [
        h('div', { class: 'v-dialog-timer' }),
        h('div', contentOption)
      ])
    ])

    const dialog = h('div', {
      class: 'v-dialog-dialog',
      style: this.dialogStyles
    }, [
      this.generateDialogContent({
        className: 'v-dialog-content',
        transitionName: 'v-dialog--candy',
        child: [body]
      })
    ])

    return h('div', [
      this.generateDialogScreen(dialog),
      this.generateBackdrop()
    ])
  },
  mounted () {
    const { height } = this
    this.bodyHeight = height
    this.dialogTop = calculateDialogTop(height)
  }
}

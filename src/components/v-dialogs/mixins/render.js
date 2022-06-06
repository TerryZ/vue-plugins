export default {
  methods: {
    /**
     * Building backdrop layer
     */
    buildBackdrop () {
      const h = this.$createElement
      const child = []
      if (this.backdrop && this.show) {
        const backdropOption = {
          class: 'v-dialog-overlay',
          style: {
            'z-index': this.backdropZIndex
          }
        }
        child.push(h('div', backdropOption))
      }
      return h('transition', {
        props: {
          name: 'v-dialog--fade',
          appear: true
        }
      }, child)
    },
    /**
     * Build dialog content
     *
     * @param {function} h - createElement
     * @param {object} options
     * @returns
     */
    buildDlgContent (h, options) {
      const { className, transitionName, child } = options

      const option = {
        class: className,
        directives: [{
          name: 'show',
          value: this.show
        }]
      }
      const content = h('div', option, child)
      const transitionOption = {
        props: {
          name: transitionName,
          appear: true
        }
      }
      return h('transition', transitionOption, [content])
    },
    /**
     * Build dialog major screen
     *
     * @param {*} h
     * @param {*} dialog
     * @returns
     */
    buildDlgScreen (h, dialog) {
      const option = {
        class: this.classes,
        style: {
          'z-index': this.dialogZIndex
        },
        on: {
          click: e => {
            if (e.target !== e.currentTarget) return
            this.outsideClick()
          }
        }
      }
      return h('div', option, [dialog])
    }
  }
}

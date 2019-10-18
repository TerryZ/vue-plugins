export default {
  methods: {
    /**
     * Building backdrop layer
     *
     * @param {*} h
     * @returns
     */
    buildBackdrop (h) {
      const child = []
      if (this.backdrop && this.show) {
        child.push(h('div', {
          class: 'v-dialog-overlay',
          style: {
            'z-index': this.backdropZIndex
          }
        }))
      }
      return h('transition', {
        props: {
          name: 'v-dialog--fade',
          appear: true
        }
      }, child)
    }
  }
}

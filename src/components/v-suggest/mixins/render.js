export default {
  render (h) {
    const child = []
    child.push(h('input', {
      attrs: {
        type: 'text',
        placeholder: this.placeholder,
        disabled: this.disabled
      },
      domProps: {
        value: this.text.trim()
      },
      on: {
        keyup: this.processKey,
        keydown: this.processControl,
        focus: this.open,
        input: e => {
          this.text = e.target.value.trim()
        }
      },
      ref: 'input'
    }))
    // clean button
    if (!this.disabled) {
      child.push(h('div', {
        class: 'sg-clear',
        on: {
          click: this.clear
        },
        directives: [{
          name: 'show',
          value: this.text
        }]
      }, [h('span', '×')]))
    }
    const caller = h('template', { slot: 'caller' }, [
      h('div', { class: 'v-suggest' }, child)
    ])
    // the suggestion result list
    const result = h('ul', {
      class: 'sg-results',
      style: {
        width: this.width + 'px'
      },
      ref: 'list'
    }, this.list.map((row, index) => {
      return h('li', {
        class: {
          'sg-results__row': true,
          'sg-over': this.highlight === index
        },
        on: {
          click: () => {
            this.selectItem(row)
          },
          mouseenter: () => {
            this.highlight = index
          },
          mouseleave: () => {
            this.highlight = -1
          }
        },
        domProps: {
          innerHTML: this.getRow(row)
        }
      })
    }))

    return h('dropdown', {
      props: {
        animated: false,
        disabled: this.disabled,
        border: false,
        manual: true
      },
      on: {
        show: this.showChange
      },
      ref: 'drop'
    }, [caller, result])
  }
}

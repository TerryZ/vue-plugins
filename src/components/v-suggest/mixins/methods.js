const UP = 38
const DOWN = 40
const ESC = 27
const TAB = 9
const ENTER = 13

export default {
  methods: {
    open (load = true) {
      if (this.disabled) return
      if (this.text.trim() && load) this.populate()
      if (!this.show && this.list.length) this.$refs.drop.visible()
      this.adjust()
    },
    close () {
      if (this.show) this.$refs.drop.visible()
      this.reset()
    },
    clear () {
      this.text = ''
      this.populate()
      this.inputFocus()
    },
    inputFocus () {
      this.$refs.input.focus()
    },
    reset () {
      this.highlight = -1
    },
    getRow (row) {
      switch (typeof this.showField) {
        case 'string': return row[this.showField] ? row[this.showField] : ''
        case 'function': return this.showField(row) ? this.showField(row) : ''
      }
    },
    showChange (val) {
      this.show = val
      if (!val) this.highlight = -1
    },
    processKey (e) {
      if ([UP, DOWN, ESC, ENTER, TAB].includes(e.keyCode)) return
      this.lastInputTime = e.timeStamp
      setTimeout(() => {
        if ((e.timeStamp - this.lastInputTime) === 0) {
          this.populate()
          this.checkOpen()
        }
      }, this.delay * 1000)
    },
    processControl (e) {
      if ([UP, DOWN, ESC, ENTER, TAB].includes(e.keyCode)) {
        switch (e.keyCode) {
          case 38:// up
            this.previous()
            break
          case 40:// down
            this.next()
            break
          case 9: // tab
          case 13:// enter
            if (this.highlight !== -1) this.selectItem(this.list[this.highlight])
            break
          case 27:// escape
            this.close()
            break
        }
      }
    },
    selectItem (row) {
      this.text = this.getRow(row)
      this.$emit('values', row)
      this.close()
    },
    next () {
      if (!this.show) this.open()
      if (this.highlight < (this.list.length - 1)) {
        this.highlight++
        this.$nextTick(() => {
          const cur = this.$refs.list.querySelectorAll('.sg-over')[0]
          const curPos = cur.getBoundingClientRect()
          const listPos = this.$refs.list.getBoundingClientRect()
          const dist = (this.$refs.list.scrollTop + curPos.bottom) - listPos.bottom
          if (dist) this.$refs.list.scrollTop = dist
        })
      }
    },
    previous () {
      if (this.highlight === 0) return
      if (!this.show) this.open()
      this.highlight = this.highlight === -1 ? this.list.length - 1 : --this.highlight
      this.$nextTick(() => {
        const cur = this.$refs.list.querySelectorAll('.sg-over')[0]
        const curPos = cur.getBoundingClientRect()
        const listPos = this.$refs.list.getBoundingClientRect()
        const dist = curPos.top - listPos.top
        if (dist < 0) this.$refs.list.scrollTop += dist
      })
    },
    checkOpen () {
      this.list.length ? this.open(false) : this.close()
    },
    adjust () {
      const inputWidth = this.$refs.input.getBoundingClientRect().width

      // minimize width 200px
      if (this.width === 198) {
        if (inputWidth > 198) this.width = inputWidth
      } else {
        if ((inputWidth - 2) !== this.width) this.width = (inputWidth > 200 ? inputWidth : 200) - 2
      }
    },
    populate () {
      console.log('populate')
      if (Array.isArray(this.data) && this.data.length) {
        if (this.text !== this.last) {
          const text = this.text.trim().toLowerCase()
          this.list = text ? this.data.concat().filter(value => {
            const result = this.getRow(value).toLowerCase()
            return new RegExp(text).test(String(result))
          }) : []
        }
        this.last = this.text
      }
    }
  }
}

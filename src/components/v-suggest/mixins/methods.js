const UP = 38
const DOWN = 40
const ESC = 27
const TAB = 9
const ENTER = 13

export default {
  methods: {
    open () {
      if (this.disabled) return
      this.populate()
      if (!this.dropShow && this.list.length) this.$refs.drop.$emit('show', this.$refs.input)
      this.adjust()
    },
    close () {
      if (this.dropShow) this.$refs.drop.$emit('show')
      this.highlight = -1
    },
    clear () {
      this.text = ''
      this.populate()
      this.inputFocus()
    },
    inputFocus () {
      this.$refs.input.focus()
    },
    getRow (row) {
      if (typeof this.showField === 'string') return row[this.showField] ? row[this.showField] : ''
      else if (typeof this.showField === 'function') return this.showField(row) ? this.showField(row) : ''
    },
    showChange (val) {
      this.dropShow = val
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
      if (!this.dropShow) this.open()
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
      if (!this.dropShow) this.open()
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
      this.list.length ? this.open() : this.close()
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
      if (Array.isArray(this.data) && this.data.length) {
        if (this.text !== this.last) {
          this.list = this.text ? this.data.concat().filter(value => {
            const result = this.getRow(value).toLowerCase()
            return String(result).includes(this.text.toLowerCase())
          }) : []
        }
        this.last = this.text
      }
    }
  }
}

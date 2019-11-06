const [UP, DOWN, ESC, TAB, ENTER] = [38, 40, 27, 9, 13]

export default {
  methods: {
    focus () {
      const notEmpty = this.text.trim()
      // if (notEmpty && load) this.populate()
      // if (notEmpty && !this.show && this.list.length) {

      // }
      if (notEmpty) {
        this.populate()
      } else if (this.fullList) {
        this.list = this.listed()
      }

      if (this.list.length) this.open()
    },
    /**
     * Open dropdown layer
     *
     * @param {boolean} [load=true] - whether to load data
     */
    open (load = true) {
      if (!this.show) this.$refs.drop.visible()
      this.adjust()
    },
    close () {
      if (this.show) this.$refs.drop.visible()
      this.reset()
    },
    adjust () {
      if (!this.$refs.input || this.width > 0) return

      const width = this.$refs.input.getBoundingClientRect().width
      const MIN_WIDTH = 200
      this.width = width > MIN_WIDTH ? width : MIN_WIDTH
    },
    clear () {
      this.text = ''
      this.populate()
      this.focus()
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
      if (val) {
        this.$nextTick(() => {
          this.$refs.drop.adjust()
        })
      } else {
        this.highlight = -1
      }
    },
    selectItem (row) {
      this.text = this.getRow(row)
      this.$emit('values', row)
      this.close()
    },
    populate () {
      // console.log('populate:' + new Date().getTime())
      if (Array.isArray(this.data) && this.data.length) {
        const text = this.text.trim().toLowerCase()
        if (text !== this.last) {
          const list = text
            ? this.data.filter(value => {
              const result = this.getRow(value).toLowerCase()
              return new RegExp(text).test(String(result))
            })
            : []
          this.list = this.listed(list)
          // if (list.length) {
          //   this.list = this.listed(list)
          //   this.open(false)
          // } else {
          //   this.close()
          // }
          this.last = text
        }
      }
    },
    listed (list) {
      if (!list) list = this.data
      return this.maxLength
        ? list.filter((val, index) => {
          return index < this.maxLength
        })
        : list
    },
    checkIfOpen () {
      if (this.list.length) {
        this.open()
      } else {
        this.close()
      }
    },
    processKey (e) {
      if ([UP, DOWN, ESC, ENTER, TAB].includes(e.keyCode)) return
      this.lastInputTime = e.timeStamp
      setTimeout(() => {
        if ((e.timeStamp - this.lastInputTime) === 0) {
          this.populate()
          this.checkIfOpen()
        }
      }, this.delay * 1000)
    },
    processControl (e) {
      if ([UP, DOWN, ESC, ENTER, TAB].includes(e.keyCode)) {
        switch (e.keyCode) {
          case UP:// up
            this.previous()
            break
          case DOWN:// down
            this.next()
            break
          case TAB: // tab
          case ENTER:// enter
            if (this.highlight !== -1) this.selectItem(this.list[this.highlight])
            break
          case ESC:// escape
            this.close()
            break
        }
      }
    },
    next () {
      if (!this.list.length) return
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
      if (!this.list.length) return
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
    }
  }
}

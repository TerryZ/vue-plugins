<template>
  <div class="p-3">
    <p>
      Name (received by params option):
      <input
        type="text"
        class="form-control"
        v-model="name"
      >
    </p>
    <p>
      Age:
      <input
        type="text"
        class="form-control"
        v-model="age"
      >
    </p>
    <div>
      Company:
      <div class="input-group">
        <input
          type="text"
          class="form-control"
          disabled="disabled"
          v-model="company"
          placeholder="Please choose a company"
        >
        <span class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="chooseCompany"
          >Choose</button>
        </span>
      </div>
    </div>
    <p class="mt-3">
      <fa-icon icon="check" />
      <button
        type="button"
        class="btn btn-primary me-3"
        @click="ok"
      >
        <fa-icon icon="check" /> OK
      </button>
    </p>
  </div>
</template>

<script>
import cp from './Company'
export default {
  props: {
    name: { type: String, default: '' }
  },
  data () {
    return {
      company: '',
      age: 20
    }
  },
  methods: {
    ok () {
      const key = this.$dlg.mask('Data saving...(sleep 3 sec)')
      setTimeout(() => {
        this.$dlg.close(key)
        this.$emit('close', { companyName: this.company })
      }, 3000)
    },
    chooseCompany () {
      console.log(this)
      this.$dlg.modal(cp, {
        width: 500,
        height: 500,
        title: 'Company list',
        callback: data => {
          this.$dlg.toast(`Your selected <b>${data.name}</b> company.`, { closeTime: 2 })
          this.company = data && data.name
        }
      })
    }
  },
  mounted () {
    console.dir(this)
  }
}
</script>

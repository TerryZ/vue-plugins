import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true, // process.env.NODE_ENV !== 'production',
  state: {
    user: {
      name: 'Terry',
      age: 10
    }
  },
  mutations: {
    user: (state, user) => { state.user = user }
  },
  getters: {
  },
  actions: {
  }
})

export default store

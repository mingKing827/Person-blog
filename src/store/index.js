import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    token: localStorage.getItem('token') || ''
  },
  getters: {
    isAuthenticated: state => !!state.token
  },
  mutations: {
    SET_USER (state, user) {
      state.user = user
    },
    SET_TOKEN (state, token) {
      state.token = token
      localStorage.setItem('token', token)
    }
  },
  actions: {
    async login ({ commit }, credentials) {
      try {
        // 这里会调用模拟登录接口
        const response = await axios.post('/auth/login', credentials)
        commit('SET_USER', response.data.user)
        commit('SET_TOKEN', response.data.token)
        return response
      } catch (error) {
        throw error.response.data
      }
    }
  },
  modules: {
  }
})

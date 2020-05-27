/*
 * @Author: Jason
 * @Date: 2019-11-08 14:16:45
 * @version: 
 * @LastEditors: Jason
 * @LastEditTime: 2019-11-26 17:32:18
 * @Descripttion: 
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    airportInfo: {
      name:'chj'
    }
  },
  getters: {
    airportInfo: state => state.airportInfo
  },
  actions: {
    setAirportInfo({ commit, state }, payload) {
      commit('TypeAirPortInfo', payload)
    }
  },
  mutations: {
    ['TypeAirPortInfo'](state, payload) {
      console.log('payload', payload)
      state.airportInfo = payload
    }
  }
})

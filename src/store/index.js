import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    projects: [
      {id: 1, title: 'GTD Tracker'},
      {id: 2, title: 'Travel Yunnan'},
      {id: 4, title: '2017 Plan'},
      {id: 6, title: 'Save money'}
    ],
    contexts: [
      {id: 1, title: 'Home'},
      {id: 2, title: 'Computer'},
      {id: 3, title: 'Office'},
      {id: 4, title: 'Phone'}
    ],
    topActions: {
      left: {
        title: 'Left',
        action: function () {
          console.log('Left action clicked')
        }
      },
      middle: {
        title: 'Middle',
        action: function () {
          console.log('Middle action clicked')
        }
      },
      right: {
        title: 'right',
        action: function () {
          console.log('Middle action clicked')
        }
      }
    }
  },

  getters: {

  },

  mutations: {
    registerTopActions (state, actions) {
      state.topActions = actions
    }
  },

  actions: {

  }
})

export default store

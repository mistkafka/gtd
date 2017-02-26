import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    actions: [
      {id: 1, title: 'Learn Vue', project: 1},
      {id: 2, title: 'Wash Cloths', project: 2},
      {id: 3, title: 'Buy Food'},
      {id: 4, title: 'Buy Cloths'},
      {id: 5, title: 'Buy Phone'}
    ],
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
    projectMap: ({projects}) => projects.reduce((map, _) => map.set(_.id, _), new Map()),
    contextMap: ({contexts}) => contexts.reduce((map, _) => map.set(_.id, _), new Map()),
    actionMap: ({actions}) => actions.reduce((map, _) => map.set(_.id, _), new Map()),
    inbox: ({actions}) => actions.filter((_) => !_.project)
  },
  mutations: {
    registerTopActions (state, actions) {
      state.topActions = actions
    },
    saveAction ({actions}, action) {
      actions.push(action)
    }
  },

  actions: {

  }
})

export default store

import Vue from 'vue'
import Vuex from 'vuex'
import * as helper from './helper'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    actions: [],
    projects: [],
    contexts: [],
    topActions: {}
  },

  getters: {
    projectMap: ({projects}) => projects.reduce((map, _) => map.set(_.id, _), new Map()),
    contextMap: ({contexts}) => contexts.reduce((map, _) => map.set(_.id, _), new Map()),
    actionMap: ({actions}) => actions.reduce((map, _) => map.set(_.id, _), new Map()),
    inbox: ({actions}) => actions.filter((_) => !_.project),
    projectActions: ({actions}) => (id) => actions.filter((_) => _.project === id)
  },
  mutations: {
    registerTopActions (state, actions) {
      state.topActions = actions
    },
    save (state, item) {
      if (!item.id) {
        item.id = helper.generateUUID()
      }
      state[item.model].push(item)
      helper.saveToLocal(item.model, state[item.model])
    },
    GET_LOCAL_STATE: (state) => {
      [
        'actions',
        'projects',
        'context'
      ].forEach((_) => {
        state[_] = JSON.parse(window.localStorage.getItem(_)) || []
      })
    }
  },

  actions: {

  }
})

export default store

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
    },
    GET_STATE_FROM_LOCALSTORAGE: (state) => {
      [
        'actions',
        'projects',
        'contexts'
      ].forEach((_) => {
        state[_] = JSON.parse(window.localStorage.getItem(_)) || []
      })
    },
    SAVE_STATE_TO_LOCALSTORAGE: (state, models = ['projects', 'actions']) => {
      if (typeof models === 'string') {
        models = [models]
      }
      models.forEach((model) => window.localStorage.setItem(model, JSON.stringify(state[model])))
    }
  },
  actions: {

  }
})

export default store

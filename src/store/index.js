import Vue from 'vue'
import Vuex from 'vuex'
import * as helper from './helper'
import vuexI18n from 'vuex-i18n'

Vue.use(Vuex)

const modelTpl = {
  action: {
    model: 'action',
    title: '',
    description: '',
    project: '',
    type: 'Todo/Done',
    context: '',
    dueDate: '',
    target: 1,
    processItems: [],
    status: 'Active'
  },
  project: {
    model: 'project',
    title: '',
    description: '',
    status: 'Active',
    context: '',
    dueDate: '',
    logs: []
  }
}

const store = new Vuex.Store({
  modules: {
    i18n: vuexI18n.store
  },
  state: {
    'new/action': Object.assign({}, modelTpl.action),
    'new/project': Object.assign({}, modelTpl.project),
    'active/actionid': null,
    'active/projectid': null,
    actions: [],
    projects: [],
    contexts: [],
    topActions: {
      left: {},
      middle: {},
      right: {}
    },
    login: null,
    API: 'http://127.0.0.1:3000/api'
  },

  getters: {
    activeAction: (state) => {
      let rslt = null

      if (state['active/actionid']) {
        rslt = state.actions.find(_ => _.id === state['active/actionid'])
      } else {
        rslt = state['new/action']
      }

      return rslt
    },
    activeProject: (state) => {
      let rslt = null

      if (state['active/projectid']) {
        rslt = state.projects.find(_ => _.id === state['active/projectid'])
      } else {
        rslt = state['new/project']
      }

      return rslt
    },
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
      if (item.id) {
        return
      }
      item.id = helper.generateUUID()
      state[`new/${item.model}`] = Object.assign({}, modelTpl[item.model])
      state[item.model + 's'].push(item)
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
    },
    SET_ACTIVE_ID: (state, { type, id }) => {
      state[`active/${type}id`] = id
    },
    SET_LOGIN: (state, login) => {
      state.login = login
    }
  },
  actions: {
  }
})

Vue.use(vuexI18n.plugin, store)

export default store

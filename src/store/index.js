import Vue from 'vue'
import Vuex from 'vuex'
import vuexI18n from 'vuex-i18n'
import request from 'axios'
import { dateFormat } from 'vux'

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
  },
  context: {
    model: 'context',
    title: '',
    description: '',
    location: '',
    device: ''
  }
}

const store = new Vuex.Store({
  modules: {
    i18n: vuexI18n.store
  },
  state: {
    'new/action': Object.assign({}, modelTpl.action),
    'new/project': Object.assign({}, modelTpl.project),
    'new/context': Object.assign({}, modelTpl.context),
    'active/actionid': null,
    'active/projectid': null,
    'active/contextid': null,
    actions: [],
    projects: [],
    contexts: [],
    topActions: {
      left: {},
      middle: {},
      right: {}
    },
    // login: null,
    login: {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1pc3RrYWZrYSIsImlkIjoiNThkNDI2NTVjNjk2YzkxODA3MDM3MTJhIiwiaWF0IjoxNDkwNTQwMjM3fQ.srVasQTEZ1vdfleX6OcL17-MsO7gHuqZK2F2XGbyNIk',
      username: 'mistkafka'
    },
    API: 'http://127.0.0.1:3000/api',
    loading: false,
    editMode: false
  },

  getters: {
    activeAction: (state) => {
      let rslt = null

      if (state['active/actionid']) {
        rslt = state.actions.find(_ => _._id === state['active/actionid'])
      } else {
        rslt = state['new/action']
      }

      return rslt
    },
    activeProject: (state) => {
      let rslt = null

      if (state['active/projectid']) {
        rslt = state.projects.find(_ => _._id === state['active/projectid'])
      } else {
        rslt = state['new/project']
      }

      return rslt
    },
    activeContext: (state) => {
      let rslt = null

      if (state['active/contextid']) {
        rslt = state.contexts.find(_ => _._id === state['active/contextid'])
      } else {
        rslt = state['new/context']
      }

      return rslt
    },
    projectMap: ({projects}) => projects.reduce((map, _) => map.set(_._id, _), new Map()),
    contextMap: ({contexts}) => contexts.reduce((map, _) => map.set(_._id, _), new Map()),
    actionMap: ({actions}) => actions.reduce((map, _) => map.set(_._id, _), new Map()),
    inbox: ({actions}) => actions.filter((_) => !_.project),
    projectActions: ({actions}) => (id) => actions.filter((_) => _.project === id),
    contextActions: ({actions}) => (id) => actions.filter((_) => _.context === id)
  },
  mutations: {
    registerTopActions (state, actions) {
      state.topActions = actions
    },
    PUSH_NEW_INS_TO_MODEL (state, ins) {
      state[`new/${ins.model}`] = Object.assign({}, modelTpl[ins.model])
      state[ins.model + 's'].push(ins)
    },
    SET_ACTIVE_ID: (state, { type, id }) => {
      state[`active/${type}id`] = id
    },
    SET_LOGIN: (state, login) => {
      state.login = login
    },
    SET_ACTIONS: (state, actions) => {
      actions = actions.map(_ => {
        _.dueDate = dateFormat(new Date(_.dueDate), 'YYYY-MM-DD HH:mm:ss')
        return _
      })
      state.actions = actions
    },
    SET_PROJECTS: (state, projects) => {
      projects = projects.map(_ => {
        _.dueDate = dateFormat(new Date(_.dueDate), 'YYYY-MM-DD HH:mm:ss')
        return _
      })
      state.projects = projects
    },
    SET_CONTEXTS: (state, contexts) => {
      state.contexts = contexts
    },
    SET_LOADING: (state, loading) => {
      state.loading = loading
    },
    SET_EDIT_MODE: (state, editMode) => {
      state.editMode = editMode
    }
  },
  actions: {
    LOAD: async ({commit, state, dispatch}) => {
      commit('SET_LOADING', true)
      await Promise.all([
        dispatch('LOAD_ACTIONS'),
        dispatch('LOAD_PROJECTS'),
        dispatch('LOAD_CONTEXTS')
      ])
      commit('SET_LOADING', false)
    },
    LOAD_ACTIONS: getLoadInses('action'),
    LOAD_PROJECTS: getLoadInses('project'),
    LOAD_CONTEXTS: getLoadInses('context'),
    SAVE: async ({commit, state}, ins) => {
      let {data: savedIns} = await request({
        url: `${state.API}/${ins.model}s`,
        method: 'post',
        data: ins,
        headers: {Authorization: `Bearer ${state.login.token}`}
      })
      savedIns.model = ins.model
      commit('PUSH_NEW_INS_TO_MODEL', savedIns)
    },
    UPDATE_MODEL: async ({state, getters}, model) => {
      let ins = getters[`active${model.replace(/\w/, ch => ch.toUpperCase())}`]
      await request({
        url: `${state.API}/${model}s/${ins._id}`,
        method: 'put',
        data: ins,
        headers: {Authorization: `Bearer ${state.login.token}`}
      })
    }
  }
})

function getLoadInses (model) {
  return async ({commit, state}) => {
    let {data: inses} = await request.get(`${state.API}/${model}s`, {
      headers: {Authorization: `Bearer ${state.login.token}`}
    })

    commit(`SET_${model.toUpperCase()}S`, inses)
  }
}

Vue.use(vuexI18n.plugin, store)

export default store

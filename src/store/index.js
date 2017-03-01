import Vue from 'vue'
import Vuex from 'vuex'
import * as helper from './helper'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    actions: [],
    projects: [],
    contexts: [],
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
    inbox: ({actions}) => actions.filter((_) => !_.project),
    projectActions: ({actions}) => (id) => actions.filter((_) => _.project === id)
  },
  mutations: {
    registerTopActions (state, actions) {
      state.topActions = actions
    },
    saveAction ({actions}, action) {
      if (!action.id) {
        action.id = helper.generateUUID()
      }
      actions.push(action)
      helper.saveToLocal('actions', actions)
    },
    saveProject ({projects}, project) {
      if (!project.id) {
        project.id = helper.generateUUID()
      }
      projects.push(project)
      helper.saveToLocal('projects', projects)
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

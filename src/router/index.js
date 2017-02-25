import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import WelcomeView from '../views/WelcomeView'
import ActionItem from '../components/ActionItem'
import InboxView from '../components/Inbox'

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', component: WelcomeView },
    { path: '/inbox', component: InboxView },
    { path: '/action', component: ActionItem }
  ]
})

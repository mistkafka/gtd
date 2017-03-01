import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import WelcomeView from '../views/WelcomeView'
import ActionItem from '../components/ActionItem'
import InboxView from '../components/Inbox'
import Projects from '../components/Projects'
import Project from '../components/ProjectItem'
import ProjectActionList from '../components/ProjectActionList'

export default new Router({
  mode: 'history',
  routes: [
    { name: 'home', path: '/', component: WelcomeView },
    { path: '/inbox', component: InboxView },
    { name: '+action', path: '/action/new', component: ActionItem },
    { path: '/action/:id', component: ActionItem },
    { path: '/projects', component: Projects },
    { path: '/project/:id', component: Project },
    { name: '+project', path: '/project/new', component: Project },
    { path: '/project/:id/list', component: ProjectActionList }
  ]
})

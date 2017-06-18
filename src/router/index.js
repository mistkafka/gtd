import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import WelcomeView from '../views/WelcomeView'
import ActionItem from '../components/ActionItem'
import InboxView from '../components/Inbox'
import Projects from '../components/Projects'
import Project from '../components/ProjectItem'
import ProjectActionList from '../components/ProjectActionList'
import SettingsView from '../views/SettingsView'
import Contexts from '../components/Contexts'
import Context from '../components/ContextItem'
import ContextActionList from '../components/ContextActionList'
import ReviewView from '../views/ReviewView'
import CalendarView from '../views/CalendarView'
import ReviewProjects from '../components/ReviewProjects'

export default new Router({
  mode: 'history',
  routes: [
    { name: 'home', path: '/', component: WelcomeView },
    { path: '/inbox', component: InboxView },
    { name: '+action', path: '/action/new', component: ActionItem },
    { path: '/action/:id', component: ActionItem },
    { path: '/projects', component: Projects },
    { name: '+project', path: '/project/new', component: Project },
    { path: '/project/:id', component: Project },
    { path: '/project/:id/list', component: ProjectActionList },
    { path: '/settings', component: SettingsView },
    { path: '/contexts', component: Contexts },
    { name: '+context', path: '/context/new', component: Context },
    { path: '/context/:id', component: Context },
    { path: '/context/:id/list', component: ContextActionList },
    { path: '/review', component: ReviewView },
    { path: '/review/:type', component: ReviewProjects },
    { path: '/calendar', component: CalendarView },
  ]
})

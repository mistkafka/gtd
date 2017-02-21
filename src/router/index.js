import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import WelcomeView from '../views/WelcomeView'

export default new Router({
  routes: [
    { path: '/', component: WelcomeView }
  ]
})

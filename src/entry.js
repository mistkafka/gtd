// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import { AlertPlugin } from 'vux'

import 'vue-event-calendar/dist/style.css'
import vueEventCalendar from '../calendar/src/'
Vue.use(vueEventCalendar, {locale: 'en'})

import AMap from 'vue-amap'
Vue.use(AMap)
AMap.initAMapApiLoader({
  key: '13a00dc5f1ad121758c191b6f93cf0ba',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor']
})

Vue.use(AlertPlugin)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  async beforeCreate () {
    let savedLogin = window.localStorage.getItem('login')
    if (savedLogin) {
      savedLogin = savedLogin ? JSON.parse(savedLogin) : null
      this.$store.commit('SET_LOGIN', savedLogin)
    }

    if (this.$store.state.login) {
      await this.$store.dispatch('LOAD')
    }
  }
})

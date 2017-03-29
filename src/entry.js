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

Vue.use(AlertPlugin)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  beforeCreate () {
    if (this.$store.state.login) {
      this.$store.dispatch('LOAD')
    }
  }
})

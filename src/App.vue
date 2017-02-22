<template>
  <div id="app">
    <top-action-bar />
    <transition name="fade" mode="out-in">
      <main>
        <router-view></router-view>
      </main>
    </transition>
    <nav class="bottom-nav">
      <router-link to="/">Home</router-link>
      <router-link to="/inbox">Inbox</router-link>
      <router-link to="/projects">Projects</router-link>
      <router-link to="/contexts">Contexts</router-link>
      <router-link to="/agenda">Agenda</router-link>
      <router-link to="/action">New Inbox</router-link>
    </nav>
  </div>
</template>

<script>

import TopActionBar from 'views/TopActionBarView'

export default {
  name: 'app',
  components: {
    TopActionBar
  }
}
</script>

<style lang="sass">
*
  padding: 0
  margin: 0

.fade-enter-active, .fade-leave-active
  transition all .2s ease

.fade-enter, .fade-leave-active
  opacity 0

.top-action-bar
  position: fixed
  top: 0
  left: 0
  right: 0
  height: 2rem

  display: flex
  justify-content: space-between
  align-item: stretch
  border-bottom: 1px solid black

main
  margin: 2rem auto

.bottom-nav
  position: fixed
  bottom: 0
  left: 0
  right: 0
  height: 2rem

  display: flex
  justify-content: space-between
  align-item: stretch
  border-top: 1px solid black
</style>

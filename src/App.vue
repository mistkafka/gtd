<template>
  <div id="app">
    <h1>{{ fullname }}</h1>
    <h3>{{ msg }}</h3>
    <router-view></router-view>
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'app',
  data () {
    return {
      fn: 'mist',
      ln: 'kafka'
    }
  },
  computed: {
    fullname () {
      return this.fn + this.ln
    },
    ...mapState({
      msg: 'test'
    })
  }
}
</script>

<style lang="sass">
*
  padding: 0
  margin: 0
</style>

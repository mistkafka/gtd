<template>
  <nav class="top-action-bar">
    <a href="#" v-for="which in ['left', 'middle', 'right']" v-if="topActions[which]" @click.prevent="action(which)">{{ topActions[which].title }}</a>
  </nav>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'TopActionBar',
  computed: {
    ...mapState({
      topActions: 'topActions'
    })
  },
  methods: {
    action (which) {
      let action = this.topActions[which].action
      if (typeof action === 'function') {
        action()
      }
    }
  }
}
</script>

<style lang="sass">
</style>

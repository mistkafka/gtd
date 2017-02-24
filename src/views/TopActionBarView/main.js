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

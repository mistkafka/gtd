import { mapState } from 'vuex'
import { XHeader } from 'vux'


export default {
  name: 'TopActionBar',
  components: {
    XHeader
  },
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

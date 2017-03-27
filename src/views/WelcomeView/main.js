import { mapMutations } from 'vuex'
import { Cell, Group } from 'vux'

export default {
  name: 'WelcomeView',
  components: {
    Cell,
    Group
  },
  data () {
    return {
      links: ['inbox', 'projects']
    }
  },
  methods: {
    registerAction () {
      let actions = {
        left: { showBack: false },
        middle: { title: 'Home', action: null },
        right: { title: 'Settings', action: this.toSettings }
      }

      this.registerTopActions(actions)
    },
    ...mapMutations(['registerTopActions']),
    toSettings () {
      this.$router.push('/settings')
    }
  },

  // hooks
  beforeMount () {
    if (!this.$store.state.login) {
      this.$router.push('/settings')
    }
    this.registerAction()
  }
}

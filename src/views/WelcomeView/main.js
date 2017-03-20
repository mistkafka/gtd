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
        right: { title: '', action: this.toSettings }
      }

      this.registerTopActions(actions)
    },
    ...mapMutations(['registerTopActions']),
    sync () {
      console.log('TODO: sync')
    },
    toSettings () {
      console.log('TODO: setttings')
    }
  },

  // hooks
  beforeMount () {
    this.registerAction()
  }
}

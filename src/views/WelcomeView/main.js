import { mapMutations } from 'vuex'

export default {
  name: 'WelcomeView',
  data () {
    return {
      links: ['inbox', 'projects', 'contenxts', 'agenda']
    }
  },
  methods: {
    registerAction () {
      let actions = {
        left: { title: 'Sync', action: this.sync },
        middle: { title: '', action: null },
        right: { title: 'Settings', action: this.toSettings }
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

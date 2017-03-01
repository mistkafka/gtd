import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Inbox',
  computed: {
    ...mapGetters({
      inbox: 'inbox'
    })
  },
  methods: {
    registerAction () {
      let actions = {
        left: { title: 'Home', action: this.toHome },
        middle: { title: 'Inbox', action: null },
        right: { title: '', action: null }
      }
      this.registerTopActions(actions)
    },
    ...mapMutations(['registerTopActions']),
    toHome () {
      this.$router.push('/')
    }
  },
  beforeMount () {
    this.registerAction()
  }
}

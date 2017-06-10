import { mapGetters, mapMutations } from 'vuex'
import { Cell, Group } from 'vux'

export default {
  name: 'Inbox',
  components: {
    Cell,
    Group
  },
  computed: {
    ...mapGetters({
      inbox: 'inbox'
    })
  },
  methods: {
    registerAction () {
      let actions = {
        left: { backText: 'Home', action: this.toHome },
        middle: { title: 'Inbox', action: null },
        right: { title: 'New', action: this.toNewAction }
      }
      this.registerTopActions(actions)
    },
    ...mapMutations(['registerTopActions']),
    toHome () {
      this.$router.push('/')
    },
    toNewAction () {
      this.$router.push('/action/new')
    },
    // cover like 'Hold On' --> 'action-hold-on'
    getStatusColorClass (status) {
      return 'action-' + status.toLowerCase().split(' ').join('-');
    }
  },
  beforeMount () {
    this.registerAction()
  }
}

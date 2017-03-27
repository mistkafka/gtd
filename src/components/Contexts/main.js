import { mapState, mapMutations } from 'vuex'
import { Cell, Group } from 'vux'

export default {
  name: 'Contexts',
  components: {
    Cell,
    Group
  },
  computed: {
    ...mapState({
      contexts: 'contexts'
    })
  },
  methods: {
    registerAction () {
      let actions = {
        left: { backText: 'Home', action: this.toHome },
        middle: { title: 'Contexts', action: null },
        right: { title: 'New', action: this.toNewContext }
      }

      this.registerTopActions(actions)
    },
    ...mapMutations(['registerTopActions']),
    toHome () {
      this.$router.push('/')
    },
    toNewContext () {
      this.$router.push('/context/new')
    }
  },
  beforeMount () {
    this.registerAction()
  }
}

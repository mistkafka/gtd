import { mapMutations } from 'vuex'
import { Cell, Group } from 'vux'

export default {
  name: 'ReviewView',
  components: {
    Cell,
    Group
  },
  methods: {
    registerAction () {
      let actions = {
        left: { backText: 'Home', action: this.toHome },
        middle: { title: 'Review', action: null },
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

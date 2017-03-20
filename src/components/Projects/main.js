import { mapState, mapMutations } from 'vuex'
import { Cell, Group } from 'vux'

export default {
  name: 'Projects',
  components: {
    Cell,
    Group
  },
  computed: {
    ...mapState({
      projects: 'projects'
    })
  },
  methods: {
    registerAction () {
      let actions = {
        left: { backText: 'Home', action: this.toHome },
        middle: { title: 'Projects', action: null },
        right: { title: 'New', action: this.toNewProject }
      }

      this.registerTopActions(actions)
    },
    ...mapMutations(['registerTopActions']),
    toHome () {
      this.$router.push('/')
    },
    toNewProject () {
      this.$router.push('/project/new')
    }
  },
  beforeMount () {
    this.registerAction()
  }
}

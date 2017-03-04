import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'ProjectActionList',
  data () {
    return {
      id: this.$route.params.id
    }
  },
  computed: {
    ...mapGetters({
      projectActions: 'projectActions'
    })
  },
  methods: {
    ...mapMutations({
      'registerTopActions': 'registerTopActions'
    }),
    toProjects () {
      this.$router.push('/projects')
    },
    editList () {
      console.log('TODO: editList')
    },
    registerAction () {
      let actions = {
        left: {title: 'Projects', action: this.toProjects},
        middle: {title: '', action: null},
        right: {title: 'Edit', action: this.editList}
      }

      this.registerTopActions(actions)
    }
  },
  watch: {
    '$route': function(to, from) {
      this.id = from.params.id
    }
  },
  beforeMount () {
    this.registerAction()
  }
}

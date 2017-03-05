import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'ProjectActionList',
  data () {
    return {
      loading: true,
      project: {}
    }
  },
  computed: {
    ...mapGetters({
      projectActions: 'projectActions',
      projectMap: 'projectMap'
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
    },
    startCycle (id) {
      this.load(id)
      this.registerAction()
    },
    load (id) {
      this.loading = true
      let project = {};
      if (id) {
        project = this.projectMap.get(id)
      } else {
        project = Object.assign({}, this.projectTpl)
      }
      this.project = project

      this.loading = false
    },
  },
  watch: {
    '$route': function(to, from) {
      this.startCycle(to.params.id)
    }
  },
  beforeMount () {
    this.startCycle(this.$route.params.id)
  }
}

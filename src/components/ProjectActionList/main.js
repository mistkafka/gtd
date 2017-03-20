import { mapState, mapGetters, mapMutations } from 'vuex'
import { Cell, Group } from 'vux'

export default {
  name: 'ProjectActionList',
  components: {
    Cell,
    Group
  },
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
        left: {backText: 'Projects', action: this.toProjects},
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

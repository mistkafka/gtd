import { mapGetters, mapMutations } from 'vuex'

const MODEL_NAME = 'projects'

export default {
  name: 'ProjectItem',
  data () {
    const projectTpl = {
      model: MODEL_NAME,
      title: '',
      note: '',
      status: 'Active',
      context: '',
      dueDate: '',
      logs: [],
      id: ''
    }
    return {
      loading: true,
      projectTpl,
      project: Object.assign({}, projectTpl),
      projectStatus: ['Active', 'On Hold', 'Completed', 'Dropped']
    }
  },
  watch: {
    '$route' (to, from) {
      this.startCycle(to.params.id)
    }
  },
  computed: {
    editMode () {
      return !!this.project.id
    },
    ...mapGetters({
      projectMap: 'projectMap'
    })
  },
  methods: {
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
      this.project = Object.assign({}, project)

      this.loading = false
    },
    registerAction () {
      let actions = {}
      if (this.editMode) {
        actions = {
          left: { title: 'Back', action: this.back },
          middle: { title: 'Project', action: null },
          right: { title: '', action: null }
        }
      } else {
        actions = {
          left: { title: 'Cancel', action: this.cancle },
          middle: { title: 'New Project', action: null },
          right: { title: 'Save', action: this.save }
        }
      }

      this.registerTopActions(actions)
    },
    save () {
      this.$store.commit('save', this.project)
      this.project = Object.assign({}, this.projectTpl)
      this.$router.go(-1)
    },
    cancle () {
      this.project = Object.assign({}, this.projectTpl)
      this.$router.go(-1)
    },
    back () {
      this.$router.go(-1)
    },
    ...mapMutations(['registerTopActions'])
  },

  // hooks
  beforeMount () {
    this.startCycle(this.$route.params.id)
  }
}

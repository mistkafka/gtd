import { mapGetters, mapMutations } from 'vuex'
import {
  Group,
  XInput,
  Selector,
  Datetime,
  XTextarea
} from 'vux'


export default {
  name: 'ProjectItem',

  components: {
    Group,
    XInput,
    Selector,
    Datetime,
    XTextarea
  },

  data () {
    return {
      loading: true,
      projectStatuses: ['Active', 'On Hold', 'Completed', 'Dropped']
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
      projectMap: 'projectMap',
      project: 'activeProject'
    })
  },
  methods: {
    startCycle (id) {
      this.load(id)
      this.registerAction()
    },
    load (id) {
      this.loading = true
      this.SET_ACTIVE_ID({ type: 'project', id: id })
      this.loading = false
    },
    registerAction () {
      let actions = {}
      if (this.editMode) {
        actions = {
          left: { backText: 'Back', action: this.back },
          middle: { title: 'Project', action: null },
          right: { title: '', action: null }
        }
      } else {
        actions = {
          left: { backText: 'Cancel'},
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
    ...mapMutations(
      [
        'registerTopActions',
        'SET_ACTIVE_ID'
      ]
    ),
  },

  // hooks
  beforeMount () {
    this.startCycle(this.$route.params.id)
  }
}

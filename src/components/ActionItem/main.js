import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'ActionItem',
  data () {
    const actionTpl = {
      title: '',
      project: '',
      context: '',
      dueDate: '',
      repeat: ''
    }
    return {
      loading: true,
      actionTpl,
      action: Object.assign({}, actionTpl)
    }
  },
  watch: {
    '$route' (to, from) {
      this.startCycle(to.params.id)
    }
  },
  computed: {
    editMode () {
      return !!this.action.id
    },
    ...mapState({
      projects: 'projects',
      contexts: 'contexts'
    }),
    ...mapGetters({
      actionMap: 'actionMap'
    })
  },
  methods: {
    startCycle (id) {
      this.load(id)
      this.registerAction()
    },
    load (id) {
      this.loading = true
      let action = {};
      if (id) {
        action = this.actionMap.get(id)
      } else {
        action = Object.assign({}, this.actionTpl)
      }
      this.action = Object.assign({}, action)

      this.loading = false
    },
    registerAction () {
      let actions = {}
      if (this.editMode) {
        actions = {
          left: { title: 'Back', action: this.back },
          middle: { title: 'Action', action: null },
          right: { title: '', action: null }
        }
      } else {
        actions = {
          left: { title: 'Cancel', action: this.cancle },
          middle: { title: 'Save+', action: this.saveAndNew },
          right: { title: 'Save', action: this.save }
        }
      }

      this.registerTopActions(actions)
    },
    save () {
      this.$store.commit('saveAction', this.action)
      this.action = Object.assign({}, this.actionTpl)
      this.$router.go(-1)
    },
    back () {
      this.$router.go(-1)
    },
    saveAndNew () {
      this.$store.commit('saveAction', this.action)
      this.action = Object.assign({}, this.actionTpl)
    },
    cancle () {
      this.action = Object.assign({}, this.actionTpl)
      this.$router.go(-1)
    },
    ...mapMutations(['registerTopActions'])
  },

  // hooks
  beforeMount () {
    this.startCycle(this.$route.params.id)
  }
}

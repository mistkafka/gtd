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
      this.getData(to.params.id)
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
    getData (id) {
      this.loading = true
      let action = {};
      if (id) {
        action = this.actionMap.get(Number(id))
      } else {
        action = Object.assign({}, this.actionTpl)
      }
      this.action = Object.assign({}, action)

      this.loading = false
    },
    getSave () {
      let me = this
      return () => {
        me.$store.commit('saveAction', me.action)
        me.action = Object.assign({}, me.actionTpl)
        me.$router.go(-1)
      }
    },
    getSaveAndNew () {
      let me = this
      return () => {
        me.$store.commit('saveAction', me.action)
        me.action = Object.assign({}, me.actionTpl)
      }
    },
    getCancel () {
      let me = this
      return () => {
        me.action = Object.assign({}, me.actionTpl)
        me.$router.go(-1)
      }
    },
    ...mapMutations(['registerTopActions'])
  },

  // hooks
  beforeMount () {
    this.getData(this.$route.params.id)
  },
  mounted () {
    let actions = {
      left: { title: 'Cancel', action: this.getCancel() },
      middle: { title: 'Save+', action: this.getSaveAndNew() },
      right: { title: 'Save', action: this.getSave() }
    }
    if (!this.editMode) {
      this.registerTopActions(actions)
    }
  }
}

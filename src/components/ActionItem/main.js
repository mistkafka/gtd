import { mapState, mapMutations } from 'vuex'
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
      actionTpl,
      action: Object.assign({}, actionTpl)
    }
  },
  computed: {
    ...mapState({
      projects: 'projects',
      contexts: 'contexts'
    })
  },
  methods: {
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
  mounted () {
    let actions = {
      left: { title: 'Cancel', action: this.getCancel() },
      middle: { title: 'Save+', action: this.getSaveAndNew() },
      right: { title: 'Save', action: this.getSave() }
    }
    this.registerTopActions(actions)
  }
}

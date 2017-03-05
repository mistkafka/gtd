import { mapState, mapGetters, mapMutations } from 'vuex'

const targetHelpTextMap = {
  'Times': 'how many times?',
  'Accumulate': 'accumulate how much?',
  'Store': 'store how much?'
}

const MODEL_NAME = 'actions'

export default {
  name: 'ActionItem',
  data () {
    const actionTpl = {
      model: MODEL_NAME,
      title: '',
      note: '',
      project: '',
      type: 'Todo/Done',
      context: '',
      dueDate: '',
      repeat: '',
      target: '',
      count: [],
      schedules: [],
      logs: [],

      addedDate: '',
      lastUpdateDate: ''
    }
    return {
      loading: true,
      actionTpl,
      action: Object.assign({}, actionTpl),
      actionTypes: ['Todo/Done', 'Times', 'Accumulate', 'Store']
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
    targetHelpText () {
      return targetHelpTextMap[this.action.type];
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
      this.action = action

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
      this.$store.commit('save', this.action)
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

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
      target: 1,
      processItems: [],
      schedules: [],
      completed: false
    }
    return {
      loading: true,
      actionTpl,
      action: Object.assign({}, actionTpl),
      actionTypes: ['Todo/Done', 'Times', 'Accumulate', 'Store'],
      noncountableLikeItemValue: ''
    }
  },
  watch: {
    '$route' (to, from) {
      this.startCycle(to.params.id)
    },
    'action.type' (to, from) {
      if (to === 'Todo/Done') {
        this.action.target = 1
      } else {
        this.action.target = 0
      }
    }
  },
  computed: {
    ...mapState({
      projects: 'projects',
      contexts: 'contexts'
    }),
    ...mapGetters({
      actionMap: 'actionMap'
    }),
    editMode () {
      return !!this.action.id
    },
    targetHelpText () {
      return targetHelpTextMap[this.action.type];
    },
    done: {
      get () {
        let processItems = this.action.processItems
        if (!processItems.length) {
          return false
        }
        return processItems[processItems.length - 1].done
      },
      set (val) {
        let processItems = this.action.processItems
        let item = {
          done: true,
          date: new Date(),
          log: ''         // TODO:
        }
        if (this.done) {
          item.done = false
        }

        processItems.push(item)
      }
    },
    timesProcess () {
      return `${this.action.processItems.length}/${this.action.target}`
    },
    timesDone () {
      return this.action.processItems.length >= this.action.target;
    },
    noncountableLikeProcess () {
      let sum = this.action.processItems.reduce((sum, item) => {
        sum += item.value
        return sum
      }, 0)

      return `${sum}/${this.action.target }`
    },
    noncountableLikeDone () {
      let sum = this.action.processItems.reduce((sum, item) => {
        sum += item.value
        return sum
      }, 0)

      return sum >= this.action.target
    },
    actionDone () {
      let rslt = false
      switch (this.action.type) {
        case 'Todo/Done':
          rslt = this.done
          break
        case 'Times':
          rslt = this.timesDone
          break
        default:
          rslt = this.noncountableLikeDone
      }

      this.action.completed = rslt

      return rslt
    }
  },
  methods: {
    ...mapMutations(['registerTopActions']),
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
    addTimes () {
      let item = {
        date: new Date(),
        log: '' // TODO
      }
      this.action.processItems.push(item)
    },
    addNoncountableLikeItem () {
      let item = {
        value: this.noncountableLikeItemValue,
        date: new Date(),
        log: ''
      }
      this.action.processItems.push(item)

      this.noncountableLikeItemValue = ''
    }
  },

  // hooks
  beforeMount () {
    this.startCycle(this.$route.params.id)
  }
}

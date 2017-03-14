import { mapState, mapGetters, mapMutations } from 'vuex'
import {
  Group,
  XInput,
  XButton,
  XTextarea,
  XNumber,
  XCircle,
  XDialog,
  Checker,
  Selector,
  Datetime,
  Tab,
  TabItem,
  Swiper,
  SwiperItem,
  Divider,
  Flexbox,
  FlexboxItem
} from 'vux'

const targetHelpTextMap = {
  'Times': 'how many times?',
  'Accumulate': 'accumulate how much?',
  'Store': 'store how much?'
}

const MODEL_NAME = 'actions'

export default {
  name: 'ActionItem',
  components: {
    Group,
    XInput,
    XTextarea,
    XNumber,
    XButton,
    XCircle,
    XDialog,
    Checker,
    Selector,
    Datetime,
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    Divider,
    Flexbox,
    FlexboxItem
  },
  data () {
    const actionTpl = {
      model: MODEL_NAME,
      title: '',
      description: '',
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
      noncountableLikeItemValue: 0,
      log: '',
      tabSelected: 0,
      dialogShow: false
    }
  },
  watch: {
    '$route' (to, from) {
      this.startCycle(to.params.id)
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
    projectsOpt () {
      let opt = [{key: '', value: 'None'}]

      this.projects.forEach((_) => opt.push({key: _.id, value: _.title}))

      return opt
    },
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
    target: {
      get () {
        return this.action.target
      },
      set (to, from) {
        this.action.target = Number(to)
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

      let rslt = Number.parseInt(sum / this.action.target * 100);
      return rslt;
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
          left: { backText: 'Back', action: this.back },
          middle: { title: 'Action', action: null },
          right: { title: '', action: null }
        }
      } else {
        actions = {
          left: { backText: 'Cancel', action: this.cancle },
          middle: { title: 'New Action'},
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
        value: Number(this.noncountableLikeItemValue),
        date: new Date(),
        log: this.log
      }
      this.action.processItems.push(item)

      this.noncountableLikeItemValue = 0
      this.log = ''
      this.dialogShow = false
    },
    decreaseStore () {
      this.dialogShow = true;
    },
    increaseStore () {
      this.dialogShow = true;
    }
  },

  // hooks
  beforeMount () {
    this.startCycle(this.$route.params.id)
  }
}

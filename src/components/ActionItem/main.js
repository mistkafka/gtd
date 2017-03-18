import { mapState, mapGetters, mapMutations } from 'vuex'
import {
  Group,
  XInput,
  XTextarea,
  XDialog,
  XButton,
  Tab,
  TabItem
} from 'vux'

import ActionProcess from './Process'
import ActionInfo from './Info'
import ActionDescription from './Description'

export default {
  name: 'ActionItem',
  components: {
    Group,
    XInput,
    XTextarea,
    XDialog,
    XButton,
    Tab,
    TabItem,

    ActionProcess,
    ActionInfo,
    ActionDescription
  },
  data () {
    return {
      loading: true,
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
    ...mapGetters({
      action: 'activeAction'
    }),
    editMode () {
      return !!this.action.id
    },
    noncountableLikeItemPlacheholder () {
      if (this.action.type === 'Accumulate') {
        return 'positive only. ex: 128.20'
      } else if (this.action.type === 'Store') {
        return 'allow negative. ex: -128.20'
      }
    }
  },
  methods: {
    ...mapMutations(
      [
        'registerTopActions',
        'SET_ACTIVE_ID'
      ]
    ),
    startCycle (id) {
      this.load(id)
      this.registerAction()
    },
    load (id) {
      this.loading = true
      this.SET_ACTIVE_ID({ id: id, type: 'action'})
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
      this.$router.go(-1)
    },
    back () {
      this.$router.go(-1)
    },
    cancle () {
      this.action = Object.assign({}, this.actionTpl)
      this.$router.go(-1)
    },
    addTimes () {
      let item = {
        date: (new Date()).toString(),
        log: '' // TODO
      }
      this.action.processItems.push(item)
    },
    addNoncountableLikeItem () {
      if (!this.validateNoncountableLikeItemValue().valid) {
        return
      }

      let item = {
        value: Number(this.noncountableLikeItemValue),
        date: (new Date()).toString(),
        log: this.log
      }
      this.action.processItems.push(item)

      this.noncountableLikeItemValue = 0
      this.log = ''
      this.dialogShow = false
    },
    validateNoncountableLikeItemValue () {
      if (!this.noncountableLikeItemValue) {
        return {
          valid: false,
          msg: 'Required'
        }
      }

      if (this.action.type === 'Accumulate' && this.noncountableLikeItemValue < 0) {
        return {
          valid: false,
          msg: 'positive only!'
        }
      }

      return {
        valid: true
      }
    }
  },

  // hooks
  beforeMount () {
    this.startCycle(this.$route.params.id)
  }
}

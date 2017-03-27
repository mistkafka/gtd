import { mapGetters, mapMutations } from 'vuex'
import {
  Group,
  XInput,
  XTextarea
} from 'vux'


export default {
  name: 'ContextItem',

  components: {
    Group,
    XInput,
    XTextarea
  },

  data () {
    return {
      loading: true
    }
  },
  watch: {
    '$route' (to, from) {
      this.startCycle(to.params.id)
    }
  },
  computed: {
    editMode () {
      return !!this.context.id
    },
    ...mapGetters({
      contextMap: 'contextMap',
      context: 'activeContext'
    })
  },
  methods: {
    startCycle (id) {
      this.load(id)
      this.registerAction()
    },
    load (id) {
      this.loading = true
      this.SET_ACTIVE_ID({ type: 'context', id: id })
      this.loading = false
    },
    registerAction () {
      let actions = {}
      if (this.editMode) {
        actions = {
          left: { backText: 'Back', action: this.back },
          middle: { title: 'Context', action: null },
          right: { title: '', action: null }
        }
      } else {
        actions = {
          left: { backText: 'Cancel'},
          middle: { title: 'New Context', action: null },
          right: { title: 'Save', action: this.save }
        }
      }

      this.registerTopActions(actions)
    },
    async save () {
      await this.$store.dispatch('SAVE', this.context)
      this.$router.go(-1)
    },
    cancle () {
      this.context = Object.assign({}, this.contextTpl)
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

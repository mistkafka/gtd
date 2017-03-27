import { mapState, mapGetters, mapMutations } from 'vuex'
import { Cell, Group } from 'vux'

export default {
  name: 'ContextActionList',
  components: {
    Cell,
    Group
  },
  data () {
    return {
      loading: true,
      context: {}
    }
  },
  computed: {
    ...mapGetters({
      contextActions: 'contextActions',
      contextMap: 'contextMap'
    })
  },
  methods: {
    ...mapMutations({
      'registerTopActions': 'registerTopActions'
    }),
    toContexts () {
      this.$router.push('/contexts')
    },
    editList () {
      console.log('TODO: editList')
    },
    registerAction () {
      let actions = {
        left: {backText: 'Contexts', action: this.toContexts},
        middle: {title: '', action: null},
        right: {title: 'Edit', action: this.editList}
      }

      this.registerTopActions(actions)
    },
    startCycle (id) {
      this.load(id)
      this.registerAction()
    },
    load (id) {
      this.loading = true
      let context = {};
      if (id) {
        context = this.contextMap.get(id)
      } else {
        context = Object.assign({}, this.contextTpl)
      }
      this.context = context

      this.loading = false
    },
  },
  watch: {
    '$route': function(to, from) {
      this.startCycle(to.params.id)
    }
  },
  beforeMount () {
    this.startCycle(this.$route.params.id)
  }
}

import { mapGetters, mapMutations } from 'vuex'
import {
  Group,
  XInput,
  XTextarea,
  Cell
} from 'vux'
import AMap from '../../components/Map'


export default {
  name: 'ContextItem',

  components: {
    Group,
    XInput,
    XTextarea,
    Cell,

    AMap
  },

  data () {
    return {
      loading: true,
    }
  },
  watch: {
    '$route' (to, from) {
      this.startCycle(to.params.id)
    }
  },
  computed: {
    editMode () {
      return !!this.context._id
    },
    ...mapGetters({
      contextMap: 'contextMap',
      context: 'activeContext'
    }),
    location () {
      return this.context.location ? this.context.location.join(',') : ''
    }
  },
  methods: {
    startCycle (id) {
      this.$store.commit('SET_EDIT_MODE', id ? true : false)
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
    async editedLocation (location) {
      this.context.location = location
      await this.$store.dispatch('UPDATE_MODEL', 'context')
    },
    startEditField (field) {
      if (!this.$store.state.editMode) {
        return
      }

      this.editingField = field
      this.editCache = this.context[field]
    },
    async editedField () {
      if (!this.$store.state.editMode) {
        return
      }
      let to = this.context[this.editingField]
      let from = this.editCache
      if (to === from) {
        return
      }

      this.editCache = null
      this.editingField = null

      await this.$store.dispatch('UPDATE_MODEL', 'context')
    },
  },

  // hooks
  beforeMount () {
    this.startCycle(this.$route.params.id)
  }
}

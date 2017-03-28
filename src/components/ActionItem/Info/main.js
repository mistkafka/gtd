import { mapState, mapGetters, mapMutations } from 'vuex'
import {
  Group,
  XInput,
  Selector,
  Datetime
} from 'vux'

export default {
  name: 'ActionInfo',

  data () {
    return {
      actionTypes: ['Todo/Done', 'Times', 'Accumulate', 'Store'],
      statuses: ['Active', 'Completed', 'Hold', 'Dropped']
    }
  },

  components: {
    Group,
    XInput,
    Selector,
    Datetime
  },

  computed: {
    ...mapGetters({
      action: 'activeAction',
      projectMap: 'projectMap',
      contextMap: 'contextMap'
    }),
    ...mapState({
      projects: 'projects',
      contexts: 'contexts'
    }),
    projectsOpt () {
      let opt = [{key: '', value: 'None'}]

      this.projects.forEach((_) => opt.push({key: _._id, value: _.title}))

      return opt
    },
    contextsOpt () {
      let opt = [{key: '', value: 'None'}]

      this.contexts.forEach((_) => opt.push({key: _._id, value: _.title}))

      return opt
    },
    target: {
      get () {
        return this.action.target
      },
      set (to, from) {
        this.action.target = Number(to)
      }
    }
  },

  methods: {
    async editedField (field, to) {
      if (this.action[field] == to) {
        return
      }
      if (!this.$store.state.editMode) {
        return
      }

      this.action.logs.push({
        type: 'field-change',
        filed: field,
        date: new Date(),
        from: this.action[field],
        to: to,
        note: ''
      })

      await this.$store.dispatch('UPDATE_MODEL', 'action')
    },
    async editedProject (to) {
      if (this.action.project == to) {
        return
      }
      if (!this.$store.state.editMode) {
        return
      }

      let from = this.action.project
      from = this.projectMap.has(from) ? this.projectMap[from].title : ''
      to = this.projectMap.has(to) ? this.projectMap.get(to).title : ''

      this.action.logs.push({
        type: 'field-change',
        filed: 'project',
        date: new Date(),
        from,
        to,
        note: ''
      })

      await this.$store.dispatch('UPDATE_MODEL', 'action')
    },
    async editedContext (to) {
      if (this.action.context == to) {
        return
      }
      if (!this.$store.state.editMode) {
        return
      }

      let from = this.action.context
      from = this.contextMap.has(from) ? this.contextMap[from].title : ''
      to = this.contextMap.has(to) ? this.contextMap.get(to).title : ''

      this.action.logs.push({
        type: 'field-change',
        filed: 'context',
        date: new Date(),
        from,
        to,
        note: ''
      })

      await this.$store.dispatch('UPDATE_MODEL', 'action')
    },
    startEditField (field) {
      if (!this.$store.state.editMode) {
        return
      }

      this.editingField = field
      this.editCache = this.action[field]
    },
    async editedInputField () {
      if (!this.$store.state.editMode) {
        return
      }

      this.action.logs.push({
        type: 'field-change',
        field: this.editingField,
        date: new Date(),
        from: this.editCache,
        to: this.action[this.editingField],
        note: ''
      })
      this.editCache = null
      this.editingField = null

      await this.$store.dispatch('UPDATE_MODEL', 'action')
    }
  }
}

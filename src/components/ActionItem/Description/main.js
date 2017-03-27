import { mapState, mapGetters, mapMutations } from 'vuex'

import {
  Group,
  XTextarea
} from 'vux'

export default {
  name: 'ActionDescription',

  components: {
    Group,
    XTextarea
  },

  computed: {
    ...mapGetters({
      action: 'activeAction'
    }),
  },

  methods: {
    startEditField (field) {
      if (!this.$store.state.editMode) {
        return
      }

      this.editingField = field
      this.editCache = this.action[field]
    },
    async editedField () {
      if (!this.$store.state.editMode) {
        return
      }
      let to = this.action[this.editingField]
      let from = this.editCache
      if (to === from) {
        return
      }

      this.action.logs.push({
        type: 'field-change',
        field: this.editingField,
        date: new Date(),
        from,
        to,
        note: ''
      })
      this.editCache = null
      this.editingField = null

      await this.$store.dispatch('UPDATE_MODEL', 'action')
    }
  }
}

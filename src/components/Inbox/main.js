import { mapState, mapGetters } from 'vuex'

export default {
  name: 'ActionItem',
  computed: {
    ...mapGetters({
      inbox: 'inbox'
    })
  }
}

import { mapState, mapGetters } from 'vuex'

export default {
  name: 'ProjectActionList',
  data () {
    return {
      id: this.$route.params.id
    }
  },
  computed: {
    ...mapGetters({
      projectActions: 'projectActions'
    })
  },
  watch: {
    '$route': function(to, from) {
      this.id = from.params.id
    }
  }
}

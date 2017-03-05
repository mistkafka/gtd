import TopActionBar from 'views/TopActionBarView'
import { mapState } from 'vuex'
import { throttleProxy } from '../utils/proxy'

export default {
  name: 'app',
  components: {
    TopActionBar
  },
  computed: {
    ...mapState({
      projects: 'projects',
      actions: 'actions'
    })
  },
  watch: {
    projects: {
      handler: function() {
        this.$store.commit('SAVE_STATE_TO_LOCALSTORAGE', 'projects')
      },
      deep: true
    },
    actions: {
      handler: function() {
        this.$store.commit('SAVE_STATE_TO_LOCALSTORAGE', 'actions')
      },
      deep: true
    }
  }
}

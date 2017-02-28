import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Projects',
  computed: {
    ...mapState({
      projects: 'projects'
    })
  }
}

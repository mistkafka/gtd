import { mapMutations } from 'vuex'
import { Cell, Group } from 'vux'

const TITLE_MAP = {
  'every-day': 'Daily Review',
  'every-week': 'Weekly Review',
  'every-month': 'Monthly Review',
  'every-year': 'Yearly Review'
}

export default {
  name: 'ReviewProjects',
  data () {
    return {
      reviewType: 'every week'
    }
  },
  components: {
    Cell,
    Group
  },
  methods: {
    registerAction () {
      let title = TITLE_MAP[this.$route.params.type]
      let actions = {
        left: { backText: 'Review', action: this.toReview },
        middle: { title, action: null },
        right: { title: '', action: null }
      }

      this.registerTopActions(actions)
    },
    ...mapMutations(['registerTopActions']),
    toReview () {
      this.$router.push('/review')
    }
  },
  watch: {
    '$route' (to, from) {
      this.reviewType = to.params.type.replace('-', ' ')
    }
  },
  beforeMount () {
    this.reviewType = this.$route.params.type.replace('-', ' ')
    this.$store.commit('SET_REVIEW_MODE', null)
    this.registerAction()
  }
}

import { mapMutations, mapState } from 'vuex'
import { Cell, Group } from 'vux'
import moment from 'moment'

export default {
  name: 'CalendarView',
  components: {
    Cell,
    Group
  },
  computed: {
    ...mapState({
      'actions': 'actions'
    }),
    events () {
      return this.actions.filter(_ => _.dueDate).map(_ => {
        let date = moment(_.dueDate).format('YYYY/MM/DD')
        let event = {
          date,
          title: _.title || '',
          desc: _.description || ''
        }

        return event
      })
    }
  },
  methods: {
    registerAction () {
      let actions = {
        left: { backText: 'Home', action: this.toHome },
        middle: { title: 'Calendar', action: null },
        right: { title: '', action: null }
      }

      this.registerTopActions(actions)
    },
    ...mapMutations(['registerTopActions']),
    handleNewEvent (date) {
      this.$router.push(`/action/new?dueDate=${window.encodeURIComponent(date)}`)
    },
    toHome () {
      this.$router.push('/')
    },
  },

  // hooks
  beforeMount () {
    this.registerAction()
  }
}

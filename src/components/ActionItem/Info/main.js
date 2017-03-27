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
      action: 'activeAction'
    }),
    ...mapState({
      projects: 'projects'
    }),
    projectsOpt () {
      let opt = [{key: '', value: 'None'}]

      this.projects.forEach((_) => opt.push({key: _._id, value: _.title}))

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
  }
}

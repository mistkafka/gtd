import { mapState, mapGetters, mapMutations } from 'vuex'
import {
  Group,
  XCircle,
  Divider,
  Timeline,
  TimelineItem,
  dateFormat
} from 'vux'

export default {
  name: 'ActionProcess',

  components: {
    Group,
    XCircle,
    Divider,
    Timeline,
    TimelineItem,
    dateFormat
  },

  computed: {
    ...mapGetters({
      action: 'activeAction'
    }),
    process () {
      switch (this.action.type) {
        case 'Accumulate':
        case 'Store':
          return this.noncountableLikeProcess
        case 'Times':
          return this.processItems.length
      }
    },
    noncountableLikeProcess () {
      let sum = this.action.processItems.reduce((sum, item) => {
        sum += item.value
        return sum
      }, 0)

      return sum;

    },
    noncountableLikeProcessPercent () {
      let rslt = Number.parseInt(this.noncountableLikeProcess / this.action.target * 100);
      return rslt;
    },
    timeline () {
      return this.action.processItems
        .map(_ => {
          _.date = new Date(_.date)
          return _
        })
        .sort((a, b) => a.date < b.date)
        .map(_ => {
          _.date = dateFormat(new Date(_.date), 'YYYY-MM-DD HH:mm:ss')
          return _
        });
    },

    // TODO: 迁移块: start
    done: {
      get () {
        let processItems = this.action.processItems
        if (!processItems.length) {
          return false
        }
        return processItems[processItems.length - 1].done
      },
      set (val) {
        let processItems = this.action.processItems
        let item = {
          done: true,
          date: (new Date()).toString(),
          log: ''         // TODO:
        }
        if (this.done) {
          item.done = false
        }

        processItems.push(item)
      }
    },
    timesProcess () {
      return `${this.action.processItems.length}/${this.action.target}`
    },
    timesDone () {
      return this.action.processItems.length >= this.action.target;
    },
    noncountableLikeDone () {
      // TODO: 迁移到Process里
      // return this.noncountableLikeProcess >= this.action.target
      return true;
    },
    actionDone () {
      let rslt = false
      switch (this.action.type) {
        case 'Todo/Done':
          rslt = this.done
          break
        case 'Times':
          rslt = this.timesDone
          break
        default:
          rslt = this.noncountableLikeDone
      }

      this.action.completed = rslt

      return rslt
    }
    // TODO: 迁移块：end
  },

  methods: {
    decreaseStore () {
      this.$emit('increase')
    },
    increaseStore () {
      this.$emit('increase')
    },
  }
}

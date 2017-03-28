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
  name: 'ActionProgress',

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
    progressItems () {
      return this.action.logs.filter(_ => _.type === 'progress')
    },
    progress () {
      switch (this.action.type) {
        case 'Accumulate':
        case 'Store':
          return this.noncountableLikeProgress
        case 'Times':
          return this.progressItems.length
      }
    },
    noncountableLikeProgress () {
      let sum = this.progressItems.reduce((sum, item) => {
        sum += item.value
        return sum
      }, 0)

      return sum;

    },
    noncountableLikeProgressPercent () {
      let rslt = Number.parseInt(this.noncountableLikeProgress / this.action.target * 100);
      return rslt;
    },
    timeline () {
      return this.progressItems
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
        let progressItems = this.progressItems
        if (!progressItems.length) {
          return false
        }
        return progressItems[progressItems.length - 1].done
      },
      set (val) {
        let progressItems = this.progressItems
        let item = {
          done: true,
          date: (new Date()).toString(),
          log: ''         // TODO:
        }
        if (this.done) {
          item.done = false
        }

        progressItems.push(item)
      }
    },
    timesProgress () {
      return `${this.progressItems.length}/${this.action.target}`
    },
    timesDone () {
      return this.progressItems.length >= this.action.target;
    },
    noncountableLikeDone () {
      // TODO: 迁移到Progress里
      // return this.noncountableLikeProgress >= this.action.target
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

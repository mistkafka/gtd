import { mapState, mapGetters, mapMutations } from 'vuex'
import { Cell, Group, Tabbar, TabbarItem, XDialog, XTextarea, XButton } from 'vux'
import ActionList from '../ActionList'
import moment from 'moment'
import reviewUtils from '../../utils/review'

export default {
  name: 'ProjectActionList',
  components: {
    Cell,
    Group,
    Tabbar,
    TabbarItem,
    XDialog,
    XTextarea,
    XButton,
    ActionList,
  },
  data () {
    return {
      loading: true,
      project: {},
      tabbarSelected: false,
      reviewNote: '',
      reviewDialogShow: false,
      reviewProjects: [],
    }
  },
  computed: {
    ...mapGetters({
      projectActions: 'projectActions',
      projectMap: 'projectMap',
    }),
    reviewIndex: function () {
      let index = this.reviewProjects.map(_ => _._id).indexOf(this.project._id) + 1
      return index
    },
    prevReview: function () {
      let index = Math.max(this.reviewIndex - 2, 0)
      return `/project/${this.reviewProjects[index]._id}/list`
    },
    nextReview: function () {
      let index = Math.min(this.reviewIndex, this.reviewProjects.length - 1)
      return `/project/${this.reviewProjects[index]._id}/list`
    },
    reviewType: function () {
      const TITLE_MAP = {
        'every day': 'Daily Review',
        'every week': 'Weekly Review',
        'every month': 'Monthly Review',
        'every year': 'Yearly Review'
      }

      return TITLE_MAP[this.$store.state.reviewMode]
    },
    reviewDate: function () {
      let type = this.$store.state.reviewMode
      let date = this.$store.state.reviewDeadlineDate[type]
      return moment().format('ll');
    },
    remainings () {
      return this.projectActions(this.project._id).filter(_ => _.status === 'Active').length
    },
    isReviewed () {
      return !reviewUtils.isProjectNeedReview(this.project, this.$store.state.reviewMode)
    }
  },
  methods: {
    ...mapMutations({
      'registerTopActions': 'registerTopActions'
    }),
    toProjects () {
      this.$router.push('/projects')
    },
    editList () {
      console.log('TODO: editList')
    },
    registerAction () {
      let actions = {
        left: {backText: 'Projects', action: this.toProjects},
        middle: {title: '', action: null},
        right: {title: 'Edit', action: this.editList}
      }

      this.registerTopActions(actions)
    },
    startCycle (id) {
      if (this.$store.state.reviewMode) {
        this.reviewProjects = this.$store.getters.needReviewProject(this.$store.state.reviewMode)
      }
      this.load(id)
      this.registerAction()
    },
    load (id) {
      this.loading = true
      let project = {};
      if (id) {
        project = this.projectMap.get(id)
      } else {
        project = Object.assign({}, this.projectTpl)
      }
      this.project = project

      this.loading = false
    },
    async markReviewed () {
      let logType = this.$store.state.reviewMode + ' review'
      this.project.logs.push({
        type: logType,
        note: this.reviewNote,
        date: new Date()
      })
      this.project.reviewEvents.shift()
      this.project.model = 'project'
      await this.$store.dispatch('UPDATE_MODEL', this.project)

      this.reviewDialogShow = false
      this.reviewNote = ''
      this.$router.replace(this.nextReview)
    },
  },
  watch: {
    '$route': function(to, from) {
      this.startCycle(to.params.id)
    }
  },
  beforeMount () {
    this.startCycle(this.$route.params.id)
  }
}

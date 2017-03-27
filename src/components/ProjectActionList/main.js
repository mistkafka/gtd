import { mapState, mapGetters, mapMutations } from 'vuex'
import { Cell, Group, Tabbar, TabbarItem, XDialog, XTextarea, XButton } from 'vux'

export default {
  name: 'ProjectActionList',
  components: {
    Cell,
    Group,
    Tabbar,
    TabbarItem,
    XDialog,
    XTextarea,
    XButton
  },
  data () {
    return {
      loading: true,
      project: {},
      tabbarSelected: false,
      reviewNote: '',
      reviewDialogShow: false
    }
  },
  computed: {
    ...mapGetters({
      projectActions: 'projectActions',
      projectMap: 'projectMap',
      reviews: 'needReviewProject'
    }),
    reviewIndex: function () {
      let index = this.reviews.map(_ => _._id).indexOf(this.project._id) + 1
      return index
    },
    prevReview: function () {
      let index = Math.max(this.reviewIndex - 2, 0)
      return `/project/${this.reviews[index]._id}/list`
    },
    nextReview: function () {
      let index = Math.min(this.reviewIndex, this.reviews.length - 1)
      return `/project/${this.reviews[index]._id}/list`
    },
    reviewType: function () {
      return this.project.reviewEvents[0].type
    },
    reviewDate: function () {
      return this.project.reviewEvents[0].date
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
      this.project.logs.push({
        type: 'review',
        note: this.reviewNote,
        date: new Date()
      })
      this.project.reviewEvents.shift()
      this.project.model = 'project'
      await this.$store.dispatch('UPDATE_MODEL', this.project)

      this.reviewDialogShow = false
      this.reviewNote = ''
      this.$router.replace(this.nextReview)
    }
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

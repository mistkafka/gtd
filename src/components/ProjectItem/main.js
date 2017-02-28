import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'ProjectItem',
  data () {
    const projectTpl = {
      title: '',
      id: ''
    }
    return {
      loading: true,
      projectTpl,
      action: Object.assign({}, projectTpl)
    }
  },
  watch: {
    '$route' (to, from) {
      this.getData(to.params.id)
    }
  },
  computed: {
    editMode () {
      return !!this.action.id
    },
    ...mapGetters({
      projectMap: 'projectMap'
    })
  },
  methods: {
    getData (id) {
      this.loading = true
      let project = {};
      if (id) {
        project = this.projectMap.get(id)
      } else {
        project = Object.assign({}, this.projectTpl)
      }
      this.project = Object.assign({}, project)

      this.loading = false
    },
    getSave () {
      let me = this
      return () => {
        me.$store.commit('saveProject', me.project)
        me.project = Object.assign({}, me.projectTpl)
        me.$router.go(-1)
      }
    },
    getSaveAndNew () {
      let me = this
      return () => {
        me.$store.commit('saveProject', me.project)
        me.project = Object.assign({}, me.projectTpl)
      }
    },
    getCancel () {
      let me = this
      return () => {
        me.project = Object.assign({}, me.projectTpl)
        me.$router.go(-1)
      }
    },
    ...mapMutations(['registerTopActions'])
  },

  // hooks
  beforeMount () {
    this.getData(this.$route.params.id)
  },
  mounted () {
    let actions = {
      left: { title: 'Cancel', action: this.getCancel() },
      middle: { title: 'Save+', action: this.getSaveAndNew() },
      right: { title: 'Save', action: this.getSave() }
    }
    if (!this.editMode) {
      this.registerTopActions(actions)
    }
  }
}

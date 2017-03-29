import { mapMutations } from 'vuex'
import { AMapManager } from 'vue-amap'
import { Loading } from 'vux'
let amapManager = new AMapManager()

export default {
  name: 'Map',
  props: ['savedMark'],
  data () {
    let me = this
    return {
      vid: 'amap-vue-1',
      zoom: 17,
      center: this.savedMark || null,
      events: {
        'click': (e) => {
          me.marker = [e.lnglat.I, e.lnglat.M]
          me.$emit('confirm', this.marker)
        }
      },
      plugin: [
        'ToolBar'
      ],
      amapManager: amapManager,
      marker: this.savedMark,
      locationing: false
    }
  },
  components: {
    Loading
  },
  methods: {
    registerAction () {
      let self = this
      let actions = {
        left: {
          backText: 'Cancel',
          action: self.back,
          preventGoBack: true
        },
        middle: { title: 'Set Location', action: null },
        right: { title: 'Confirm', action: self.confirm }
      }
      this.registerTopActions(actions)
    },
    ...mapMutations(['registerTopActions']),
    back () {
      this.$emit('cancel')
    },
    confirm () {
      this.$emit('confirm', this.marker)
    }
  },
  beforeMount () {
    let me = this
    if (!this.savedMark) {
      me.locationing = true
      navigator.geolocation.getCurrentPosition(({coords}) => {
        me.center = [coords.longitude, coords.latitude]
        me.marker = [coords.longitude, coords.latitude]
        me.confirm()
        me.locationing = false
      })
    }
    // this.registerAction()
  }
}

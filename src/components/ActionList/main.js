import {
  Swipeout,
  SwipeoutItem,
  SwipeoutButton
} from 'vux'

export default {
  name: 'ActionList',
  props: ['actions'],
  data () {
    return {
      hasSwipeoutItemOpened: false
    }
  },
  components: {
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
  },
  methods: {
    // cover like 'Hold On' --> 'action-hold-on'
    getStatusColorClass (status) {
      return 'action-' + status.toLowerCase().split(' ').join('-');
    },
    async updateActionProp (action, prop, value) {
      action[prop] = value
      action.model = 'action'
      await this.$store.dispatch('UPDATE_MODEL', action)
    },
    onSwipeoutItemClick (action) {
      if (this.hasSwipeoutItemOpened) {
        return;
      }

      this.$router.push(`/action/${action._id}`)
    },
    // hack: swipeout itemd的on-close、on-open触发得比@click.native快很多
    // 这导致hasSwipeoutItemOpened这个锁失效
    asyncSetProp (prop, value) {
      let me = this;
      window.setTimeout(() => {
        me[prop] = value;
      }, 100)
    }
  }
}

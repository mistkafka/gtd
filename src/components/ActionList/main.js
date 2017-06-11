import {
  Swipeout,
  SwipeoutItem,
  SwipeoutButton
} from 'vux'
import * as $ from 'jQuery'

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
    async onDeleteActionClick (action, event) {
      hackSwipeoutItemHeight(event);

      await this.updateActionProp(action, 'isDeleted', true)
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

// transition动画需要先有一个style才能生效
function hackSwipeoutItemHeight (event) {
  let $item = $(event.target).closest('.action-item')
  let height = $item.height()
  $item.css('height', height + 'px')
}

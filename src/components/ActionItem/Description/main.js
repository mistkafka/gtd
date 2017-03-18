import { mapState, mapGetters, mapMutations } from 'vuex'

import {
  Group,
  XTextarea
} from 'vux'

export default {
  name: 'ActionDescription',

  components: {
    Group,
    XTextarea
  },

  computed: {
    ...mapGetters({
      action: 'activeAction'
    }),
  }
}

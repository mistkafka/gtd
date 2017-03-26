import { mapState, mapMutations } from 'vuex'
import { XInput, Group, XButton } from 'vux'
import request from 'axios'

export default {
  name: 'SettingsView',
  components: {
    XInput,
    Group,
    XButton
  },
  data () {
    return {
      username: '',
      password: '',
      confirmPassword: '',
      status: 'login'        // login/register
    }
  },
  computed: {
    ...mapState({
      'loginStatus': 'login',
      'API': 'API'
    })
  },
  methods: {
    registerAction () {
      let actions = {
        left: { backText: 'Home', action: this.toHome},
        middle: { title: 'Settings', action: null },
        right: { title: '', action: null }
      }

      this.registerTopActions(actions)
    },
    ...mapMutations(['registerTopActions', 'SET_LOGIN']),
    toHome () {
      this.$router.push('/')
    },
    async register () {
      let me = this
      await request
        .post(`${this.API}/users`, {
          username: this.username,
          password: this.password
        })
        .then(() => {
          me.$vux.alert.show({title: 'Register Success!', buttonText: 'OK'})
          me.status = 'login'
          window.setTimeout(() => {
            me.$vux.alert.hide()
          }, 1000 * 3)
        })
        .catch(e => console.error(e))
    },
    async login () {
      let me = this
      let {data: {token}} = await request.post(`${this.API}/auth/login`, {
        username: this.username,
        password: this.password
      })

      this.SET_LOGIN({username: this.username, token})
    }
  },

  // hooks
  beforeMount () {
    this.registerAction()
  }
}

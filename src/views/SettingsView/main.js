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
        middle: { title: 'User', action: null },
        right: { title: '', action: null }
      }
      if (this.$store.state.login) {
        actions.right = {title: 'Logout', action: this.logout}
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
      let {data: {token}} = await request.post(`${this.API}/auth/login`, {
        username: this.username,
        password: this.password
      })

      let login = {username: this.username, token}
      window.localStorage.setItem('login', JSON.stringify(login))

      this.SET_LOGIN(login)
      await this.$store.dispatch('LOAD')
    },
    logout () {
      window.localStorage.setItem('login', null)
      this.$store.commit('SET_LOGIN', null)
      this.registerAction()
    },
  },

  // hooks
  beforeMount () {
    this.registerAction()
  }
}

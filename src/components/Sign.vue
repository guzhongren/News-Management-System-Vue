<template>
  <span :class="['login', {'isLoginClass': isLogin}]" id='logInState' @click='processLogin'>{{isLogin? '退出': '登录'}}</span>
</template>

<script>
export default {
  data () {
    return {
      isLogin: false
    }
  },
  components: {},
  created () {
    this.getLoginState()
  },
  methods: {
    processLogin (evt) {
      if (this.$utils.getLoginState()) {
        this.logout()
      } else {
        this.$router.push('/login')
      }
    },
    getLoginState () {
      let userInfo = this.$utils.getLoginState()
      userInfo ? this.isLogin = true : this.isLogin = false
    },
    /**
    *  logout
    */
    logout () {
      this.$utils.deleteLoginState().then((errRes) => {
        console.log(errRes)
      }, (info) => {
        this.isLogin = false
        this.$router.push('/login')
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login:hover{
    cursor:pointer;
    color: #20a0ff;
  }
  .isLoginClass{

  }
</style>

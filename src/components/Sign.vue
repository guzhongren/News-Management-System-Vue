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
        this.$router.push('/')
      }
    },
    getLoginState () {
      let userInfo = this.$utils.getLoginState()
      if (userInfo) {
        this.isLogin = true
      } else {
        this.isLogin = false
        this.$router.push('/')
      }
    },
    /**
    *  logout
    */
    logout () {
      this.$utils.deleteLoginState().then((errRes) => {
        console.log(errRes)
      }, (info) => {
        this.isLogin = false
        this.$router.push('/')
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

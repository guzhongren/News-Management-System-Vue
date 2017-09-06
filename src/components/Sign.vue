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
  methods: {
    processLogin (evt) {
      let cls = evt.target.className
      if (cls.indexOf('isLoginClass') > 0) {
        // log out
      } else {
        this.$router.push('/login')
      }
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

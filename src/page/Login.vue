<template>
  <div class='login'>
    <div class='loginPage' >
      <el-form class='loginForm' label-position='left' label-width="80px" >
        <!-- <el-form-item label="名称"> -->
          <el-input class='loginInput' placeholder="请输入内容" @change='usernameChange' >
            <template slot="prepend">用户名</template>
          </el-input>
        <!-- </el-form-item> -->
        <!-- <el-form-item label="活动区域"> -->
          <el-input class='loginInput' type='password' placeholder="请输入内容" @change='userPassChange' >
            <template slot="prepend">密码</template>
          </el-input>
        <!-- </el-form-item> -->
        <!-- <el-form-item label="活动形式"> -->
          <el-button class='loginBtn' type="primary" :disabled="isLoginBtnDisable" @click='login'>登录</el-button>
        <!-- </el-form-item> -->
      </el-form>
    </div>
    <cms-footer></cms-footer>
  </div>
</template>

<script>
import CmsFooter from '../components/Footer'
export default {
  data () {
    return {
      isLoginBtnDisable: true,
      username: null,
      userPass: null
    }
  },
  components: {
    'cms-footer': CmsFooter
  },
  created: () => {
  },
  methods: {
    refresh () {
      window.location.reload()
    },
    login (evt) {
      if (!this.isLoginBtnDisable) {
        let params = {
          account: this.username,
          password: this.userPass
        }
        this.$api.post('login', params, (errObj) => {
          console.log('login error', JSON.stringify(errObj))
        }, (resp) => {
          resp && resp.code === 0 ? this.setUserInfoToGo({account: this.username}) : null
        })
      }
    },
    setUserInfoToGo (userInfo) {
      this.$utils.setLoginState(userInfo)
      this.$router.push('/cms')
    },
    usernameChange (evt) {
      // evt ? this.username = evt && this.userPass ? this.isLoginBtnDisable = true && console.log(this.isLoginBtnDisable) : this.isLoginBtnDisable = false : this.username = null
      if (evt) {
        this.username = evt
        this.userPass ? this.isLoginBtnDisable = false : this.isLoginBtnDisable = true
      } else {
        this.username = null
        this.isLoginBtnDisable = true
      }
    },
    userPassChange (evt) {
      // evt ? this.userPass = evt && this.username ? this.isLoginBtnDisable = true : this.isLoginBtnDisable = false : this.userPass = null
      if (evt) {
        this.userPass = evt
        this.username ? this.isLoginBtnDisable = false : this.isLoginBtnDisable = true
      } else {
        this.userPass = null
        this.isLoginBtnDisable = true
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login{
    height: 100%;
    width: 100%;
  }
  .loginPage{
    height: 100%;
    width: 100%;
    background-image: linear-gradient(-180deg, #324157 38%, #00DEFF 100%);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .loginForm{
    width: 30%;
  }
  .loginInput {
    margin: 10px 0;
  }
  .loginBtn {
    width: 100%;
  }
</style>

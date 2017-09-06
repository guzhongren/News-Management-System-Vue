<template>
  <div class='loginPage'>
    <el-row>
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="12">
        <el-input placeholder="请输入内容" @change='usernameChange' >
          <template slot="prepend">用户名</template>
        </el-input>
      </el-col>
      <el-col :span="6"></el-col>
    </el-row>
    <el-row>
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="12">
        <el-input type='password' placeholder="请输入内容" @change='userPassChange' >
          <template slot="prepend">密码</template>
        </el-input>
      </el-col>
      <el-col :span="6"></el-col>
    </el-row>
    <el-row>
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="12">
        <el-button type="primary" :disabled="isLoginBtnDisable">登录</el-button>
      </el-col>
      <el-col :span="6"></el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  data () {
    return {
      isLoginBtnDisable: true,
      username: null,
      userPass: null
    }
  },
  components: {},
  methods: {
    refresh () {
      window.location.reload()
    },
    usernameChange (evt) {
      // evt ? this.username = evt && this.userPass ? this.isLoginBtnDisable = true && console.log(this.isLoginBtnDisable) : this.isLoginBtnDisable = false : this.username = null
      if (evt) {
        this.username = evt
        this.userPass ? this.isLoginBtnDisable = false : this.isLoginBtnDisable = true
        console.log(this.isLoginBtnDisable)
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
        console.log(this.isLoginBtnDisable)
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
  .loginPage{
    height: 100%;
    widows: 100%;
    background-image: linear-gradient(-180deg, #324157 38%, #00DEFF 100%);
    display: flex;
    align-items: center
  }
</style>

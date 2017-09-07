<template>
  <div class='menu-bar'>
    <el-menu mode="vertical" :default-active='navs.defaultActive' @select='updatePage' class="el-menu-vertical-demo" v-for='nav in navs.items' key='nav.index'>
      <el-menu-item :id='nav.index' :index='nav.index'><i :class='nav.icon'></i>{{nav.title}}</el-menu-item>
    </el-menu>
  </div>
</template>ssss

<script>
export default {
  name: 'cms',
  props: ['currentMenuItem'],
  data () {
    return {
      navs: {
        defaultActive: this.currentMenuItem ? this.currentMenuItem : 'baseSetting',
        items: [{
          title: '基本设置',
          index: 'baseSetting',
          icon: 'el-icon-setting'
        }, {
          title: '栏目管理',
          index: 'menuManager',
          icon: 'el-icon-menu'
        }, {
          title: '用户管理',
          index: 'userManager',
          icon: 'el-icon-message'
        }]
      }
    }
  },
  methods: {
    /**
    *update current page
    */
    updatePage (evt) {
      this.navs.defaultActive = evt
      this.$emit('on-click', this.navs.defaultActive)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.menu-bar{
  
}
</style>

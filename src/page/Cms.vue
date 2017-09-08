<template>
    <div class='cms'>
      <el-row class="cms-title">
        <el-col :span="10"><div class='cms-title-left paddings'><span>{{this.appTitle}}</span></div></el-col>
        <el-col :span="11"><div class='paddings'></div></el-col>
        <el-col :span="3"><div class='paddings'><sign ></sign></div></el-col>
      </el-row>
      <!-- content -->
      <el-row class='cms-content'>
        <!-- menu bar -->
        <el-col :span="4" class='left-bar' >
          <navbar @on-click="getCurrentMenuItem"></navbar>
        </el-col>
        <!-- menu content -->
        <el-col :span="20" class="cms">
          <!-- content of per menu item -->
          <cms-content :currentMenuItem='navsCurrentItem' :systemName='appTitle' @update-systemname='updataSystemName'></cms-content>
        </el-col>
      </el-row>
    </div>
</template>

<script>
import Navbar from '../components/Nav'
import Sign from '../components/Sign'
import CmsContent from '../components/Content'
export default {
  name: 'cms',
  props: {
    // clickMenu:
  },
  data () {
    return {
      appTitle: 'Congred Cms', // Name of Ap
      navsCurrentItem: 'baseSetting' // current mene item
    }
  },
  components: {
    'navbar': Navbar,
    'sign': Sign,
    'cms-content': CmsContent
  },
  methods: {
    updataSystemName (title) {
      this.appTitle = title
    },
    refresh () {
      window.location.reload()
    },
    // click: get current menu item
    getCurrentMenuItem (item) {
      this.navsCurrentItem = item
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.paddings {
  padding: 12px;
}
.cms-title-left{
  font-size: 24px;
  margin-left: 10px;
  display: flex;
  align-items: center;
}
.cms-title-left:hover{
  cursor:pointer;
  color: #20a0ff;
}
.cms-title-right{
  float: right;
}
.left-bar{
  height: 100%;
  background-color: #324157;
}
</style>

<template>
  <div >
    <div class='cms-title'>
      <el-row>
        <el-col :span="10"><div class='cms-title-left paddings'><span>{{this.appTitle}}</span></div></el-col>
        <el-col :span="11"><div class='paddings'></div></el-col>
        <el-col :span="3"><div class='paddings'><Sign ></Sign></div></el-col>
      </el-row>
      <!-- content -->
      <el-row>
        <!-- menu bar -->
        <el-col :span="4" >
          <Navbar></Navbar>
        </el-col>
        <!-- menu content -->
        <el-col :span="20"><div class='magin'></div></el-col>
      </el-row>
    </div>


  </div>
</template>

<script>
import Navbar from '../components/Nav'
import Sign from '../components/Sign'

export default {
  name: 'cms',
  props: {
    // clickMenu:
  },
  data () {
    return {
      appTitle: 'Congred CMS', // Name of Ap
      activeIndex: '1'
    }
  },
  components: {
    'Navbar': Navbar,
    'Sign': Sign
  },
  methods: {
    refresh () {
      window.location.reload()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.paddings {
  padding: 12px;
}
.cms-title{
  background-color: #324157;
  color: #fff;
  height: 60px;

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
</style>

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
        <el-col :span="4" >
          <navbar></navbar>
        </el-col>
        <!-- menu content -->
        <el-col :span="20" class="cms">
          <div class='per-cms-content'>

          </div>
        </el-col>
      </el-row>
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
    'navbar': Navbar,
    'sign': Sign
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

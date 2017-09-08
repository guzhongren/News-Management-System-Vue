<template>
  <div class='full-content'>
    <el-card class="box-card box-scoll card-border-radius">
      <el-form class='setting-form' label-position='left' label-width="80px" >
        <el-form-item label='系统名称'>
          <el-input class='' placeholder="请输入内容" @change='systemNameChange' :value='appTitle' >
          </el-input>
        </el-form-item>
        <!-- <el-form-item label="系统权属">
          <el-input class='' type='password' placeholder="请输入内容" @change='copyRightChange' >
          </el-input>
        </el-form-item> -->
        <!-- <el-form-item label="活动形式"> -->
          <el-button @click='certainUpdate' class='certainBtn' type="primary"><i class="icon-padding-right fa fa-check-circle-o fa-1x" aria-hidden="true"></i>确认更新</el-button>
        <!-- </el-form-item> -->
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  props: ['systemName'],
  data () {
    return {
      appTitle: this.systemName ? this.systemName : 'Congred Cms'
    }
  },
  methods: {
    systemNameChange (val) {
      // console.log(val)
      val ? this.appTitle = val : this.appTitle = 'Congred Cms'
    },
    copyRightChange (val) {
      console.log(val)
    },
    certainUpdate () {
      this.$emit('update-systemname-content', this.appTitle)
    }
  }
}
</script>

<style scoped>
.certainBtn{
  width: 100%;
}
.setting-form{
  width: 50%;
  margin: 50px auto;
}
.clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  .clearfix:after {
      clear: both
  }
</style>

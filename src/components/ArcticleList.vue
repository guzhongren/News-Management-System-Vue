<template>
  <el-card class="full-content card-border-radius">
  <div slot="header" class="clearfix">
    <span style="line-height: 36px;">文章列表</span>
    <el-button style="float: right;" type="primary" @click='addChannle'>新增栏目</el-button>
  </div>
  <div v-for="o in 4" :key="o" class="text item">
    {{'列表内容 ' + o }}
  </div>
  <el-dialog  title="提示" :visible.sync="isDialogVisible" size="tiny" >
    <span>asdfasd</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click='handleClose'>取 消</el-button>
      <el-button type="primary" @click='handleClose'>确 定</el-button>
    </span>
  </el-dialog>
</el-card>

</template>
<script>
  export default {
    props: ['articleList'],
    data () {
      return {
        list: this.ArcticleList,
        isDialogVisible: false
      }
    },
    mounted () {
      this.displaylist()
    },
    methods: {
      displaylist (aList) {
        console.log(aList)
      },
      // add channel
      addChannle () {
        this.isDialogVisible = !this.isDialogVisible
      },
      handleClose () {
        this.isDialogVisible = !this.isDialogVisible
      }
    }
  }
</script>
<style scoped>

</style>

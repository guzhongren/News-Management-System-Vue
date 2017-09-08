<template>
  <el-card class="full-content card-border-radius">
  <div slot="header" class="clearfix">
    <span style="line-height: 36px;">文章列表</span>
    <el-button style="float: right;" type="primary" @click='addChannle'>新增栏目</el-button>
  </div>
  <el-collapse :activeName='activeCollapseName' accordion>
    <el-collapse-item v-if='list' v-for='item in list' :key='item.channel_id' :title="item.channel_name" :name="item.channel_name">
      <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
      <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
    </el-collapse-item>

  </el-collapse>
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
        isDialogVisible: false,
        activeCollapseName: null // string
      }
    },
    mounted () {
      console.log(this.articleList)
      this.articleList.length > 0 && this.displaylist(this.articleList.list)
    },
    methods: {
      constructMenu (aList) {
        let reAList = []
        let reAlistObj = {} // unique menu recoder
        for (let i = 0; i < aList.length; i++) {
          let item = aList[i]
          if (i === 0) {
            let tempItem = {}
            reAlistObj[item.channel_id] = item.channel_id
            tempItem['channel_name'] = item.channel_name
            tempItem['channel_id'] = item.channel_id
            tempItem['list'] = []
            tempItem['list'].push(item)
            reAList.push(tempItem)
            tempItem = null
          } else {
            if (reAlistObj[item.channel_id]) {
              for (let i = 0; i < reAList.length; i++) {
                if (reAList[i].channel_id === item.channel_id) {
                  reAList[i].list.push(item)
                }
              }
            } else {
              let tempItem = {}
              reAlistObj[item.channel_id] = item.channel_id
              tempItem['channel_name'] = item.channel_name
              tempItem['channel_id'] = item.channel_id
              tempItem['list'] = []
              tempItem['list'].push(item)
              reAList.push(tempItem)
              tempItem = null
            }
          }
        }
        return reAList
      },
      displaylist (aList) {
        this.list = this.constructMenu(aList)
        console.log(this.list)
        this.activeCollapseName = this.list[0].channel_name
      },
      // add channel
      addChannle () {
        this.isDialogVisible = !this.isDialogVisible
      },
      handleClose () {
        this.isDialogVisible = !this.isDialogVisible
      }
    },
    watch: {
      'articleList': function (val, old) {
        // this.articleList = val
        console.log(val, 'sdad')
        val.list.length > 0 && this.displaylist(val.list)
      }
    }
  }
</script>
<style scoped>

</style>

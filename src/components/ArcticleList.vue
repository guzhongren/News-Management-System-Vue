<template>
  <!-- <el-card class="full-content card-border-radius"> -->
    <!-- <div slot="header" class="clearfix">
      <span style="line-height: 36px;">文章列表</span>
      <el-button style="float: right;" type="primary" @click='addChannle'>新增栏目</el-button>
    </div> -->
  <!-- <el-collapse :activeName='activeCollapseName' accordion>
    <el-collapse-item v-if='list' v-for='item in list' :key='item.channel_id' :title="item.channel_name" :name="item.channel_name">
      <div class='artcleInfo' v-for='lis in item.list' :key='lis.id'>
        <el-row :gutter="20">
        <el-col :span="21">
          <span>{{lis.title.length > 20 ?lis.title.slice(0,20)+'...' : lis.title.slice(0,20)}}</span>
        </el-col>
        <el-col :span="3">
          <span class='info-func'>
            <i :id='lis.id' class="icon-padding-right fa fa-eye icon-padding-right" aria-hidden="true"></i>
            <i :id='lis.id' class="fa fa-pencil-square-o icon-padding-right" aria-hidden="true"></i>
            <i :id='lis.id' class="fa fa-trash-o icon-padding-right" aria-hidden="true"></i>
          </span>
        </el-col>
      </el-row>
      </div>
    </el-collapse-item>
  </el-collapse> -->
  <el-row class='full-content'>
    <!-- <el-col :span="4" class=''>
      <div class=''>Articles</div>
    </el-col> -->
    <el-col :span="24" class='channelTools'>
      <div class='articleTools'>
        <el-button size="small" type="primary">添加栏目</el-button>
        <el-button  size="small" type="primary">添加文章</el-button>
      </div>
    </el-col>
    <el-row class='channelContent'>
      <el-col :span="5" class=''>
        <!-- menu -->
        <div v-if='channelList'>
          <div v-for='item in channelList.list' :key='item.id' :id='item.id' class='channelMenu' @click='getArticles'>
            <i class="icon-padding-right fa fa-bookmark" aria-hidden="true"></i>{{item.name}}
          </div>
        </div>
      </el-col>
      <el-col :span="19" class=''>
        <!-- article list-->
        <div v-if='articleList.length > 0'>
          <div class='artcleInfo' v-for='list in articleList.list' :key='list.id'>
            <el-row :gutter="20">
            <el-col :span="21">
              <span>{{list.title.length > 20 ? list.title.slice(0,20)+'...' : list.title.slice(0,20)}}</span>
            </el-col>
            <el-col :span="3">
              <span class='info-func'>
                <i :id='list.id' class="icon-padding-right fa fa-eye icon-padding-right" aria-hidden="true"></i>
                <i :id='list.id' class="fa fa-pencil-square-o icon-padding-right" aria-hidden="true"></i>
                <i :id='list.id' class="fa fa-trash-o icon-padding-right" aria-hidden="true"></i>
              </span>
            </el-col>
          </el-row>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- dialog -->
    <el-dialog  :title='dialogTitle' :visible.sync="isDialogVisible" size="tiny" >
      <span>{{dialogContent}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click='handleClose'>取 消</el-button>
        <el-button type="primary" @click='handleClose'>确 定</el-button>
      </span>
    </el-dialog>
  </el-row>
<!-- </el-card> -->
</template>
<script>
  export default {
    // props: ['articleList'],
    data () {
      return {
        articleList: [],
        isDialogVisible: false,
        activeCollapseName: null, // string
        dialogTitle: '提示',
        dialogContent: 'ccccc',
        channelList: null
      }
    },
    created () {
      this.getChannellist(this.getArticles)
    },
    mounted () {
      console.log(this.articleList)
    },
    unmount () {
    },
    methods: {
      getArticles (evt, id) {
        let channelId = evt.target.id ? evt.target.id : id
        if (channelId) {
          let params = {
            channel_id: channelId
          }
          this.$api.get('article', params, (errRes) => {}, (res) => {
            if (res && res.code === 0) {
              this.articleList = res
            } else {
            }
          })
        } else {
          this.$api.get('article', null, (errRes) => {}, (res) => {
            if (res && res.code === 0) {
              this.articleList = res
            } else {
            }
          })
        }
      },
      getChannellist (callback) {
        this.$api.get('channel', null, (errr) => {
          console.log(errr)
        }, (res) => {
          if (res.code === 0) {
            this.channelList = res.data
            callback ? callback(this.channelList[0].id) : null
          } else {
            this.dialogContent = '查询出错'
            this.dialogTitle = 'Error'
            this.isDialogVisible = true
          }
        })
      },
      // ops...
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
        // this.list = this.constructMenu(aList)
        // console.log(this.list)
        // this.activeCollapseName = this.list[0].channel_name

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
      // 'articleList': function (val, old) {
      //   // this.articleList = val
      //   console.log(val, 'sdad')
      //   val.list.length > 0 && this.displaylist(val.list)
      // }
    }
  }
</script>
<style scoped>
  .artcleInfo{
    border: 1px solid #dfe6ec;
    border-radius: 3px;
    height: 35px;
    margin: 5px auto;
    padding-left: 10px;
    line-height: 35px;
    overflow: hidden
    /*display: flex;
    align-items: center;*/
  }
  .info-func{
    opacity: 0;
    float: right;
  }
  .info-func:hover {
    opacity: 1;
    transition: all 0.3 ease 0.1;
  }

</style>

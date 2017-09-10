<template>
  <el-row class='full-content'>
    <el-col :span="24" class='channelTools'>
      <div class='articleTools'>
        <el-button size="small" type="primary" @click='addChannel'>添加栏目</el-button>
        <el-button  size="small" type="primary" @click='addArticle'>添加文章</el-button>
      </div>
    </el-col>
    <el-row class='channelContent'>
      <el-col :span="5" class='scrollFeature'>
        <!-- menu -->
        <div v-if='channelList' class='scrollChilder'>
          <div v-for='item in channelList.list' :key='item.id' :id='item.id' class='channelMenu' @click='clickMenu'>
            <el-row>
              <el-col :span="2" :id='item.id'>
                <i class="icon-padding-right fa fa-bookmark" aria-hidden="true"></i>
              </el-col>
              <el-col :span="18" :id='item.id'>
                <span :id='item.id'>{{item.name}}</span>
              </el-col>
              <el-col :span="4" :id='item.id'>
                <span class='channelDelete' >
                  <i :id='item.id + "_" + item.name' class="icon-padding-right fa fa-pencil" aria-hidden="true" @click='editChnnel'></i>
                  <i :id='item.id' class="icon-padding-right fa fa-trash-o" aria-hidden="true" @click='deleteChannel'></i>
                </span>
              </el-col>
            </el-row>

          </div>
        </div>
      </el-col>
      <el-col :span="19" class=''>
        <!-- article list-->
        <div v-if='currentArticleStatus === articleStatus[0]'>
          <article-list ref='articleList' :update='isRefresh' :channelId='channelId' :page='currentArticlePage' v-on:edit-article='editArticle' v-on:read-article='readArticle' v-on:delete-article='deleteArticle'></article-list>
        </div>
        <!-- add article -->
        <div v-if='currentArticleStatus === articleStatus[1]'>
          <article-editor :channelId='channelId' v-on:cancleArticle='cancleArticleOption' v-on:submit-article='submitArticle'></article-editor>
        </div>
        <!-- read article -->
        <div v-if='currentArticleStatus === articleStatus[2]' class='' id='read'>
          <article-reader :articleId='currentArticleId' v-on:go-back='processGoBack'></article-reader>
        </div>
        <!-- eidt article -->
        <div v-if='currentArticleStatus === articleStatus[3]'>
          <article-editor :channelId='channelId' :articleId='currentArticleId' v-on:cancleArticle='cancleArticleOption' v-on:sbumit-edited-article='submitEditedArticle'></article-editor>
        </div>
      </el-col>
    </el-row>
    <!-- dialog -->
    <el-dialog  :title='dialogTitle' :visible.sync="isDialogVisible" size="tiny" >
      <div v-if='dialogStatus[0] === currentDialogStatus'>
        <el-input placeholder="请输入栏目标题" @change='getChannelName'>{{channelTitleToAdd}}</el-input>
      </div>
      <div v-else-if='dialogStatus[1] === currentDialogStatus'>
        <el-input placeholder="请输入栏目标题" @change='getChannelName' v-model='channelTitleToAdd'>{{channelTitleToAdd}}</el-input>
      </div>
      <div v-else='dialogStatus[2] === currentDialogStatus'>
        <h3>确定要删除么？</h3>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click='handleClose'>取 消</el-button>
        <el-button type="primary" @click='handleOk'>确 定</el-button>
      </span>
    </el-dialog>
  </el-row>
<!-- </el-card> -->
</template>
<script>
import ArticleList from './ArticleList'
import ArticleEditor from './ArticleEditor'
import ArticleReader from './ArticleReader'
export default {
  // props: ['articleList'],
  components: {
    'article-list': ArticleList,
    'article-editor': ArticleEditor,
    'article-reader': ArticleReader
  },
  data () {
    return {
      articleList: [],
      isRefresh: false,
      articleStatus: ['DISPLAY', 'ADD', 'READ', 'EDIT'],
      currentArticlePage: 1,
      currentArticleId: null,
      currentArticleStatus: '',
      isDialogVisible: false,
      activeCollapseName: null, // string
      dialogTitle: '提示',
      dialogContent: 'ccccc',
      channelList: null,
      channelId: 1,
      channelPage: 1,
      dialogStatus: ['ADDCHANNEL', 'EDITCHANNEL', 'DELETECHANNEL', 'ADDDARTICLE', 'DELETEARTICLE'],
      currentDialogStatus: '',
      channelTitleToAdd: '' // [add edit]
    }
  },
  created () {
    this.getChannellist(this.channelPage)
  },
  mounted () {
    // console.log(this.articleList)
    this.currentArticleStatus = this.articleStatus[0]
  },
  unmount () {
  },
  methods: {
    processGoBack () {
      this.currentArticleStatus = this.articleStatus[0]
    },
    deleteArticle (atcId) {
      this.currentArticleId = atcId
      this.dialogTitle = '请求确认'
      this.currentDialogStatus = this.dialogStatus[2]
      this.isDialogVisible = true
    },
    readArticle (atcId) {
      this.currentArticleId = atcId
      this.currentArticleStatus = this.articleStatus[2]
    },
    submitEditedArticle (msg) {
      this.currentArticleStatus = this.articleStatus[0]
    },
    editArticle (aId) {
      this.currentArticleStatus = this.articleStatus[3]
      this.currentArticleId = aId
    },
    cancleArticleOption (msg) {
      console.log(msg)
      this.currentArticleStatus = this.articleStatus[0]
    },
    submitArticle (msg) {
      // console.log(msg)
      if (this.articleStatus[1] === msg) {
        this.currentArticleStatus = this.articleStatus[0]
      }
    },
    addArticle () {
      this.currentArticleStatus = this.articleStatus[1]
    },
    editChnnel (evt) {
      evt.stopPropagation()
      let tempInfo = evt.target.id.split('_')
      this.channelTitleToAdd = tempInfo[1]
      this.channelId = tempInfo[0]
      tempInfo = null
      this.dialogTitle = '编辑栏目'
      this.currentDialogStatus = this.dialogStatus[1]
      this.isDialogVisible = true
    },
    getChannelName (evt) {
      evt ? this.channelTitleToAdd = evt : null
    },
    addChannel () {
      this.dialogTitle = '添加栏目'
      this.currentDialogStatus = this.dialogStatus[0]
      this.isDialogVisible = true
    },
    clickMenu (evt) {
      // let channelId = evt.target.id
      this.currentArticleStatus = this.articleStatus[0]
      this.channelId = evt.target.id
      // console.log('click', this.currentArticleStatus, this.channelId, this.channelPage)
      // this.getArticles(this.channelId, this.channelPage)
    },
    getArticles (channelId, page) {
      let params = {}
      channelId ? params['channel_id'] = channelId : params['channel_id'] = this.channelId
      page ? params['page'] = page : params['page'] = this.channelPage
      this.$api.get('article', params, (errRes) => {}, (res) => {
        if (res && res.code === 0) {
          this.articleList = res.data
        } else {
          this.articleList = null
        }
      })
    },
    getChannellist (channelPage, callback) {
      let _self = this
      this.channelPage = channelPage
      let params = {
        page: this.channelPage
      }
      this.$api.get('channel', params, (errr) => {
        console.log(errr)
      }, (res) => {
        if (res.code === 0) {
          _self.channelList = res.data
          _self.channelId = _self.channelList.list[0].id
          callback ? callback(_self.channelList.list[0].id, _self.channelPage) : null
          // if (callback) {
          //   callback.call(_self, _self.channelList.list[0].id, _self.channelPage)
          // }
        } else {
          _self.dialogContent = '查询出错'
          _self.dialogTitle = 'Error'
          _self.isDialogVisible = true
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
    // ops...
    displaylist (aList) {
      // this.list = this.constructMenu(aList)
      // console.log(this.list)
      // this.activeCollapseName = this.list[0].channel_name
    },
    deleteChannel (evt) {
      let _self = this
      evt.stopPropagation()
      let delChannelId = evt.target.id
      _self.$api.delete('channel/' + delChannelId, null, (er) => {}, (res) => {
        if (res.code === 0) {
          _self.getChannellist(this.channelPage)
        }
      })
    },
    // add channel
    addChannle () {
      this.isDialogVisible = !this.isDialogVisible
    },
    handleOk () {
      let _self = this
      if (_self.channelTitleToAdd && _self.dialogStatus[0] === _self.currentDialogStatus) {
        let params = {
          name: _self.channelTitleToAdd
        }
        _self.$api.post('channel', params, (er) => {}, (res) => {
          if (res.code === 0) {
            _self.getChannellist(this.channelPage)
            _self.handleClose()
          }
        })
      } else if (_self.channelTitleToAdd && _self.dialogStatus[1] === _self.currentDialogStatus) { // edit
        let params = {
          name: this.channelTitleToAdd
        }
        _self.$api.put('channel/' + _self.channelId, params, (er) => {}, (res) => {
          if (res.code === 0) {
            _self.getChannellist(this.channelPage)
            _self.handleClose()
          }
        })
      } else if (_self.currentArticleId && _self.dialogStatus[2] === _self.currentDialogStatus) {
        _self.$api.delete('article/' + _self.currentArticleId, null, (er) => {}, (res) => {
          if (res.code === 0) {
            // _self.handleClos()
            _self.isDialogVisible = false
            _self.isRefresh = !_self.isRefresh
          }
        })
      }
    },
    handleClose () {
      this.isDialogVisible = false
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
</style>

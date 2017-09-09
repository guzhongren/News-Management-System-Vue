<template>
  <el-form :model="willAddArticle" ref="willAddArticle" class='addArticleForm' label-position='left' label-width="80px">
    <el-form-item label="标题"  prop="title":rules="[{ required: true, message: '请输入文章标题', trigger: 'blur' },]">
      <el-input v-model='willAddArticle.title' type='title' v-model.number='willAddArticle.title' placeholder="请输入文章标题"></el-input>
    </el-form-item>
    <el-form-item label="作者">
      <el-input v-model='willAddArticle.author' placeholder="请输入文章作者"></el-input>
    </el-form-item>
    <el-form-item label="编辑" >
      <el-input placeholder="请输入文章编辑" v-model='willAddArticle.editor'></el-input>
    </el-form-item>
    <el-form-item label="文章来源">
      <el-input v-model='willAddArticle.origin' placeholder="请输入文章来源"></el-input>
    </el-form-item>
    <el-form-item label="内容">
      <el-input type="textarea" v-model='willAddArticle.content' placeholder="请输入内容"></el-input>
    </el-form-item>
    <el-form-item label="缩略图">
      <el-upload drag :on-change='uploadImg' action="https://jsonplaceholder.typicode.com/posts/">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitArticle" v-text='!willEditArticleId ? submitBtn[0] : submitBtn[1]'></el-button>
      <el-button @click='cancelArticle'>取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  props: ['channelId', 'articleId'],
  created  () {
    this.willEditArticleId = this.articleId
    this.getCurrentUserInfo()
    this.willAddArticle.channel_id = parseInt(this.channelId)
  },
  mount () {
    console.log(this.channelId)
  },
  beforeDestroy () {
    this.willEditArticleId = null
  },
  data () {
    return {
      willEditArticleId: null,
      submitBtn: ['确认添加', '确认修改'],
      currentUser: null,
      willAddArticle: {
        title: '',
        channel_id: null,
        author: '',
        origin: '',
        editor: '',
        content: '',
        img: ''
      }
    }
  },
  methods: {
    // 提交修改后的文章
    updateArticle () {
    },
    addArticle () {
      this.$api.post('article', this.willAddArticle, (er) => {}, (res) => {
        res.code === 0 ? this.$emit('submit-article', true) : null
      })
    },
    // 处理上传图片
    uploadImg (file, fileList) {
      this.willAddArticle.img = file.url
      console.log(this.willAddArticle)
    },
    cancelArticle (evt) {
      console.log(evt)
      // this.currentArticleStatus = this.`articleStatus[0]
      this.$emit('cancleArticle', 'canncel-add')
    },
    submitArticle (evt) {
      console.log(this.willAddArticle)
      // this.willAddArticle.author ? null : this.willAddArticle.author = this.currentUser.account
      this.willAddArticle.editor ? null : this.willAddArticle.editor = this.currentUser.account
      if (!this.willEditArticleId) {
        this.addArticle()
      } else {
        this.updateArticle()
      }
    },
    getCurrentUserInfo () {
      this.currentUser = JSON.parse(this.$utils.getLoginState())
    }
  }
}
</script>
<style >
</style>

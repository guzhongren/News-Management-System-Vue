<template>
  <div v-if='willAddArticle' class='atc' id='willAddArticle.id'>
    <div class="articleHeader">
      <h1 >{{willAddArticle.title}}</h1>
      <el-row>
        <el-col :span="8"><h4>作者： {{willAddArticle.author}}</h4></el-col>
        <el-col :span="8"><h4>编辑： {{willAddArticle.editor}}</h4></el-col>
        <el-col :span="8"><h4>文章来源： {{willAddArticle.origin}}</h4></el-col>
      </el-row>
    </div>
    <div class='arcticleBody'>
      <article>
        {{willAddArticle.content}}
      </article>
    </div>
    <div class="articleFooter">
      <div>转载请注明出处</div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['articleId'],
  mounted () {
    this.currentArticleId = this.articleId
    this.getArticleById(this.currentArticleId)
  },
  data () {
    return {
      currentArticleId: this.articleId,
      willAddArticle: null
    }
  },
  methods: {
    getArticleById (articleId, callback) {
      let _self = this
      _self.$api.get('article/' + articleId, null, (er) => {}, (res) => {
        console.log('get', res.data)
        _self.willAddArticle = res.data
        callback ? callback.call(_self, _self.willAddArticle) : null
      })
    }
  },
  watch: {
    'articleId': function (val, oldVal) {
      val === oldVal ? this.currentArticleId = val && this.getArticleById(this.currentArticleId) : null
    }
  }
}
</script>
<style scoped>

</style>

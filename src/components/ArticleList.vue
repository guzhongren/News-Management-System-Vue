<template>
  <div v-if='articleList'>
    <div class='artcleInfo' v-for='list in articleList.list' :key='list.id'>
      <el-row :gutter="20">
      <el-col :span="21">
        <span>{{list.title.length > 20 ? list.title.slice(0,20)+'...' : list.title.slice(0,20)}}</span>
      </el-col>
      <el-col :span="3">
        <span class='info-func'>
          <i :id='list.id' @click='readArticle' class="icon-padding-right fa fa-eye icon-padding-right" aria-hidden="true"></i>
          <i :id='list.id' @click='editArticle' class="icon-padding-right fa fa-pencil-square-o icon-padding-right" aria-hidden="true"></i>
          <i :id='list.id' @click='deleteArticle' class="icon-padding-right fa fa-trash-o icon-padding-right" aria-hidden="true"></i>
        </span>
      </el-col>
    </el-row>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['channelId', 'page'],
    beforeMount () {
      // this.getArticles(this.channel_id, this.currentPaga)
    },
    mounted () {
      this.getArticles(this.channel_id, this.currentPaga)
    },
    data () {
      return {
        channel_id: this.channelId ? this.channelId : null,
        currentPaga: this.page ? this.page : 1,
        articleList: null
      }
    },
    methods: {
      readArticle (evt) {
        evt ? this.$emit('read-article', evt.target.id) : null
      },
      editArticle (evt) {
        evt ? this.$emit('edit-article', evt.target.id) : null
      },
      deleteArticle () {},
      getArticles (channelId, page) {
        let params = {}
        let _self = this
        channelId ? params['channel_id'] = channelId : params['channel_id'] = _self.channelId
        page ? params['page'] = page : params['page'] = _self.channelPage
        _self.$api.get('article', params, (errRes) => {}, (res) => {
          if (res && res.code === 0) {
            _self.articleList = res.data
          } else {
            _self.articleList = null
          }
        })
      }
    },
    watch: {
      'channelId': function (val, oldVal) {
        val === oldVal ? null : this.channel_id = val && this.getArticles(this.channel_id, this.currentPaga)
      },
      'page': function (val, oldVal) {
        val === oldVal ? null : this.currentPaga = val && this.getArticles(this.channel_id, this.currentPaga)
      }
    }
  }
</script>
<style scoped>

</style>

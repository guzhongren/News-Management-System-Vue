<template>
  <div class='full-content'>
    <arcticle-list v-if='"LIST" === arcticleType[0]' ></arcticle-list>
    <article-detial v-else-if= '"DETIAL" === arcticleType[1]'></article-detial>
    <article-add v-else></article-add>
    <!-- dialog to tips -->
    <el-dialog  title="提示" :visible.sync="isDialogVisible" size="tiny" >
      <span>{{this.tipsContent}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click='handleClose'>取 消</el-button>
        <el-button type="primary" @click='handleClose'>确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
  </div>
</template>
<script>
import ArcticleList from './ArcticleList'
import ArticleDetial from './ArticleDetial'
import ArticleAdd from './ArticlaAdd'
export default {
  data () {
    return {
      arcticleType: ['LIST', 'DETIAL', 'ADD'],
      isArcticleList: true,
      perPageArcticles: 10,
      pagesNum: 1,
      list: [], // arcticle list
      currentArcticle: null, // current arcticle to display in ArticleDetial
      tipsContent: '',
      isDialogVisible: false
    }
  },
  components: {
    'arcticle-list': ArcticleList,
    'article-detial': ArticleDetial,
    'article-add': ArticleAdd
  },
  mounted () {
    // this.getArticleInfo()
  },
  methods: {
    // Dialog process
    handleClose () {
      this.isDialogVisible = !this.isDialogVisible
    },
    // get arcticle list info
    getArticleInfo () {
      this.$api.get('article', null, (errRes) => {
        this.tipsContent = '查询文章出错'
        this.isDialogVisible = !this.isDialogVisible
      }, (res) => {
        console.log(res)
        this.list = res.data
      })
    },
    // get number of pages
    getPages (alist) {
      this.pagesNum = Math.ceil(alist.data.total / this.perPageArcticles)
      console.log(this.pagesNum)
    },
    getArticleByPageNum (num) {
      let params = {
        page: num
      }
      this.$api.get('article', params, (errRes) => {
        this.tipsContent = '查询文章出错'
        this.isDialogVisible = !this.isDialogVisible
      }, (res) => {

      })
    }
  }
}
</script>

<style scoped>
</style>

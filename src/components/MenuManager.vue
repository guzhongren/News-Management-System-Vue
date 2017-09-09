<template>
  <div class='full-content'>
    <arcticle-pannel ></arcticle-pannel>
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
import ArcticlePannel from './ArcticlePannel'
export default {
  data () {
    return {
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
    'arcticle-pannel': ArcticlePannel
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

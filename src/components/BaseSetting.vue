<template>
  <div class='full-content'>
    <el-card class="box-card box-scoll card-border-radius">
      <el-form class='setting-form' label-position='left' label-width="80px" >
        <el-form-item label='网站名称'>
          <el-input class='' placeholder="请输入网站名称" @change='nameChange' :value='siteinfo.name' >
          </el-input>
        </el-form-item>
        <el-form-item label="网站标题">
          <el-input class='' placeholder="网站标题" @change='titleChange' :value='siteinfo.title' >
          </el-input>
        </el-form-item>
        <el-form-item label="网站LOGO">
          <el-input class='' placeholder="请输入Logo链接" @change='logoChange' :value='siteinfo.logo' >
          </el-input>
        </el-form-item>
        <el-form-item label="网站版权">
          <el-input class='' placeholder="请输入网站版权归属" @change='copyRightChange' :value='siteinfo.copyright' >
          </el-input>
        </el-form-item>
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
  mounted () {
    this.getSiteInfo(this.$compUtils.setSiteInfo)
  },
  data () {
    return {
      siteinfo: {
        name: '',
        title: '',
        logo: '',
        copyright: ''
      }
    }
  },
  methods: {
    nameChange (val) {
      val ? this.siteinfo.name = val : null
    },
    titleChange (val) {
      val ? this.siteinfo.title = val : null
    },
    logoChange (val) {
      val ? this.siteinfo.logo = val : null
    },
    copyRightChange (val) {
      val ? this.siteinfo.copyright = val : null
    },
    certainUpdate () {
      this.siteinfo.name && this.siteinfo.title ? this.updateSiteInfo(this.siteinfo) : null
    },
    updateSiteInfo (newInfo, callback) {
      let _self = this
      _self.$api.put('site', _self.siteinfo, (er) => {}, (res) => {
        res.code === 0 ? _self.$emit('update-systemname-content', newInfo) && (callback ? callback(newInfo) : null) : null
      })
    },
    getSiteInfo (callback) {
      let _self = this
      _self.$api.get('site', null, (er) => {}, (res) => {
        if (res.code === 0) {
          _self.siteinfo = res.data
          callback ? callback(_self.siteinfo) : null
        }
      })
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

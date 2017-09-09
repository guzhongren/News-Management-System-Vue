<template>
  <footer class='cmsFooter'>
    <p>Posted by: Congred</p>
    <p>Copyright &copy 2014 - 2017 CONGRED. All Rights Reserved {{siteinfo.copyright}} 备案号:京ICP备17003922号-1.</p>
  </footer>
</template>
<script>
  export default {
    props: ['siteInfo'],
    mounted () {
      this.siteinfo = this.siteInfo
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
    }
  }
</script>
<style scoped>
  .cmsFooter{
    position: absolute;
    bottom: 0px;
    text-align: center;
    width: 100%;
  }
</style>

<template>
  <div>list</div>
</template>
<script>
  export default {
    props: ['articleList'],
    data () {
      return {
        list: this.ArcticleList
      }
    },
    mounted () {
      this.displaylist()
    },
    methods: {
      displaylist (aList) {
        console.log(aList)
      }
    }
  }
</script>
<style>
</style>

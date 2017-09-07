<template>
  <div class='per-cms-content'>
    <!-- display per content -->
    <base-setting v-if='"baseSetting" === currentmenu'></base-setting>
    <menu-manager v-else-if='"menuManager" === currentmenu'></menu-manager>
    <user-manager v-else='"UserManager" === currentmenu'></user-manager>
  </div>
</template>
<script>
import BaseSetting from './BaseSetting'
import MemuManager from './MenuManager'
import UserManager from './UserManager'
export default {
  props: ['currentMenuItem'],
  components: {
    'base-setting': BaseSetting,
    'menu-manager': MemuManager,
    'user-manager': UserManager
  },
  created () {
    // this.currentMenuItem = this.contents[this.currentMenuItem].component
  },
  mounted: function () {
  },
  data () {
    return {
      currentmenu: this.currentMenuItem ? this.currentMenuItem : 'baseSetting'
    }
  },
  methods: {
    getCurrentMenuItem () {
    }
  },
  watch: {
    'currentMenuItem': function (val, oldValue) {
      val === oldValue ? null : this.currentmenu = val
    }
  }
}
</script>
<style>
</style>

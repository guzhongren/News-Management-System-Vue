<template>
  <div class='per-cms-content'>
    <!-- display per content -->
    <base-setting @update-systemname-content='updataSystemName' v-if='"baseSetting" === currentmenu'></base-setting>
    <menu-manager v-else-if='"menuManager" === currentmenu'></menu-manager>
    <user-manager v-else='"UserManager" === currentmenu'></user-manager>
  </div>
</template>
<script>
import BaseSetting from './BaseSetting'
import MemuManager from './MenuManager'
import UserManager from './UserManager'
export default {
  props: ['currentMenuItem', 'systemName'],
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
      currentmenu: this.currentMenuItem ? this.currentMenuItem : 'baseSetting',
      siteinfo: {
        name: '',
        title: '',
        logo: '',
        copyright: ''
      }
    }
  },
  methods: {
    // update system once
    updataSystemName (newSiteInfo) {
      this.siteinfo = newSiteInfo
      this.$emit('update-system-info', this.siteinfo)
    },
    getCurrentMenuItem () {
    }
  },
  watch: {
    'currentMenuItem': function (val, oldValue) {
      val === oldValue ? null : this.currentmenu = val
    },
    'systemName': function (value, oldValue) {
      value === oldValue ? null : this.appTitle = value
    }
  }
}
</script>
<style>
</style>

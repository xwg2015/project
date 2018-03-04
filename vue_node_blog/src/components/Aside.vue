<template>
  <aside class="layout-aside">
    <Affix :offset-top="15">
      <Menu theme="dark" :active-name="activeName" width="auto" :open-names="[openName]" @on-select="changeMenu">
        <Submenu name="system">
          <template slot="title">
            <Icon type="android-settings"></Icon>
            系统后台
          </template>
          <MenuItem name="/system/user">用户管理</MenuItem>
        </Submenu>
        <Submenu name="blog">
          <template slot="title">
            <Icon type="ios-book"></Icon>
            个人博客后台
          </template>
          <MenuItem name="/blog/article">文章管理</MenuItem>
          <MenuItem name="/blog/project">项目管理</MenuItem>
          <MenuItem name="/blog/resume">简历管理</MenuItem>
        </Submenu>
        <Submenu name="check">
          <template slot="title">
            <Icon type="android-train"></Icon>
            铁路检查后台
          </template>
          <MenuItem name="/check/summary">汇总</MenuItem>
        </Submenu>
        <Submenu name="bxj">
          <template slot="title">
            <Icon type="ios-basketball"></Icon>
            步行街·热后台
          </template>
          <MenuItem name="/bxj/tmp">占位</MenuItem>
        </Submenu>
      </Menu>
    </Affix>
  </aside>
</template>

<style lang="stylus">
  .layout-aside {
    height: calc(100vh - 160px);
    overflow-y: auto;
  }
</style>

<script>
  export default {
    name: 'aside',
    data () {
      return {
        activeName: '',
        openName: 'system'
      }
    },
    created () {
      let reg = /\/(.*)\//
      this.activeName = this.$route.path
      this.openName = this.$route.path.match(reg)[1]
    },
    methods: {
      changeMenu: function (name) {
        this.$router.push({path: name})
      }
    }
  }
</script>

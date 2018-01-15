<template>
  <section class="mod-header" :class="[{ 'other-header': isOther }]">
    <h1>熊文刚的博客</h1>
    <Logo class="logo"></Logo>
    <ul class="nav">
      <li><a href="/" ref="index" :class="{'active': !isOther}">主页</a></li>
      <li><a href="/article/list" ref="article">文章</a></li>
      <li><a href="/project/list" ref="project">项目</a></li>
      <li><a href="">简历</a></li>
      <li><a href="http://xiongwengang.xyz/admin" target="_blank">传说后台</a></li>
    </ul>
  </section>
</template>

<script>
  import Logo from './Logo'
  export default {
    name: 'Header',
    components: {
      Logo
    },
    props: {
      isOther: Boolean,
      default: false
    },
    mounted () {
      if (this.isOther) {
        this.$refs[location.pathname.split('/')[1]].className = 'active'
      }
    }
  }
</script>

<style lang="sass">
  @import '~assets/sassCore/_function.scss'

  .mod-header
    @include display-flex()
    @include justify-content(center)
    @include align-items()
    position: relative
    z-index: 1
    height: 80px
    h1
      text-indent: -9999px
    .logo
      position: absolute
      top: 28px
      left: 100px
    .nav
      @include display-flex()
      a
        margin: 0 32px
        color: rgba($white, 0.5)
      a:hover, a.active, .nuxt-link-active
        color: $white
      a:hover
        transition: 0.5s
  .other-header
    background-color: $white
    .nav
      a
        color: lighten($themeColor, 40%)
      a:hover, a.active, .nuxt-link-active
        color: $themeColor
</style>

<template>
  <section class="mod-header" :class="[{ 'other-header': isOther }]">
    <h1>熊文刚的博客</h1>
    <Logo class="logo"></Logo>
    <ul class="nav">
      <li><a href="/" ref="index" :class="{'active': !isOther}">主页</a></li>
      <li><a href="/article/technical" ref="article">文章</a></li>
      <li><a href="/project/list" ref="project">项目</a></li>
      <li class="resume">
        <a href="javascript:;">简历</a>
        <div class="tip">目前在职</div>
      </li>
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
    @include flex(0 0 auto)
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
        margin: 0 $baseGap * 1.5
        color: rgba($white, 0.5)
      a:hover, a.active, .nuxt-link-active
        color: $white
      a:hover
        transition: $baseTransition / 2
    .resume
      position: relative
      a:hover + .tip
        @include opacity(100)
    .tip
      position: absolute
      top: 32px
      left: 50%
      width: 100px
      margin-left: -50px
      padding: $baseGap / 4
      text-align: center
      background-color: rgba($white, 0.8)
      border-radius: $baseRadius
      transition: $baseTransition cubic-bezier(.22, .58, .12, .98)
      @include opacity(0)
      &:after
        content: ''
        position: absolute
        top: -8px
        left: 50%
        margin-left: -8px
        @include triangle('top', 8px, rgba($white, 0.8))
  .other-header
    background-color: $white
    .nav
      a
        color: lighten($themeColor, 40%)
      a:hover, a.active, .nuxt-link-active
        color: $themeColor
</style>

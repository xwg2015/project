<template>
  <section class="page page-project">
    <VHeader :is-other="true"></VHeader>
    <section class="main">
      <div class="mod-shadow bg"></div>
      <ul class="list">
        <li class="mod-shadow item">
          <div class="img-wrap"></div>
          <div class="info">
            <h2 class="title">XXX项目</h2>
            <p class="about">项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介</p>
            <div class="links">
              <a href="">源码地址</a>
              <a href="">在线预览</a>
            </div>
          </div>
        </li>
        <li class="mod-shadow item">
          <div class="img-wrap"></div>
          <div class="info">
            <h2 class="title">XXX项目</h2>
            <p class="about">项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介</p>
            <div class="links">
              <a href="">源码地址</a>
              <a href="">在线预览</a>
            </div>
          </div>
        </li>
        <li class="mod-shadow item">
          <div class="img-wrap"></div>
          <div class="info">
            <h2 class="title">XXX项目</h2>
            <p class="about">项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介</p>
            <div class="links">
              <a href="">源码地址</a>
              <a href="">在线预览</a>
            </div>
          </div>
        </li>
      </ul>
    </section>
    <VFooter></VFooter>
  </section>
</template>

<script>
  import VHeader from '../../components/Header'
  import VFooter from '../../components/Footer'

  export default {
    components: {
      VHeader,
      VFooter
    },
    data () {
      return {
        list: [
          {
            title: ''
          }
        ]
      }
    },
    mounted () {
      this.computeStyle()
    },
    methods: {
      computeStyle () {
        let items = document.querySelectorAll('.item')
        items.forEach((val, idx, arr) => {
          val.style.left = -100 * (idx + 1) + 'px'
        })
      }
    }
  }
</script>

<style lang="sass">
  @import '../../assets/sassCore/_function.scss'

  .page-project
    .main
      width: $mainWidth
      margin-bottom: 50px
      @include center-block()
    .bg
      height: 240px
      margin: 50px 0
      background-image: url(../../static/image/project-bg.png)
      background-size: cover
      background-position: top center
    .item
      @include display-flex()
      position: relative
      padding: 30px 50px
      margin-bottom: 20px
      background-color: $white
      border-radius: 2px
      @include animation(itemMove 1s ease)
      @include animation-fill-mode(forwards)
    .img-wrap
      width: 270px
      height: 180px
      margin-right: 30px
      background-image: url(../../static/image/test.jpg)
      background-size: cover
      background-position: center
    .info
      position: relative
      width: 690px
    .title
      font-size: 20px
      margin-bottom: 10px
    .about
      text-align: justify
      line-height: 28px
      font-size: 14px
    .links
      position: absolute
      bottom: 0
      right: 0
      a
        margin-left: 20px
        font-size: 16px
        color: $themeColor
        transtion: 1s
        &:hover
          color: lighten($themeColor, 20%)
    @include keyframes (itemMove)
      from
        @include opacity(0)
      to
        left: 0
        @include opacity(100)
</style>

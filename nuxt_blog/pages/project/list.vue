<template>
  <section class="page page-project">
    <VHeader :is-other="true"></VHeader>
    <section class="main">
      <div class="mod-shadow bg"></div>
      <ul class="list">
        <li class="mod-shadow item" v-for="(item, index) in list" :key="index">
          <div class="img-wrap" :style="`background-image: url(//xiongwengang.xyz${item.cover})`"></div>
          <div class="info">
            <h2 class="title">{{ item.name }}</h2>
            <p class="about" v-html="item.about.replace(/[\r\n]/g, '<br />')"></p>
            <div class="links">
              <a href="https://github.com/JustLikeU/project" target="_blank">源码地址</a>
              <a :href="item.link" target="_blank">在线预览</a>
            </div>
          </div>
        </li>
      </ul>
      <Loading :loading="loading" :hasMore="hasMore"></Loading>
    </section>
    <VFooter></VFooter>
  </section>
</template>

<script>
  import VHeader from '~/components/Header'
  import VFooter from '~/components/Footer'
  import Loading from '~/components/Loading'
  import axios from 'axios'

  export default {
    components: {
      VHeader,
      VFooter,
      Loading
    },
    asyncData ({ params, error }) {
      return axios.get('http://xiongwengang.xyz/api/blog/getProject?pageCurrent=1&pageSize=3').then((res) => {
        return { list: res.data.data }
      }).catch((e) => {
        error({ statusCode: 404, message: '接口请求报错！' })
      })
    },
    data () {
      return {
        curPage: 1,
        pageSize: 3,
        loading: false,
        hasMore: true
      }
    },
    mounted () {
      this.computeStyle()
      window.addEventListener('scroll', () => {
        let srcollTop = document.body.scrollTop || document.documentElement.scrollTop
        let clientHeight = window.innerHeight
        let scrollHeight = document.body.scrollHeight || document.documentElement.scrollHeight
        let page = this.curPage + 1
        setTimeout(() => {
          if (srcollTop + clientHeight === scrollHeight && this.hasMore) {
            this.loading = true
            axios.get(`http://xiongwengang.xyz/api/blog/getProject?pageCurrent=${page}&pageSize=${this.pageSize}`).then((res) => {
              if (res.data.data.length > 0) {
                this.hasMore = true
                this.curPage = page
                this.list = this.list.concat(res.data.data)
              } else {
                this.hasMore = false
              }
            })
          }
        }, 500)
      }, false)
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
  @import '~assets/sassCore/_function.scss'

  .page-project
    .main
      width: $mainWidth
      margin-bottom: 50px
      @include center-block()
    .bg
      height: 240px
      margin: 50px 0
      background-image: url(~static/image/project-bg.png)
      background-size: cover
      background-position: top center
    .item
      @include display-flex()
      @include justify-content()
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
      background-image: url(~static/image/test.jpg)
      background-size: 100%
      background-position: center
    .info
      position: relative
      width: 590px
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

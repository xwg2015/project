<template>
  <section class="page page-article-detail">
    <VHeader :is-other="true"></VHeader>
    <LayoutMain>
      <template slot="left">
        <div class="mod-shadow article">
          <div class="cover" :style="`background-image: url(//xiongwengang.xyz${detail.cover})`"></div>
          <div class="detail">
            <header class="header">
              <h2 class="title">{{ detail.title }}</h2>
              <div class="info">
                <Tags :tags="detail.tags.split(',')"></Tags>
                <div class="time">更新于 {{ detail.updateTime }}</div>
              </div>
            </header>
            <article class="content">
              <mavon-editor
                v-model="detail.content"
                :ishljs="true"
                :editable="false"
                :toolbarsFlag="false"
                :subfield="false"
                default_open="preview"/>
            </article>
            <div id="SOHUCS" sid="cytppmhxq"></div>
          </div>
        </div>
      </template>
      <template slot="right">
        <SideCard title="热门推荐" :data="list" v-fixed>
          <template slot="articles" scope="props">
            <dd>
              <a :href="props.url" v-ripple>
                <h3>{{props.title}}</h3>
              </a>
            </dd>
          </template>
        </SideCard>
      </template>
    </LayoutMain>
    <VFooter></VFooter>
    <BackTop :distance="100"></BackTop>
  </section>
</template>

<script>
  import VHeader from '~/components/Header'
  import VFooter from '~/components/Footer'
  import LayoutMain from '~/components/LayoutMain'
  import Tags from '~/components/Tags'
  import SideCard from '~/components/SideCard'
  import BackTop from '~/components/BackTop'
  import axios from 'axios'

  export default {
    name: 'ArticleList',
    components: {
      VHeader,
      VFooter,
      LayoutMain,
      Tags,
      SideCard,
      BackTop
    },
    asyncData ({ params, error }) {
      return axios.get(`http://xiongwengang.xyz/api/blog/getArticleDetail?id=${params.id}`).then((res) => {
        return { detail: res.data.data[0] }
      }).catch((e) => {
        error({ statusCode: 404, message: '接口请求报错！' })
      })
    },
    data () {
      return {
        list: [
          {
            url: '1',
            title: 'WebP 在减少图片体积和流量上的效果如何？—— WebP 技术实践分享'
          },
          {
            url: '2',
            title: 'WebP 在减少图片体积'
          },
          {
            url: '3',
            title: 'WebP 在减少图片体积和流量上'
          },
          {
            url: '4',
            title: 'WebP 在减少图片体积和流量上的效果如何？—— WebP 技术实践分享'
          },
          {
            url: '5',
            title: 'WebP 在减少图片体积和流量上的效果如何？'
          }
        ]
      }
    },
    mounted () {
      this.getComment()
    },
    methods: {
      getComment () {
        var appid = 'cytppmhxq'
        var conf = 'prod_270829c6f8e17e9e1ac2f756f6335fd2'
        var loadJs = function (d, a) {
          var c = document.getElementsByTagName('head')[0] || document.head || document.documentElement
          var b = document.createElement('script')
          b.setAttribute('type', 'text/javascript')
          b.setAttribute('charset', 'UTF-8')
          b.setAttribute('src', d)
          if (typeof a === 'function') {
            if (window.attachEvent) {
              b.onreadystatechange = function () {
                var e = b.readyState
                if (e === 'loaded' || e === 'complete') {
                  b.onreadystatechange = null
                  a()
                }
              }
            } else {
              b.onload = a
            }
          }
          c.appendChild(b)
        }
        loadJs('http://changyan.sohu.com/upload/changyan.js', function () {
          window.changyan.api.config({appid: appid, conf: conf})
        })
      }
    }
  }
</script>

<style lang="sass">
  @import '~assets/sassCore/_function.scss'

  .page-article-detail
    .markdown-body
      line-height: $baseFontSize * 2
      color: $themeColor
      h1
        display: none
    .v-note-wrapper .v-note-panel
      box-shadow: none
    .v-note-wrapper .v-note-panel .v-note-show .v-show-content, .v-note-wrapper .v-note-panel .v-note-show .v-show-content-html
      padding: 0
      text-align: justify
      background-color: transparent
    .article
      background-color: $white
      border-radius: $baseRadius
      margin-bottom: $baseGap
    .detail
      padding: $baseGap * 2
    .header
      border-bottom: 1px solid rgba($themeColor, 0.05)
    .cover
      height: $baseImgHeight * 12
      background-image: url(~static/image/test.jpg)
      background-position: center
      background-size: cover
      border-radius: $baseRadius $baseRadius 0 0
      overflow: hidden
    .title
      margin-bottom: $baseGap
      line-height: $baseHeight / 2
      font-size: 36px
      text-align: justify
    .info
      @include display-flex()
      @include justify-content()
      @include align-items()
      margin-bottom: $baseGap / 2
    .content
      margin-bottom: 50px
      line-height: $baseFontSize * 2
      font-size: $articleFontSize
      text-align: justify
    .time
      color: lighten($themeColor, 40%)
</style>

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
                <div class="time">更新于 {{ detail.updateTime | formatDate }}</div>
              </div>
            </header>
            <article class="content" v-html="markdownRender(detail.content)"></article>
            <div id="SOHUCS" sid="cytppmhxq"></div>
          </div>
        </div>
      </template>
      <template slot="right">
        <SideCard title="热门推荐" :data="recommendList" v-fixed>
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
  import MarkdownIt from 'markdown-it'
  import hljs from 'highlightjs'
  import 'highlightjs/styles/monokai_sublime.css'
  import { formatDate } from '~/assets/lib/formatDate.js'

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
    async asyncData ({ params, error }) {
      let [detailRes, recommendRes] = await Promise.all([
        axios.get(`http://xiongwengang.xyz/api/blog/getArticleDetail?id=${params.id}`),
        axios.get(`http://xiongwengang.xyz/api/blog/getArticleRecommend?id=${params.id}`)
      ]).catch((e) => {
        error({ statusCode: 404, message: '接口请求报错！' })
      })
      return {
        detail: detailRes.data.data[0],
        recommendList: recommendRes.data.data
      }
    },
    data () {
      return {
      }
    },
    mounted () {
      this.getComment()
    },
    filters: {
      formatDate (time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }
    },
    methods: {
      markdownRender (content) {
        let md = new MarkdownIt({
          html: true,
          xhtmlOut: true,
          breaks: true,
          linkify: true,
          typographer: true,
          highlight: (str, lang) => {
            if (lang && hljs.getLanguage(lang)) {
              try {
                return '<pre class="hljs"><code>' +
                      hljs.highlight(lang, str, true).value +
                      '</code></pre>'
              } catch (__) {}
            }
            return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
          }
        })
        return md.render(content)
      },
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
      padding-top: $baseGap / 2
      margin-bottom: 50px
      line-height: $baseFontSize * 2
      font-size: $articleFontSize
      text-align: justify
      h1
        display: none
      h2, h3, h4, h5, h6
        line-height: 2
      p, .hljs
        margin-bottom: $baseGap
      p img
        text-align: center
    .time
      color: lighten($themeColor, 40%)
</style>

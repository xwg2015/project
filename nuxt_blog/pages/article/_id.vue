<template>
  <section class="page page-article-detail">
    <VHeader :is-other="true"></VHeader>
    <LayoutMain>
      <template slot="left">
        <div class="mod-shadow article">
          <div class="cover"></div>
          <div class="detail">
            <h2 class="title">Safari支持Service Worker，PWA还有多久爆发？</h2>
            <div class="info">
              <Tags></Tags>
              <div class="time">2018-01-08 12:23:22</div>
            </div>
            <article class="content">
              在之前的文章《PWA 将带来新一轮大前端技术洗牌？》中，我们回顾了 Web 在移动时代遭遇的两大枷锁，并就PWA是否能真正弥补 Web 劣势进行了分析，同时，提出“根据当前的发展趋势，PWA 将会带来 Web App 的大量需求，新一轮大前端技术洗牌很可能近在眼前了。”当时，有同学评论说“首先等Safari……”，也有很多人对苹果的态度不看好。而在今天苹果发布的爆炸性新闻《Release Notes for Safari Technology Preview 46》中，我们看到，如今，苹果不再是悄悄进行 Service Worker 的开发了，在 Safari 46 技术预览版里，新的桌面版 Safari 里将会默认打开 Service Worker！Service Worker 章节的第一句话：“Offline applications are important to the web.”，表明了苹果对于 Service Worker 是很看重的，也是为什么苹果前阵子“悄悄“的开发 Service Worker，这么快就能够在 Safari 上体验到的原因。虽然目前 Safari 技术预览版还只支持 Mac，但是苹果的态度已经非常明确了！同时，Safari 也在进行 PWA 的另一个核心特性 Web App Manifest 的开发（《Safari支持Service Worker了》）！PWA还有多久爆发？欢迎大家留言评论！Safari为PWA献上了圣诞大礼！我们也将为OpenWeb开发者们献上礼品！截止到2017年12月24日18：00，公众号原文下留言点赞数排前三名的同学将获得精美礼品一份！同时，也欢迎大家点击阅读原文，了解基于 Vue 的 PWA 解决方案——Lavas！
            </article>
            <div id="SOHUCS" sid="cytppmhxq"></div>
          </div>
        </div>
      </template>
      <template slot="right">
        <SideCard title="相关推荐" :data="list" v-fixed>
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
  import VHeader from '../../components/Header'
  import VFooter from '../../components/Footer'
  import LayoutMain from '../../components/LayoutMain'
  import Tags from '../../components/Tags'
  import SideCard from '../../components/SideCard'
  import BackTop from '../../components/BackTop'

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
  @import '../../assets/sassCore/_function.scss'

  .page-article-detail
    .article
      background-color: $white
      border-radius: 2px
      margin-bottom: 20px
    .detail
      padding: 50px
    .cover
      height: 216px
      background-image: url(../../static/image/test.jpg)
      background-position: center
      background-size: cover
      border-radius: 2px 2px 0 0
      overflow: hidden
    .title
      margin-bottom: 20px
      line-height: 50px
      font-size: 36px
      text-align: justify
    .info
      @include display-flex()
      @include justify-content()
      @include align-items()
      margin-bottom: 30px
    .content
      margin-bottom: 50px
      line-height: 32px
      font-size: 16px
      text-align: justify
    .time
      color: lighten($themeColor, 40%)
</style>

<template>
  <section class="page page-article-list">
    <VHeader :is-other="true"></VHeader>
    <div class="tab">
      <h2 class="mod-shadow tab-item technical-item" :class="{ 'active': curTab === 'technical' }" @click="tabChange('technical')">技术</h2>
      <h2 class="mod-shadow tab-item journal-item" :class="{ 'active': curTab === 'journal' }" @click="tabChange('journal')">! 技术</h2>
    </div>
    <LayoutMain>
      <template slot="left">
        <div class="tab-content technical-content" v-show="curTab === 'technical'">
          <ul class="article-list">
            <li class="mod-shadow article-item">
              <h3 class="title"><a href="/article/2" target="_blank">Safari 支持 Service Worker了</a></h3>
              <div class="about">
                <p class="text">在之前的文章《PWA 将带来新一轮大前端技术洗牌？》中，我们回顾了 Web 在移动时代遭遇的两大枷锁，并就PWA是否能真正弥补 Web 劣势进行了分析，同时，提出“根据当前的发展趋势，PWA 将会带来 Web App 的大量需求…</p>
                <div class="img" style="background-image: url(../../static/image/test.jpg)"></div>
              </div>
              <Tags></Tags>
            </li>
            <li class="mod-shadow article-item">
              <h3 class="title"><a href="/article/2" target="_blank">Safari 支持 Service Worker了</a></h3>
              <div class="about">
                <p class="text">在之前的文章《PWA 将带来新一轮大前端技术洗牌？》中，我们回顾了 Web 在移动时代遭遇的两大枷锁，并就PWA是否能真正弥补 Web 劣势进行了分析，同时，提出“根据当前的发展趋势，PWA 将会带来 Web App 的大量需求…</p>
                <div class="img" style="background-image: url(../../static/image/test.jpg)"></div>
              </div>
              <Tags></Tags>
            </li>
            <li class="mod-shadow article-item">
              <h3 class="title"><a href="/article/2" target="_blank">Safari 支持 Service Worker了</a></h3>
              <div class="about">
                <p class="text">在之前的文章《PWA 将带来新一轮大前端技术洗牌？》中，我们回顾了 Web 在移动时代遭遇的两大枷锁，并就PWA是否能真正弥补 Web 劣势进行了分析，同时，提出“根据当前的发展趋势，PWA 将会带来 Web App 的大量需求…</p>
                <div class="img" style="background-image: url(../../static/image/test.jpg)"></div>
              </div>
              <Tags></Tags>
            </li>
            <li class="mod-shadow article-item">
              <h3 class="title"><a href="/article/2" target="_blank">Safari 支持 Service Worker了</a></h3>
              <div class="about">
                <p class="text">在之前的文章《PWA 将带来新一轮大前端技术洗牌？》中，我们回顾了 Web 在移动时代遭遇的两大枷锁，并就PWA是否能真正弥补 Web 劣势进行了分析，同时，提出“根据当前的发展趋势，PWA 将会带来 Web App 的大量需求…</p>
                <div class="img" style="background-image: url(../../static/image/test.jpg)"></div>
              </div>
              <Tags></Tags>
            </li>
          </ul>
        </div>
        <div class="tab-content journal-content" v-show="curTab === 'journal'">
          <ul class="article-list">
            <li class="mod-shadow article-item">
              <h3 class="title"><a href="/2" target="_blank">Safari 支持 Service Worker了</a></h3>
              <div class="about">
                <p class="text">在之前的文章《PWA 将带来新一轮大前端技术洗牌？》中，我们回顾了 Web 在移动时代遭遇的两大枷锁，并就PWA是否能真正弥补 Web 劣势进行了分析，同时，提出“根据当前的发展趋势，PWA 将会带来 Web App 的大量需求…</p>
                <div class="img" style="background-image: url(../../static/image/test.jpg)"></div>
              </div>
              <Tags></Tags>
            </li>
          </ul>
        </div>
        <div class="mod-shadow loading">正在加载中...</div>
      </template>
      <template slot="right">
        <div v-fixed>
          <div class="mod-shadow search">
            <i class="iconfont icon-search"></i>
            <input type="text" placeholder="搜索文章">
          </div>
          <SideCard title="标签" row="multi" :data="list">
            <template slot="tags" scope="props">
              <dd>
                <a :href="props.url" v-ripple>
                  <h3>{{ props.tagName }}</h3>
                  <span class="num">{{ props.num }}</span>
                </a>
              </dd>
            </template>
          </SideCard>
        </div>
      </template>
    </LayoutMain>
    <VFooter></VFooter>
    <BackTop :distance="80"></BackTop>
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
        curTab: 'technical',
        list: [
          {
            name: 'javascript',
            num: '21',
            url: 'javascript'
          },
          {
            name: 'css',
            num: '8',
            url: 'css'
          },
          {
            name: 'html',
            num: '2',
            url: 'html'
          }
        ]
      }
    },
    methods: {
      tabChange (type) {
        this.curTab = type
        this.$bus.$emit('is-clicked', true)
      }
    }
  }
</script>

<style lang="sass">
  @import '../../assets/sassCore/_function.scss'

  .page-article-list
    .tab
      @include display-flex()
      width: $mainWidth
      margin: 30px auto 0
      .tab-item
        width: 495px
        height: 100px
        line-height: 100px
        text-align: center
        font-size: 20px
        background-size: cover
      .technical-item, .journal-item
        cursor: pointer
        color: $themeColor
      .technical-item.active, .journal-item.active
        color: $white
      .technical-item
        background-image: url('../../static/image/technical.png')
      .technical-item.active
        background-image: url('../../static/image/technical-active.png')
      .journal-item
        background-image: url('../../static/image/journal.png')
      .journal-item.active
        background-image: url('../../static/image/journal-active.png')
    .left
      .article-item
        width: 620px
        height: 184px
        padding: 30px 50px
        margin-bottom: 20px
        background-color: $white
        border-radius: 2px
      .title
        margin-bottom: 10px
        font-size: 20px
        a
          color: $themeColor
          transtion: 1s
      .title:hover
        a
          color: lighten($themeColor, 20%)
      .about
        @include display-flex()
        @include justify-content()
        margin-bottom: 10px
      .text
        width: 410px
        text-align: justify
        line-height: 28px
      .img
        width: 180px
        height: 108px
        background-position: center
        background-size: cover
        background-color: $themeColor
      .loading
        line-height: 50px
        text-align: center
        background-color: $white
    .right
      .search
        @include display-flex()
        @include justify-content(flex-start)
        @include align-items()
        width: 240px
        height: 70px
        margin-bottom: 20px
        font-size: 16px
        background-color: $white
        border-radius: 2px
        input
          border: none
          color: lighten($themeColor, 40%)
          &::-webkit-input-placeholder
            color: lighten($themeColor, 40%)
      .icon-search
          margin-left: 20px
          margin-right: 10px
          margin-top: -2px
          color: lighten($themeColor, 40%)
</style>

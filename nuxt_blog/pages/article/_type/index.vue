<template>
  <section class="page page-article-list">
    <VHeader :is-other="true"></VHeader>
    <div class="tab">
      <h2 class="mod-shadow tab-item technical-item" :class="{ 'active': curTab === 'technical' }" @click="tabChange('technical')">技术</h2>
      <h2 class="mod-shadow tab-item journal-item" :class="{ 'active': curTab === 'journal' }" @click="tabChange('journal')">! 技术</h2>
    </div>
    <LayoutMain>
      <template slot="left">
        <div class="tab-content technical-content" v-show="curTab === 'technical'" ref="tabContent">
          <ul class="article-list">
            <li class="mod-shadow article-item" v-for="item in list" :key="item._id">
              <h3 class="title"><a :href="`/article/${item._id}`" target="_blank">{{  item.title }}</a></h3>
              <div class="about">
                <p class="text">{{ item.about }}</p>
                <div class="img" :style="`background-image: url(//xiongwengang.xyz${item.cover})`"></div>
              </div>
              <Tags :tags="item.tags"></Tags>
            </li>
          </ul>
        </div>
        <div class="tab-content journal-content" v-show="curTab === 'journal'">
          <ul class="article-list">
            <li class="mod-shadow article-item" v-for="item in list" :key="item._id">
              <h3 class="title"><a :href="`/article/${item._id}`" target="_blank">{{  item.title }}</a></h3>
              <div class="about">
                <p class="text">{{ item.about }}</p>
                <div class="img" :style="`background-image: url(//xiongwengang.xyz${item.cover})`"></div>
              </div>
              <Tags :tags="item.tags"></Tags>
            </li>
          </ul>
        </div>
        <Loading :loading="loading" :hasMore="hasMore"></Loading>
      </template>
      <template slot="right">
        <div v-fixed="228">
          <div class="mod-shadow search">
            <i class="iconfont icon-search"></i>
            <input type="text" placeholder="搜索文章">
          </div>
          <SideCard title="标签" row="multi" :data="tagList">
            <template slot="tags" scope="props">
              <dd class="dd-tags">
                <a :href="`${curTab}/${props.tagName}`" v-ripple>
                  <h3>{{ props.tagName }}</h3>
                  <span class="num">{{ props.count }}</span>
                </a>
              </dd>
            </template>
          </SideCard>
        </div>
      </template>
    </LayoutMain>
    <VFooter></VFooter>
    <BackTop :distance="74"></BackTop>
  </section>
</template>

<script>
  import VHeader from '~/components/Header'
  import VFooter from '~/components/Footer'
  import LayoutMain from '~/components/LayoutMain'
  import Tags from '~/components/Tags'
  import SideCard from '~/components/SideCard'
  import BackTop from '~/components/BackTop'
  import Loading from '~/components/Loading'
  import axios from 'axios'

  export default {
    name: 'ArticleList',
    components: {
      VHeader,
      VFooter,
      LayoutMain,
      Tags,
      SideCard,
      BackTop,
      Loading
    },
    asyncData ({ params, error }) {
      let opts = {
        baseUrl: 'http://xiongwengang.xyz/api/blog/getArticle',
        pageCurrent: 1,
        pageSize: 3
      }
      let tag = params.tag ? `&tag=${encodeURI(params.tag)}` : ''
      let query = `?pageCurrent=${opts.pageCurrent}&pageSize=${opts.pageSize}&type=${params.type}${tag}`
      return axios.get(opts.baseUrl + query).then((res) => {
        return {
          list: res.data.data,
          tagList: res.data.tags,
          curTab: params.type
        }
      }).catch((e) => {
        error({ statusCode: 404, message: '接口请求报错！' })
      })
    },
    data () {
      return {
        curPage: 1,
        loading: false,
        hasMore: true
      }
    },
    mounted () {
      window.addEventListener('scroll', () => {
        let srcollTop = document.body.scrollTop || document.documentElement.scrollTop
        let clientHeight = window.innerHeight
        let scrollHeight = document.body.scrollHeight || document.documentElement.scrollHeight
        let page = this.curPage + 1
        setTimeout(() => {
          if (srcollTop + clientHeight === scrollHeight && this.hasMore) {
            this.loading = true
            axios.get(`http://xiongwengang.xyz/api/blog/getArticle?pageCurrent=${page}&pageSize=3&type=${this.curTab}`).then((res) => {
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
      tabChange (type) {
        this.$router.push(type)
      }
    }
  }
</script>

<style lang="sass">
  @import '~assets/sassCore/_function.scss'

  .page-article-list
    .tab
      @include display-flex()
      width: $baseWidth
      margin: $baseGap auto 0
      .tab-item
        width: $baseWidth / 2
        line-height: $baseHeight
        text-align: center
        font-size: $titleFontSize
        background-size: cover
      .technical-item, .journal-item
        cursor: pointer
        color: $themeColor
      .technical-item.active, .journal-item.active
        color: $white
      .technical-item
        background-image: url('~static/image/technical.png')
      .technical-item.active
        background-image: url('~static/image/technical-active.png')
      .journal-item
        background-image: url('~static/image/journal.png')
      .journal-item.active
        background-image: url('~static/image/journal-active.png')
    .left
      .article-item
        padding: $baseGap $baseGap * 1.5
        margin-bottom: $baseGap
        background-color: $white
        border-radius: $baseRadius
      .title
        margin-bottom: $baseGap / 2
        font-size: 20px
        a
          color: $themeColor
          transtion: $baseTransition
      .title:hover
        a
          color: lighten($themeColor, 20%)
      .about
        position: relative
        height: $baseImgHeight * 6
        margin-bottom: $baseGap / 2
      .text
        padding-right: $baseImgWidth * 6 + $baseGap
        text-align: justify
        line-height: $baseFontSize * 2
        @include ellipsis(4)
      .img
        position: absolute
        top: 50%
        right: 0
        width: $baseImgWidth * 6
        height: $baseImgHeight * 6
        margin-top: -$baseImgHeight * 3
        background-position: center
        background-size: cover
        background-color: $themeColor
        border-radius: $baseRadius
    .right
      .search
        @include display-flex()
        @include justify-content(flex-start)
        @include align-items()
        height: $baseHeight * 0.6
        margin-bottom: $baseGap
        font-size: $baseFontSize
        background-color: $white
        border-radius: $baseRadius
        input
          border: none
          color: lighten($themeColor, 40%)
          &::-webkit-input-placeholder
            color: lighten($themeColor, 40%)
      .icon-search
          margin-left: $baseGap
          margin-right: $baseGap / 2
          margin-top: -2px
          color: lighten($themeColor, 40%)
</style>

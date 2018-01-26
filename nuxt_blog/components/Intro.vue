<template>
  <section class="mod-intro">
    <img src="~static/image/index-bg.png" alt="bg">
    <div class="tag tag-hk" ref="hk">
      <div class="popover popover-right popover-hk" ref="popover-hk">
        <h2>标签：TVB</h2>
        <p>从小在我妈的带领下，爱上看港剧，也爱上香港这座城市。</p>
        <p>呐，做人呢，最重要的是开心。</p>
      </div>
    </div>
    <div class="title">Hello, I'm Xiong Wengang!</div>
    <div class="scorpio tag tag-scorpio" ref="scorpio">
      <Scorpio></Scorpio>
      <div class="popover popover-right popover-scorpio" ref="popover-scorpio">
        <h2>标签：天蝎座</h2>
        <p>典型天蝎男，外冷(men)内热(sao)，占有欲强，报复心强。</p>
        <p>不管你们信不信星座，反正我是信了。见《为什么我会信星座》</p>
      </div>
    </div>
    <div class="boy" ref="boy">
      <img src="~static/image/boy.png" alt="boy">
      <div class="tag tag-xwg" ref="xwg">
        <div class="popover popover-right popover-xwg" ref="popover-xwg">
          <h2>标签：直男 <s>直男癌</s></h2>
          <p>同时跟中国三大同性♂交往平台（<strong>Github</strong>、<strong>Bilibili</strong>、<strong>虎扑步行街</strong>）打交道，作为直男的我，真的好累。</p>
        </div>
      </div>
      <div class="tag tag-lol" ref="lol">
        <div class="popover popover-left popover-lol" ref="popover-lol">
          <h2>标签：英雄联盟</h2>
          <p>看过WE与CLG.EU八小时的拉锯战，也看过皇族连续两年赢了OMG挺进决赛，更加期待S7能跟曾经大学一起开黑的室友一起去北京鸟巢见证RNG夺冠，奈何。力挺全华班RNG，Uzi加油。</p>
          <p>对了，<strong>大麦网垃圾</strong>。</p>
        </div>
      </div>
      <div class="tag tag-pokemon" ref="pokemon">
        <div class="popover popover-right popover-pokemon" ref="popover-pokemon">
          <h2>标签：Pokémon</h2>
          <p>目标是神奇宝贝大师，曾经无数次幻想能有那样的异次元世界，收服神奇宝贝，打道馆，挑战四大天王。期待口袋妖怪正统作登陆NS!</p>
        </div>
      </div>
    </div>
    <div class="tag tag-cat" ref="cat">
      <img src="~static/image/cat.png" alt="cat">
      <div class="popover popover-right popover-boy" ref="popover-cat">
        <h2>标签：猫奴</h2>
        <p>猫奴 == <strong>抖M</strong> ？ // true</p>
        <p>一日养猫，终生为奴。我想吸猫，我想吸海豹双色布偶妹妹。</p>
        <p>咪咪：喵喵喵？？？</p>
      </div>
    </div>
    <div class="tag tag-girl" ref="girl">
      <img src="~static/image/girl.png" alt="girl">
      <div class="popover popover-right popover-girl" ref="popover-girl">
        <h2>标签：单身狗</h2>
        <p>当我站在维港前，觉得非常的难过，我总觉得，应该是两个人站在这里。</p>
      </div>
    </div>
  </section>
</template>

<script>
  import Scorpio from '~/components/Scorpio'

  export default {
    name: 'Intro',
    components: {
      Scorpio
    },
    data () {
      return {
        tags: ['xwg', 'girl', 'cat', 'scorpio', 'lol', 'pokemon', 'hk'],
        desc: {
          xwg: {
            width: 84,
            height: 104,
            popoverDir: 'right'
          },
          girl: {
            width: 258,
            height: 520,
            popoverDir: 'right'
          },
          cat: {
            width: 123,
            height: 144,
            popoverDir: 'right'
          },
          scorpio: {
            popoverDir: 'right'
          },
          lol: {
            width: 120,
            height: 180,
            popoverDir: 'left'
          },
          pokemon: {
            width: 35,
            height: 65,
            popoverDir: 'right'
          },
          hk: {
            height: 468,
            popoverDir: 'special'
          }
        },
        handlerImageSize: {}
      }
    },
    mounted () {
      this.setImageSize()
      this.handlerImageSize = () => {
        if (window.innerWidth > 1200) {
          this.setImageSize()
        }
      }
      window.addEventListener('resize', this.handlerImageSize, false)
    },
    methods: {
      setImageSize () {
        let oldSize = 1920
        let newSize = window.innerWidth > 1200 ? window.innerWidth : 1200
        let scale = newSize / oldSize

        this.$refs.boy.style.width = 273 * scale + 'px'

        this.tags.forEach((val, idx, arr) => {
          for (let key in this.desc[val]) {
            if (key === 'width' || key === 'height') {
              this.$refs[val].style[key] = this.desc[val][key] * scale + 'px'
            }
          }
          if (this.desc[val].popoverDir === 'left') {
            this.$refs[`popover-${val}`].style.left = -this.$refs[`popover-${val}`].clientWidth - 20 + 'px'
          } else if (this.desc[val].popoverDir === 'right') {
            this.$refs[`popover-${val}`].style.left = this.$refs[val].clientWidth + 20 + 'px'
          } else {
            this.$refs[`popover-${val}`].style.left = this.$refs[val].clientWidth - 200 + 'px'
          }
          this.$refs[`popover-${val}`].style.marginTop = -this.$refs[`popover-${val}`].clientHeight / 2 + 'px'
        })
      }
    },
    beforeDestroy () {
      window.removeEventListener('resize', this.handlerImageSize, false)
    }
  }
</script>

<style lang="sass">
  @import '~assets/sassCore/_function.scss'

  .mod-intro
    position: relative
    margin-top: -80px
    @include transform(translateZ(0))
    .title
      position: absolute
      top: 0
      left: 50%
      width: 500px
      height: 80px
      margin-left: -250px
      font-size: 40px
      font-weight: 100
      line-height: 80px
      color: $white
      background-color: rgba(153, 91, 219, 0.5)
      border: 1px solid #cdafed
      border-radius: 80px
      text-align: center
      @include opacity(0)
      @include animation(titleMove 1s 3s ease)
      @include animation-fill-mode(forwards)
    .tag
      position: absolute
      z-index: 99
      &:hover .popover
        @include animation(popoverMove 1.5s ease)
        @include animation-fill-mode(forwards)
        @include animation-timing-function(cubic-bezier(.22, .58, .12, .98))
    .popover
      position: absolute
      top: 50%
      width: 180px
      min-height: 100px
      padding: $baseGap / 2
      text-align: justify
      font-stretch: normal
      background: rgba($white, 0.8)
      border-radius: $baseRadius
      z-index: 100
      @include transform(scale(0))
      h2
        font-size: 14px
        margin-bottom: 10px
      &:after
        content: ''
        position: absolute
        top: 50%
        margin-top: -8px
    .popover-right:after
      left: -8px
      @include triangle('left', 8px, rgba($white, 0.8))
    .popover-left:after
      right: -8px
      @include triangle('right', 8px, rgba($white, 0.8))
    .scorpio
      position: absolute
      top: 6%
      left: 8%
    .boy
      position: absolute
      top: 32%
      left: 0
      z-index: 100
      @include opacity(0)
      @include animation(boyMove 2s 1s ease)
      @include animation-fill-mode(forwards)
      s
        color: lighten($themeColor, 20%)
      .tag-xwg
        width: 84px
        height: 104px
        top: 0
        left: 32%
      .tag-lol
        width: 120px
        height: 180px
        top: 18%
        left: 24%
      .tag-pokemon
        width: 35px
        height: 65px
        top: 15%
        left: 88%
    .tag-hk
      left: 0
      right: 0
      top: 20%
      width: 80%
      margin: 0 auto
    .tag-cat
      top: 70%
      left: 52%
      z-index: 100
      @include opacity(0)
      @include animation(catMove 2s 1s ease)
      @include animation-fill-mode(forwards)
    .tag-girl
      top: 22%
      left: 35%
      @include transform(scale(0))
      @include opacity(0)
      @include animation(girlMove 2s 2s ease)
      @include animation-fill-mode(forwards)
    @include keyframes(popoverMove)
      from
        @include transform(scale(0))
      to
        @include transform(scale(1))
    @include keyframes(boyMove)
      from
        left: 0
        @include opacity(0)
      to
        left: 34%
        @include opacity(100)
    @include keyframes(catMove)
      from 
        left: 50%
        @include opacity(0)
      to 
        left: 44%
        @include opacity(100)
    @include keyframes(girlMove)
      from 
        top: 22%
        left: 35%
        @include transform(scale(0))
        @include opacity(0)
      to 
        top: 38%
        left: 54%
        @include transform(scale(1))
        @include opacity(100)
    @include keyframes(titleMove)
      from 
        top: 0
        @include opacity(0)
      to 
        top: 120px
        @include opacity(100)
    @include keyframes(scorpioMove)
      to 
        stroke-dashoffset: 0
</style>

<template>
  <section class="mod-intro">
    <img src="../static/image/index-bg.png" alt="bg">
    <div class="title">Hello, I'm Xiong Wengang!</div>
    <!-- <div class="scorpio">
      <svg version="1.1" id="Vrstva_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="368px" height="295px"
        viewBox="0 0 368.3 295.5" style="enable-background:new 0 0 368.3 295.5" xml:space="preserve">
      <path class="st0" d="M356.2,0.5"/>
      <polyline class="st1" points="67.2,98.2 31.2,140.2 83.2,121.2"/>
      <polyline class="st1" points="367.2,41.2 297.2,59.2 258.2,79.2 218.2,106.2 181.2,166.2 169.2,231.2 153.2,295.2 85.2,287.2 24.1,253.2 0.2,185.2 30.9,140.4"/>
      <polyline class="st1" points="352.2,0.2 368,40.3 360.2,91.2"/>
      </svg>
    </div> -->
    <div class="boy" ref="boy">
      <img src="../static/image/boy.png" alt="boy">
      <div class="tag tag-me"></div>
      <div class="tag tag-lol"></div>
      <div class="tag tag-pokemon"></div>
    </div>
    <div class="cat tag tag-mimi" ref="cat">
      <img src="../static/image/cat.png" alt="cat">
    </div>
    <div class="girl tag tag-soulmate" ref="girl">
      <img src="../static/image/girl.png" alt="girl">
    </div>

    <section class="mod-popover">
      
    </section>
  </section>
</template>

<script>
  export default {
    name: 'Intro',
    mounted () {
      this.setImageSize()
      window.onresize = () => {
        if (window.innerWidth > 1200) {
          this.setImageSize()
        }
      }
    },
    methods: {
      setImageSize () {
        let oldSize = 1920
        let newSize = window.innerWidth > 1200 ? window.innerWidth : 1200
        let scale = newSize / oldSize
        this.$refs.boy.style.width = 273 * scale + 'px'
        this.$refs.cat.style.width = 123 * scale + 'px'
        this.$refs.girl.style.width = 258 * scale + 'px'
      }
    }
  }
</script>

<style lang="sass">
  @import '../assets/sassCore/_function.scss'
  .mod-intro
    position: relative
    margin-top: -80px
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
      background-color: red
    .scorpio
      position: absolute
      top: 0
      left: 0
      @include animation(scorpioMove 2s 3s linear)
    .boy
      position: absolute
      top: 36%
      left: 0
      @include opacity(0)
      @include animation(boyMove 2s 0.5s ease)
      @include animation-fill-mode(forwards)
      .tag-me
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
    .cat
      position: absolute
      top: 74%
      left: 52%
      @include opacity(0)
      @include animation(catMove 2s 1s ease)
      @include animation-fill-mode(forwards)
    .girl
      position: absolute
      top: 26%
      left: 35%
      @include transform(scale(0))
      @include opacity(0)
      @include animation(girlMove 2s 2s ease)
      @include animation-fill-mode(forwards)
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
        top: 26%
        left: 35%
        @include transform(scale(0))
        @include opacity(0)
      to 
        top: 42%
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

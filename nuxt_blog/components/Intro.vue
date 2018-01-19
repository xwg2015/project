<template>
  <section class="mod-intro">
    <img src="~static/image/index-bg.png" alt="bg">
    <div class="title">Hello, I'm Xiong Wengang!</div>
    <Scorpio></Scorpio>
    <div class="boy" ref="boy">
      <img src="~static/image/boy.png" alt="boy">
      <div class="tag tag-boy" ref="tag-boy">
        <!-- <div class="popover popover-boy" ref="popover-boy">
          sssjsjsjsjs<br/>
          sssjsjsjsjs<br/>
          sssjsjsjsjs<br/>
        </div> -->
      </div>
      <div class="tag tag-lol" ref="tag-lol">
        <!-- <div class="popover popover-lol" ref="popover-lol">
          sssjsjsjsjs<br/>
          sssjsjsjsjs<br/>
          sssjsjsjsjs<br/>
        </div> -->
      </div>
      <div class="tag tag-pokemon" ref="tag-pokemon">
        <!-- <div class="popover popover-pokemon" ref="popover-pokemon">
          sssjsjsjsjs<br/>
          sssjsjsjsjs<br/>
          sssjsjsjsjs<br/>
        </div> -->
      </div>
    </div>
    <div class="cat tag tag-cat" ref="cat">
      <img src="~static/image/cat.png" alt="cat">
      <div class="popover popover-boy" ref="popover-cat">
        sssjsjsjsjs<br/>
        sssjsjsjsjs<br/>
        sssjsjsjsjs<br/>
      </div>
    </div>
    <div class="girl tag tag-girl" ref="girl">
      <img src="~static/image/girl.png" alt="girl">
      <div class="popover popover-girl" ref="popover-girl">
        sssjsjsjsjs<br/>
        sssjsjsjsjs<br/>
        sssjsjsjsjs<br/>
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
        tags: ['girl', 'cat'],
        desc: {
          girl: {
            width: 258,
            height: 520,
            popoverDir: 'right'
          },
          cat: {
            width: 123,
            height: 144,
            popoverDir: 'right'
          }
        }
      }
    },
    mounted () {
      this.setImageSize()
      window.addEventListener('resize', () => {
        if (window.innerWidth > 1200) {
          this.setImageSize()
        }
      }, false)
    },
    methods: {
      setImageSize () {
        let oldSize = 1920
        let newSize = window.innerWidth > 1200 ? window.innerWidth : 1200
        let scale = newSize / oldSize

        this.tags.forEach((val, idx, arr) => {
          for (let key in this.desc[val]) {
            if (key === 'width' || key === 'height') {
              this.$refs[val].style[key] = this.desc[val][key] * scale + 'px'
              console.log(this.$refs[`popover-${val}`])
            }
          }
          this.$refs[`popover-${val}`].style.left = this.desc[val].width * scale + 20 + 'px'
          this.$refs[`popover-${val}`].style.top = this.desc[val].height / 2 + 'px'
        })

        this.$refs.boy.style.width = 273 * scale + 'px'
        // this.$refs.cat.style.width = 123 * scale + 'px'
        // this.$refs.girl.style.width = 258 * scale + 'px'

        // this.$refs.tagMe.style.width = 84 * scale + 'px'
        // this.$refs.tagMe.style.height = 104 * scale + 'px'
        // this.$refs.tagLol.style.width = 120 * scale + 'px'
        // this.$refs.tagLol.style.height = 180 * scale + 'px'
        // this.$refs.tagPokemon.style.width = 35 * scale + 'px'
        // this.$refs.tagPokemon.style.height = 65 * scale + 'px'
      }
    }
  }
</script>

<style lang="sass">
  @import '~assets/sassCore/_function.scss'

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
    .popover
      position: absolute
      padding: $baseGap / 2
      max-width: 200px
      background: rgba($white, 0.8)
      border-radius: $baseRadius
      z-index: 10
      &:after
        content: ''
        position: absolute
        top: 50%
        left: -8px
        margin-top: -4px
        @include triangle('left', 8px, rgba($white, 0.8))
    .scorpio
      position: absolute
      top: 50px
      left: 120px
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

<template>
  <div
    ref="backTop"
    class="mod-shadow back-top" 
    :class="{'backTopMove': isShow}"
    @click="goTop"
    v-show="isShow">
    <i class="iconfont icon-back-top"></i>
  </div>
</template>

<script>
  export default {
    name: 'BackTop',
    props: {
      distance: {
        type: Number
      }
    },
    data () {
      return {
        isShow: false,
        handlerStyle: {},
        handlerShow: {}
      }
    },
    mounted () {
      this.computeStyle()
      this.computeShow(this.distance)

      this.handlerStyle = () => {
        this.computeStyle()
      }

      this.handlerShow = () => {
        this.computeShow(this.distance)
      }
      window.addEventListener('resize', this.handlerStyle, false)

      window.addEventListener('scroll', this.handlerShow, false)
    },
    methods: {
      computeStyle () {
        if (window.innerWidth < 1200) {
          this.$refs.backTop.style.marginLeft = 262 + (1200 - window.innerWidth) / 2 + 'px'
        } else {
          this.$refs.backTop.style.marginLeft = '262px'
        }
      },
      computeShow (distance) {
        let srcollTop = document.body.scrollTop || document.documentElement.scrollTop
        let clientHeight = window.innerHeight
        let scrollHeight = document.body.scrollHeight || document.documentElement.scrollHeight

        if (srcollTop > 300) {
          this.isShow = true
        } else {
          this.isShow = false
        }
        if (srcollTop + clientHeight + 100 > scrollHeight) {
          this.$refs.backTop.style.bottom = distance + (srcollTop + clientHeight + 100 - scrollHeight) + 'px'
        } else {
          this.$refs.backTop.style.bottom = '100px'
        }
      },
      goTop () {
        window.scrollTo(0, 0)
      }
    },
    beforeDestroy () {
      window.removeEventListener('resize', this.handlerStyle, false)
      window.removeEventListener('scroll', this.handlerShow, false)
    }
  }
</script>

<style lang="sass">
  @import '~assets/sassCore/_function.scss'

  .back-top
    @include display-flex()
    @include justify-content(center)
    @include align-items()
    position: fixed
    left: 50%
    bottom: $baseHeight
    width: $baseHeight * 0.5
    height: $baseHeight * 0.5
    margin-left: 262px
    background-color: $white
    border-radius: $baseRadius
    z-index: 10
    cursor: pointer
    &:hover
      .icon-back-top
        color: lighten($themeColor, 20%)
    .icon-back-top
      font-size: 20px
  .backTopMove
    @include animation(backTopMove 2s ease)
    @include animation-fill-mode(forwards)
  @include keyframes (backTopMove)
    from
      @include opacity(0)
    to
      @include opacity(100)
</style>

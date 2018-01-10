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
    data () {
      return {
        isShow: false
      }
    },
    mounted () {
      this.computeStyle()

      window.onresize = () => {
        this.computeStyle()
      }

      window.onscroll = () => {
        let srcollTop = document.body.scrollTop || document.documentElement.scrollTop
        let clientHeight = window.innerHeight
        let scrollHeight = document.body.scrollHeight || document.documentElement.scrollHeight

        if (srcollTop > 300) {
          this.isShow = true
        } else {
          this.isShow = false
        }

        if (srcollTop + clientHeight + 100 > scrollHeight) {
          this.$refs.backTop.style.bottom = 110 + (srcollTop + clientHeight + 100 - scrollHeight) + 'px'
        } else {
          this.$refs.backTop.style.bottom = '100px'
        }
      }
    },
    methods: {
      computeStyle () {
        if (window.innerWidth < 1200) {
          this.$refs.backTop.style.marginLeft = 255 + (1200 - window.innerWidth) / 2 + 'px'
        } else {
          this.$refs.backTop.style.marginLeft = '255px'
        }
      },
      goTop () {
        window.scrollTo(0, 0)
      }
    }
  }
</script>

<style lang="sass">
  @import '../assets/sassCore/_function.scss'

  .back-top
    @include display-flex()
    @include justify-content(center)
    @include align-items()
    position: fixed
    left: 50%
    bottom: 100px
    width: 50px
    height: 50px
    margin-left: 255px
    background-color: $white
    border-radius: 2px
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

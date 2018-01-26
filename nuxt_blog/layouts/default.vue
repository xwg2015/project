<template>
  <nuxt/>
</template>

<script>
  export default {
    mounted () {
      var bp = document.createElement('script')
      var curProtocol = window.location.protocol.split(':')[0]
      if (curProtocol === 'https') {
        bp.src = 'https://zz.bdstatic.com/linksubmit/push.js'
      } else {
        bp.src = 'http://push.zhanzhang.baidu.com/push.js'
      }
      var s = document.getElementsByTagName('script')[0]
      s.parentNode.insertBefore(bp, s)
    }
  }
</script>

<style>
  @import '../static/font/iconfont.css';
</style>

<style lang="sass">
  @import '~assets/sassCore/_function.scss'
  body
    background-color: $bgColor
    min-width: $minWidth
    color: $themeColor
  html, body, #__nuxt
    height: 100%
  img
    max-width: 100%
  .mod-shadow
    box-shadow: 0 1px 3px 0 $boxShadowColor
  .mod-bd
    @include flex(1 0 auto)
</style>

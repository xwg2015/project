<template>
  <nuxt/>
</template>

<script>
  export default {
    mounted () {
      // 百度链接自动推送
      var bp = document.createElement('script')
      var curProtocol = window.location.protocol.split(':')[0]
      if (curProtocol === 'https') {
        bp.src = 'https://zz.bdstatic.com/linksubmit/push.js'
      } else {
        bp.src = 'http://push.zhanzhang.baidu.com/push.js'
      }
      var s1 = document.getElementsByTagName('script')[0]
      s1.parentNode.insertBefore(bp, s1)

      // 百度统计
      var hm = document.createElement('script')
      hm.src = 'https://hm.baidu.com/hm.js?ec718b9848bb58be0f081296218b1f3c'
      var s2 = document.getElementsByTagName('script')[0]
      s2.parentNode.insertBefore(hm, s2)
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

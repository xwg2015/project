<template>
  <section class="mod-tags">
    <h3 class="item" v-for="(item, index) in tags" :key="index">{{ item }}</h3>
  </section>
</template>

<script>
  export default {
    name: 'Tags',
    props: {
      tags: Array
    }
  }
</script>

<style lang="sass">
  @import '~assets/sassCore/_function.scss'

  .mod-tags
    @include display-flex()
    .item
      padding: 0 12px
      margin-right: 10px
      line-height: 24px
      font-size: 14px
      font-weight: normal
      color: $white
      background: lighten($themeColor, 20%)
      border-radius: 2px
</style>

<template>
  <sections class="mod-tags">
    <h3 class="item">javascript</h3>
    <h3 class="item">html</h3>
    <h3 class="item">css</h3>
  </sections>
</template>

<style lang="sass">
  @import '../assets/sassCore/_function.scss'

  .mod-tags
    @include display-flex()
    .item
      padding: 0 12px
      margin-right: 10px
      line-height: 24px
      font-weight: normal
      color: $white
      background: lighten($themeColor, 20%)
      border-radius: 2px
</style>

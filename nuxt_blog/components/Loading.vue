<template>
  <div class="mod-loading mod-shadow" v-if="loading">
    <span v-if="hasMore">正在加载...</span>
    <span v-else>没有更多了~</span>
  </div>
</template>

<script>
  export default {
    name: 'Loading',
    props: {
      loading: Boolean,
      hasMore: Boolean
    }
  }
</script>

<style lang="sass">
  @import '~assets/sassCore/_function.scss'

  .mod-loading
    width: 100%
    line-height: 50px
    text-align: center
    background-color: $white
</style>

<template>
  <section class="page page-article-detail">
    <VHeader :is-other="true"></VHeader>
    <VFooter></VFooter>
  </section>
</template>

<script>
  import VHeader from '../../components/Header'
  import VFooter from '../../components/Footer'
  export default {
    name: 'ArticleList',
    components: {
      VHeader,
      VFooter
    },
    data () {
      return {
      }
    }
  }
</script>

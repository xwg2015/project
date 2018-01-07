<template>
  <section class="mod-header">
    <h1>熊文刚的博客</h1>
    <Logo class="logo"></Logo>
    <ul class="nav">
      <li><a href="" class="active">主页</a></li>
      <li><a href="">文章</a></li>
      <li><a href="">项目</a></li>
      <li><a href="">简历</a></li>
      <li><a href="">传说后台</a></li>
    </ul>
  </section>
</template>

<script>
  import Logo from './Logo'
  export default {
    name: 'Header',
    components: {
      Logo
    }
  }
</script>

<style lang="scss">
  @import '../assets/sassCore/_function.scss';
  .mod-header {
    @include display-flex();
    @include justify-content(center);
    @include align-items();
    position: relative;
    z-index: 1;
    height: 80px;
    h1 {
      text-indent: -9999px;
    }
    .logo {
      position: absolute;
      top: 28px;
      left: 100px;
    }
    .nav {
      @include display-flex();
      a {
        margin: 0 32px;
        color: rgba($mainWhite, 0.5);
      }
      a:hover, a.active {
        color: $mainWhite;
      }
      a:hover {
        transition: 0.5s;
      }
    }
  }
</style>

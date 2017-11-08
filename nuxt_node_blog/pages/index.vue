<template>
  <section class="page page-index">
    <header class="header">
      <div class="info">
        <img class="avatar" src="../assets/images/head.jpeg" alt="头像">
          <p class="text">欢迎来到熊文刚的博客。</p>
        </div>
      </div>
    </header>
    <section class="main">
      <nav class="nav">
        <a href="" class="active">首页</a>
        <a href="">技术文章</a>
        <a href="">日志</a>
        <a href="">简历</a>
        <a href="">个人项目</a>
      </nav>
      <section class="articles">

      </section>
    </section>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  }
}
</script>

<style lang="scss">
  @import '../assets/sassCore/_function.scss';

  .page-index {
    .header {
      @include flex-display();
      height: 360px;
      background-image: url(../assets/images/bg.jpg);
      background-position: center;
    }

    .info {
      @include flex-display();
      @include flex-direction();
    }

    .avatar {
      width: 100px;
      height: 100px;
      margin-bottom: 20px;
      border: 4px rgba(255, 255, 255, 0.2) solid;
      border-radius: 50px;
    }

    .text {
      font-size: 16px;
      color: rgba(255, 255, 255, 0.8);
    }

    .main {
      width: 1200px;
      min-height: 100vh;
      margin: -60px auto 0;
      background-color: #fff;
      border-radius: 10px 10px 0 0;
    }

    .nav {
      height: 60px;
      @include flex-display(space-around);

      a {
        display: block;
        padding: 10px;
        text-align: center;
        font-size: 16px;
        color: $black;
        border-bottom: 2px transparent solid;
      }

      a.active, a:hover {
        border-bottom-color: $black;
        transition: 0.5s;
      }
    }
  }
</style>

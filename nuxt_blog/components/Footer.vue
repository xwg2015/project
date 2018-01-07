<template>
  <section class="mod-footer">
    <div class="contact">
      <a class="github-wrap" href="https://github.com/JustLikeU" target="__blank">
        <span class="eyes">
          <span></span>
          <span></span>
        </span>
        <i class="iconfont icon-github"></i>
      </a>
      <a href="mailto:xwg2015@eicloud.com"><i class="iconfont icon-email"></i></a>
      <span class="weixin-wrap">
        <i class="iconfont icon-weixin"></i>
        <img class="qrcode" src="../static/image/weixin.png" alt="我的微信">
      </span>
    </div>
    <div class="copyright">
      Copyright 2018 by 熊文刚
    </div>
  </section>
</template>

<style lang="scss">
  @import '../assets/sassCore/_function.scss';

  .mod-footer {
    background-color: $mainWhite;
    .contact {
      @include display-flex();
      @include justify-content();
      @include align-items(center);
      width: 200px;
      height: 100px;
      @include center-block();
    }
    .iconfont {
      font-size: 30px;
      color: $mainBlack;
    }
    .iconfont:hover {
      color: lighten($mainBlack, 10%);
      transition: 0.5s;
    }
    .weixin-wrap, .github-wrap {
      position: relative;
    }
    .eyes {
      @include display-flex();
      position: absolute;
      top: 18px;
      left: 10px;
      @include opacity(0);
      transition: 1s;
      span {
        width: 4px;
        height: 1px;
        margin-right: 2px;
        background-color: lighten($mainBlack, 10%);
      }
    }
    .github-wrap:hover {
      .eyes {
        @include opacity(100);
      }
    }
    .weixin-wrap:hover {
      .qrcode {
        @include opacity(100);
        left: 40px;
      }
    }
    .qrcode {
      position: absolute;
      left: 0;
      top: -18px;
      width: 80px;
      max-width: 80px;
      height: 80px;
      @include opacity(0);
      transition: 1s ease;
    }
    .copyright {
      line-height:50px;
      text-align: center;
      color: $mainWhite;
      background-color: $mainBlack;
    }
  }
</style>


<template>
  <section class="page page-detail">
    <div class="inner" v-if="cur_detail.title">
      <div class="header">
        <div class="title">{{ cur_detail.title }}</div>
        <div class="info">
          <div class="author">{{ cur_detail.author }}</div>
          <div class="time">{{ cur_detail.time }}</div>
        </div>
      </div>
      <div class="content" v-html="cur_detail.content"></div>
      <div class="reply-list">
        <div class="reply-title">这些回帖亮了</div>
        <div class="item" v-for="(item, index) in cur_detail.reply" :key="index">
          <div class="reply-info">
            <div class="reply-author">{{ item.username }}&nbsp;&nbsp;{{ item.time }}</div>
            <div class="lights">亮了{{item.light_num }}</div>
          </div>
          <div class="quote" v-if="item.reply_quote_hd !== 'None'">
            <div class="quote-header">{{ item.reply_quote_hd }}</div>
            <div class="quote-content" v-html="item.reply_quote_content"></div>
          </div>
          <div class="reply-content" v-html="item.current_reply_content"></div>
        </div>
      </div>
      <div class="more">还想浏览更多精彩回帖，请前往虎扑官方步行街。</div>
    </div>
    <div class="no-result" v-else>
      正在玩命加载中...
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  mounted () {
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    window.pageYOffset = 0
    if (sessionStorage.getItem('DETAIL_DATA')) {
      this.GetDetail(`/bbs/${this.$route.params.id}.html`)
    } else {
      this.$router.push('/list')
    }
  },
  computed: {
    ...mapState({
      cur_detail: state => state.cur_detail
    })
  },
  methods: {
    ...mapActions([
      'GetData',
      'GetDetail'
    ])
  }
}
</script>

<style scoped>
.header {
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.title {
  margin-bottom: 16px;
  font-size: 16px;
  color: #333;
}

.info {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #999;
}

.content {
  word-break: break-all;
  padding: 10px;
  font-size: 16px;
  color: #666;
}

.reply-list {
  font-size: 14px;
  background-color: #f3f3f3;
  color: #666;
}

.reply-title {
  padding: 12px;
  border-top: 1px solid #e3e4e5;
  border-bottom: 1px solid #e3e4e5;
  border-left: 6px solid #b50000;
  color: #b50000;
}

.item {
  padding: 10px;
  border-bottom: 1px solid #e3e4e5;
}

.reply-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.reply-author {
  white-space: nowrap;
  font-size: 14px;
  color: #999;
}

.lights {
  font-size: 14px;
  color: #b50000;
}

.quote {
  padding: 10px;
  background-color: #eeebeb;
}

.quote-header {
  margin-bottom: 12px;
  font-size: 14px;
}

.quote-content {
  color: #999;
}

.reply-content {
  margin-top: 12px;
}
</style>

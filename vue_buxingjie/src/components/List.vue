<template>
  <section class="page page-list">
    <div class="list" v-if="list_data.length">
      <div class="data-time">爬虫抓取时间为：{{time}}</div>
      <div class="list-item" :class="{'read-item': ids.indexOf(item.url)!== -1}" v-for="(item, index) in list_data" :key="index" @click="jump(item.url)">
        <div class="title">{{ item.title }}</div>
        <div class="comment-wrap">
          <div class="comment">{{ item.lights }}</div>
          <div class="comment">{{ item.replys }}</div>
        </div>
      </div>
      <div class='more'>还想浏览更多精彩帖子，请前往虎扑官方步行街。</div>
    </div>
    <div class="no-result" v-else>
      正在玩命加载中...
    </div>
  </section>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  mounted () {
    if (sessionStorage.getItem('LIST_DATA')) {
      this.LIST_DATA(JSON.parse(sessionStorage.getItem('LIST_DATA')))
      this.DETAIL_DATA(JSON.parse(sessionStorage.getItem('DETAIL_DATA')))
    } else {
      this.GetData()
    }
  },
  computed: {
    ...mapState({
      list_data: state => state.list_data
    }),
    ids () {
      if (localStorage.getItem('READ_IDS')) {
        return JSON.parse(localStorage.getItem('READ_IDS'))
      } else {
        return []
      }
    },
    time () {
      let _this = new Date(sessionStorage.getItem('TIME') * 1000)
      let fmt = 'yyyy-MM-dd hh:mm:ss'
      var o = {
        'M+': _this.getMonth() + 1,
        'd+': _this.getDate(),
        'h+': _this.getHours(),
        'm+': _this.getMinutes(),
        's+': _this.getSeconds(),
        'q+': Math.floor((_this.getMonth() + 3) / 3),
        'S': _this.getMilliseconds()
      }
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (_this.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
      }
      return fmt
    }
  },
  methods: {
    ...mapMutations(['LIST_DATA', 'DETAIL_DATA']),
    ...mapActions(['GetData']),
    jump (url) {
      let id = url.slice(-13, -5)
      let ids
      if (localStorage.getItem('READ_IDS')) {
        ids = new Set(JSON.parse(localStorage.getItem('READ_IDS')))
      } else {
        ids = new Set()
      }

      if (ids.size === 100) {
        ids.clear()
      }

      ids.add(url)
      localStorage.setItem('READ_IDS', JSON.stringify(ids))
      this.$router.push(`/detail/${id}`)
    }
  }
}
</script>

<style scoped>
.page-list {
  font-size: 14px;
}

.data-time {
  border-bottom: 1px solid #eee;
  line-height: 40px;
  text-align: center;
  font-size: 14px;
  color: #999;
}

.list-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  min-height: 80px;
  padding: 0 10px;
  border-bottom: 1px solid #eee;
}

.list-item:active {
  background-color: #eee;
}

.list-item .title {
  color: #b50000;
}

.read-item .title {
  color: rgba(181, 0, 0, 0.5);
}

.list-item .comment-wrap {
  width: 140px;
}

.list-item .comment {
  text-align: right;
  color: #666;
}
</style>


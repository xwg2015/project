// pages/detail/detail.js
// 渲染富文本
var WxParse = require('../../wxParse/wxParse.js');
var app = getApp()
Page({
  data: {
    id: '',
    detail_list: app.globalData.detail,
    detail: {}
  },

  // 页面加载
  onLoad: function (options) {
    this.setData({
      id: '/bbs/' + options.id
    })

    this.getDetail(this.data.id, this.data.detail_list)

    if (this.data.detail.content) {
      var that = this
      WxParse.wxParse('content', 'html', this.data.detail.content, that, 0)
    }

    // 引用html渲染
    var reply_len = this.data.detail.reply.length
    for (var i = 0; i < reply_len; i++) {
      WxParse.wxParse('quote' + i, 'html', this.data.detail.reply[i].reply_quote_content, that, 0)
      if (i === reply_len - 1) {
        WxParse.wxParseTemArray("quote_arr", 'quote', reply_len, that)
      }
    }

    // 回复html渲染
    for (var i = 0; i < reply_len; i++) {
      WxParse.wxParse('cur_reply' + i, 'html', this.data.detail.reply[i].current_reply_content, that, 0)
      if (i === reply_len - 1) {
        WxParse.wxParseTemArray("cur_reply_arr", 'cur_reply', reply_len, that)
      }
    }
  },

  // 获取当前详情页数据
  getDetail: function (id, list) {
    for (var i = 0; i < list.length; i++) {
      if (id === list[i].url) {
        this.setData({
          detail: list[i]
        })
      }
    }
  },

  // 分享
  onShareAppMessage: function () {
  
  }
})
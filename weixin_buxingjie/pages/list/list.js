// pages/list/list.js
var app = getApp()
Page({
  data: {
    list: app.globalData.list,
    scrollHeight: 0
  },

  // 跳转详情
  linkTo: function (event) {
    var id = event.currentTarget.dataset.url.substr(-13)
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id
    })
  },

  // 页面加载
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
  },

  // 下拉获取最新的数据
  onPullDownRefresh: function () {
    // app.getData()
    wx.showModal({
      title: '温馨提示',
      showCancel: false,
      confirmText: '知道了~',
      content: '该数据爬取于2010-10-12 21:28，等待域名备案完才能正常使用。',
      success: function () {
        wx.stopPullDownRefresh()
      }
    })
  },

  // 分享
  onShareAppMessage: function () {
  
  }
})
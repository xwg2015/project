//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
  },
  
  // 跳转
  linkTo: function() {
    wx.navigateTo({
      url: '/pages/list/list'
    })
  },
  onLoad: function () {
  }
})

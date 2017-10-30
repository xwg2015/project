//app.js
var Data = require('./data.js');
App({
  onLaunch: function () {
    this.getData()
    console.log(Data)
  },
  getData: function () {
    // wx.request({
    //   url: 'http://106.14.201.222/data.json',
    //   header: {
    //     'Content-Type': 'application/json'
    //   },
    //   success: function (res) {
    //     console.log(res.data)
    //   }
    // })
  },
  globalData: {
    userInfo: null,
    list: Data.data.list_data[0],
    detail: Data.data.detail_data.splice(1)
  }
})
//index.js
//获取应用实例
const app = getApp()

let websocket = require('../../utils/websocket.js');
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    newslist:[],
    message:'',
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  send(){
    if (this.data.message) {
      websocket.send((this.data.userInfo.nickName?this.data.userInfo.nickName:'名称未获取')+':'+this.data.message);
    }
  },
  inputChange(e){
    this.setData({
      message:e.detail.value
    })
  },
  onShow: function () {
      let that=this;
      websocket.connect(this.data.userInfo, function (res) {
          that.setData({
            message:''
          })
          var list = []

          list = that.data.newslist

          list.push(JSON.parse(res.data))

          that.setData({

            newslist: list

          })

      })

    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})

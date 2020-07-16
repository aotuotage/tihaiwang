//index.js
const app = getApp()
const db = wx.cloud.database();

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: '',
    logged: false,
    takeSession: false,
    requestResult: '',
    blockfull:false
  },

  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              let userdata = {}
              this.setData({
                blockfull:false,
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
              userdata.avatarUrl = res.userInfo.avatarUrl;
              userdata.userInfo = res.userInfo;
              //获取openid
              wx.cloud.callFunction({
                name: 'login',
                data: {},
                success: res => {
                  userdata.openid = res.result.openid
                  wx.setStorage({
                    key:"userdata",
                    data:userdata
                  })
                  console.log(res.result.openid)
                  app.globalData.openid = res.result.openid
                },
                fail: err => {
                  console.error('[云函数] [login] 调用失败', err)
                }
              })
            }
          })
        }else{
          this.setData({
            blockfull:true
          })
        }
      }
    });
  },
  onGetUserInfo: function(e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        blockfull:false,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  }
})

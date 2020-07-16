const db = wx.cloud.database();

Page({
  data: {
    list:[]
  },
  onLoad: function (options) {
    //获取数据
    db.collection('simulationlist').get().then(res => {
      this.setData({
        list: res.data[0].list
      })
    })
    console.log(this.__data__)
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  }
})
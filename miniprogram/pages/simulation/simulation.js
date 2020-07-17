const db = wx.cloud.database();

Page({
  data: {
    list:[],
    ishow:false,
    ishowtext:'正在加载···'
  },
  onLoad: function (options) {
    let _this = this;
    //获取数据
    if(_this.options.type == 1){
      db.collection('simulationlist').where({
        type: _this.options.type
      })
      .get({
        success: function(res) {
          if(res.data.length > 0){
            _this.setData({
              list: res.data,
              ishow:true
            })
          }else{
            _this.setData({
              ishow:false,
              ishowtext:'暂无数据'
            })
          }
        }
      })
    }else if(_this.options.type == 6){
      wx.getStorage({
        key: 'userdata',
        success (res) {
          let openid = res.data.openid;
          db.collection('simulationlist').where({
            openid: openid
          })
          .get({
            success: function(res) {
              if(res.data.length > 0){
                _this.setData({
                  list: res.data,
                  ishow:true
                })
              }else{
                _this.setData({
                  ishow:false,
                  ishowtext:'暂无数据'
                })
              }
            }
          })
        }
      })
    }
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
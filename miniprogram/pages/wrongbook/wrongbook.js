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
    wx.getStorage({
      key: 'userdata',
      success (res) {
        let openid = res.data.openid;
        db.collection('userdata').where({
          _openid: openid
        })
        .get({
          success: function(res) {
            if(res.data.length > 0){
              _this.setData({
                list: res.data[0].userdata.titlelist,
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
  },
  onReady: function () {

  },
  onShareAppMessage: function () {

  }
})
const db = wx.cloud.database();
Page({
  data: {
    id:'',
    qa:[],
    ishow:true
  },
  onLoad: function (options) {
    let _this = this;
    let tid = Number(this.options.id);
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
                qa: res.data[0].userdata.errqa[tid],
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
  //展开收起
  triangle:function(e){
    let num = e.currentTarget.dataset.num;
    if(num == 1){
      this.setData({
        istriangleone: !this.data.istriangleone
      })
    }else if(num == 2){
      this.setData({
        istriangletwo: !this.data.istriangletwo
      })
    }else if(num == 3){
      this.setData({
        istrianglethree: !this.data.istrianglethree
      })
    }else if(num == 4){
      this.setData({
        istrianglefour: !this.data.istrianglefour
      })
    }
  }
})
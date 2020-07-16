const db = wx.cloud.database();
Page({
  data: {
    id:'',
    qa:[],
    ishow:false,
    istriangleone:false,
    istriangletwo:false,
    istrianglethree:false,
    istrianglefour:false,
    surenum:0,
    countDownList:0
  },
  onLoad: function (options) {
    //倒计时
    let i=5400000;
    let _this = this;
    const updateTime = () => {
      if(i<=0){
        clearInterval(time);
        if(_this.data.surenum > 60){
          wx.showToast({
            title: '恭喜您取得'+_this.data.surenum+'分',
            icon: 'success',
            duration: 2000
          })
        }else{
          wx.showToast({
            title: '您只取得'+_this.data.surenum+'分',
            icon: 'none',
            duration: 2000
          })
        }
        _this.setData({
          surenum:_this.data.surenum,
          ishow:true
        })
      }
      i-=1000;
      let countDownList2 = Math.round(i/1000/60);
      _this.setData({
        countDownList:countDownList2
      })
    };
    let time = setInterval(updateTime,1000);
    //数组删除值
    Array.prototype.delete = function(val) {
      var index = this.indexOf(val);
      if (index > -1) {
        this.splice(index, 1);
      }
    }
    let tid = Number(this.options.id);
    //let tid = 0;
    db.collection('simulationdetails').where({
      id:tid
    }).get().then(res => {
      //单选选中值样式
      res.data[0].Singlechoice.forEach(function(item) {
        item.thechoice = null;
      })
      //单选值记录
      res.data[0].Singlechoice.forEach(function(item) {
        item.history = null;
      })   
      //判断选中值样式
      res.data[0].judge.forEach(function(item) {
        item.thechoice = null;
      })
      //判断值记录
      res.data[0].judge.forEach(function(item) {
        item.history = null;
      })
      //多选值记录
      res.data[0].Multiplechoice.forEach(function(item) {
        item.option = [];
      })  
      //多选选中值  
      res.data[0].Multiplechoice.forEach(function(item) {
        let newanswer = [];
        item.answer.forEach(function(item2) {
          let item3 = {
            data:item2,
            ischoice:false
          };
          newanswer.push(item3)
        })
        item.newanswer = newanswer;
      })  
      //不定选择值记录
      res.data[0].Bigquestions.qa1.list.forEach(function(item) {
        item.option = [];
        let newanswer = [];
        item.answer.forEach(function(item2) {
          let item3 = {
            data:item2,
            ischoice:false
          };
          newanswer.push(item3)
        })
        item.newanswer = newanswer;
      })
      res.data[0].Bigquestions.qa2.list.forEach(function(item) {
        item.option = [];
        let newanswer = [];
        item.answer.forEach(function(item2) {
          let item3 = {
            data:item2,
            ischoice:false
          };
          newanswer.push(item3)
        })
        item.newanswer = newanswer;
      })
      res.data[0].Bigquestions.qa3.list.forEach(function(item) {
        item.option = [];
        let newanswer = [];
        item.answer.forEach(function(item2) {
          let item3 = {
            data:item2,
            ischoice:false
          };
          newanswer.push(item3)
        })
        item.newanswer = newanswer;
      })
      this.setData({
        qa: res.data[0]
      })
    })
  },
  onReady: function () {
    console.log(this.data);
  },
  //单选及判断背景选择
  answer:function(e){
    let dateset = e.currentTarget.dataset;
    let dataqa = this.data.qa;
    //背景选择切换
    if(dateset.id == 1){
      dataqa.Singlechoice[dateset.index].thechoice = dateset.answer;
      dataqa.Singlechoice[dateset.index].history = dateset.answer;
      this.setData({
        qa:dataqa
      })
    }else{
      dataqa.judge[dateset.index].thechoice = dateset.answer;
      dataqa.judge[dateset.index].history = dateset.answer;
      this.setData({
        qa:dataqa
      })
    }
  },
  //多选及不定选择项目背景选择切换
  answer2(e){
    let dateset = e.currentTarget.dataset;
    let dataqa = this.data.qa;
    dataqa.Multiplechoice[dateset.index].newanswer[dateset.answer].ischoice = !dataqa.Multiplechoice[dateset.index].newanswer[dateset.answer].ischoice;
    if(dateset.id == 1){
      //多选
      if(dataqa.Multiplechoice[dateset.index].newanswer[dateset.answer].ischoice){
        dataqa.Multiplechoice[dateset.index].option.push(dateset.answer);
        this.setData({
          qa:dataqa
        })
      }else{
        dataqa.Multiplechoice[dateset.index].option.delete(dateset.answer);
        this.setData({
          qa:dataqa
        })
      }
    }else{
      //不定选择
      dataqa.Bigquestions[`qa${dateset.num}`].list[dateset.index].newanswer[dateset.answer].ischoice = !dataqa.Bigquestions[`qa${dateset.num}`].list[dateset.index].newanswer[dateset.answer].ischoice;
      console.log(dataqa.Bigquestions[`qa${dateset.num}`].list[dateset.index].newanswer[dateset.answer])
      if(dataqa.Bigquestions[`qa${dateset.num}`].list[dateset.index].newanswer[dateset.answer].ischoice){
        dataqa.Bigquestions[`qa${dateset.num}`].list[dateset.index].option.push(dateset.answer);
        this.setData({
          qa:dataqa
        })
      }else{
        dataqa.Bigquestions[`qa${dateset.num}`].list[dateset.index].option.delete(dateset.answer);
        this.setData({
          qa:dataqa
        })
      }
    }
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
  },
  //确认交卷
  endbtn:function(){
    let _this = this;
    let wqlist = [];
    //单选计分
    _this.data.qa.Singlechoice.forEach(function(item){
      if(item.correct == item.history){
        _this.data.surenum+=1.5
      }else{
        wqlist.push(item)
      }
    })
    //多选计分
    _this.data.qa.Multiplechoice.forEach(function(item){
      if(item.correct.toString() == item.option.sort().toString()){
        _this.data.surenum+=2
      }else{
        wqlist.push(item)
      }
    })    
    //判断计分
    _this.data.qa.judge.forEach(function(item){
      if(item.correct == item.history){
        _this.data.surenum+=1
      }else{
        wqlist.push(item)
      }
    })
    //不定选择计分
    _this.data.qa.Bigquestions.qa1.list.forEach(function(item){
      if(item.correct.toString() == item.option.sort().toString()){
        _this.data.surenum+=2
      }else{
        wqlist.push(item)
      }
    })   
    _this.data.qa.Bigquestions.qa2.list.forEach(function(item){
      if(item.correct.toString() == item.option.sort().toString()){
        _this.data.surenum+=2
      }else{
        wqlist.push(item)
      }
    })
    _this.data.qa.Bigquestions.qa3.list.forEach(function(item){
      if(item.correct.toString() == item.option.sort().toString()){
        _this.data.surenum+=2
      }else{
        wqlist.push(item)
      }
    })
    _this.setData({
      surenum:_this.data.surenum,
      ishow:true
    })
    if(_this.data.surenum > 60){
      wx.showToast({
        title: '恭喜您取得'+_this.data.surenum+'分',
        icon: 'success',
        duration: 2000
      })
    }else{
      wx.showToast({
        title: '您只取得'+_this.data.surenum+'分',
        icon: 'none',
        duration: 2000
      })
    }
  }
})
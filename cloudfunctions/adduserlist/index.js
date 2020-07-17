const cloud = require('wx-server-sdk')
// 初始化 cloud
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const result={
  code:''
}
exports.main = async (event, context) => {
  return new Promise((resolve, reject) => {
    let userdata = {
      "openid":event._openid,
      "titlelist":[],
      "errqa":[]
    }
    db.collection('userdata').where(
      {"_openid":event._openid}
    )
    .get().then(res =>{
      let newwqlist = event.wqlist;
      let newtitlelist = {
        "author":event.qa.author,
        "date":event.qa.date,
        "title":event.qa.title,
        "type":event.qa.type,
        "id":event.qa.id
      }
      if(res.data.length > 0){
        //追加数据
        let thenewtitlelist = res.data[0].userdata.titlelist;
        let thenewerrqa = res.data[0].userdata.errqa;
        thenewerrqa.push(newwqlist);
        thenewtitlelist.push(newtitlelist);
        userdata.errqa = thenewerrqa;
        userdata.titlelist = thenewtitlelist;
        db.collection('userdata').where({"_openid": event._openid}).update({
          data: {"userdata":userdata}
        }).then(res => {
          result.code = 200;
          resolve(result)
        }).catch(err => {
          result.code = 400
          resolve(result)
        })
      }else{
        //第一次创建答题数据
        userdata.errqa.push(newwqlist);
        userdata.titlelist.push(newtitlelist);
        db.collection('userdata').add({
          data:{
            "userdata":userdata,
            "_openid":event._openid
          },
          success: res => {
            result.code = 200
            resolve(result)
          },
          fail: err => {
            result.code = 400
            resolve(result)
          }
        })
      }
    })
  })
}


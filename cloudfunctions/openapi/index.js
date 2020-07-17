// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
exports.main = async (event, context) => {
  switch (event.action) {
    case 'requestSubscribeMessage': {
      return requestSubscribeMessage(event)
    }
    case 'sendSubscribeMessage': {
      return sendSubscribeMessage(event)
    }
    case 'getWXACode': {
      return getWXACode(event)
    }
    case 'getOpenData': {
      return getOpenData(event)
    }
    default: {
      return
    }
  }
}
async function requestSubscribeMessage(event) {
  return '请到管理后台申请模板 ID 然后在此替换'
}
async function sendSubscribeMessage(event) {
  const { OPENID } = cloud.getWXContext()
  const { templateId } = event
  const sendResult = await cloud.openapi.subscribeMessage.send({
    touser: OPENID,
    templateId,
    miniprogram_state: 'developer',
    page: 'pages/openapi/openapi',
    // 此处字段应修改为所申请模板所要求的字段
    data: {
      thing1: {
        value: '成功',
      }
    }
  })
  return sendResult
}
async function getWXACode(event) {
  const wxacodeResult = await cloud.openapi.wxacode.get({
    path: 'pages/openapi/openapi',
  })
  const fileExtensionMatches = wxacodeResult.contentType.match(/\/([^\/]+)/)
  const fileExtension = (fileExtensionMatches && fileExtensionMatches[1]) || 'jpg'
  const uploadResult = await cloud.uploadFile({
    cloudPath: `wxacode_default_openapi_page.${fileExtension}`,
    fileContent: wxacodeResult.buffer,
  })
  if (!uploadResult.fileID) {
    throw new Error(`upload failed with empty fileID and storage server status code ${uploadResult.statusCode}`)
  }
  return uploadResult.fileID
}
async function getOpenData(event) {
  return cloud.getOpenData({
    list: event.openData.list,
  })
}

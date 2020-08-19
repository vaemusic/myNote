// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database()
const _=db.command
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const userIInfo = event.userinfo
  return await db.collection("user").add({
    data:{
      'avatarUrl':userIInfo.avatarUrl,
      'nickName':userIInfo.nickName,
      'openid':wxContext.OPENID,
      'level':0
    }
  })
}
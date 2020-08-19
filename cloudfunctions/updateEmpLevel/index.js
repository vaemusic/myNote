// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database()
const _=db.command
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid=event.openid
  const level=event.level
  return await db.collection('user').where({
			openid:openid	
  }).update({
    data:{
      level:level
    }
  })
}
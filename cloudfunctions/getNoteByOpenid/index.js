// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database()
const _=db.command
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var num=event.num
  var page=event.page
  return await db.collection('noteList').skip(page).limit(num).orderBy('time','desc').where({
    _openid:event.openid
  }).get()
}
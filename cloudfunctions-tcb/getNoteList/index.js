'use strict';
const db = uniCloud.database();
const _=db.command
exports.main = async (event, context) => {
	
	let js_code = event.code  
	const appid = 'wx671ee2fb0342b1b2' //appid  
	const secret = 'b8568e26ec7f8b0f33cc61c398179654' //secret  
	const loginUrl = 'https://api.weixin.qq.com/sns/jscode2session'   
	
	let userinfo = await uniCloud.httpclient.request(loginUrl, {  
	  data: {  
	    appid: appid,  
	    secret: secret,  
	    js_code: js_code,  
	    grant_type: 'authorization_code'  
	  },  
	  dataType: 'json'  
	  })  
	
	let openid = userinfo.data.openid  //用户openid
	console.log(event)
	//event为客户端上传的参数
	const collection = db.collection('noteList')
	const res=await collection.get()
	//返回数据给客户端
	return res
};

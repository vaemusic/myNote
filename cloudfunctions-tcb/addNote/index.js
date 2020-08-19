'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	db.collection('noteList').add({
		data:{
		  'note':event.note,
		  'time':event.time,
		  'title':event.title
		},
		success:res=>{
		  uni.showToast({
			title:'添加成功'
		  })
		  uni.navigateTo({
			url:"../index/index"
		  })
		}
	})
	//返回数据给客户端
	return event
};

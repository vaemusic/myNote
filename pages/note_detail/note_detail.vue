<template>
	<view>
		<view class="title">
			<input type="text" :value="titleText" @input="inputTitle" placeholder="请输入标题,最多输入10个字"/>
		</view>
		<view class="line"></view>
		<textarea @input="inputNote" type="text" placeholder="点击此处输入您要记录的内容..." auto-height="true" maxlength="-1" :value="noteContent"/>
		<button class="save_btn" hover-class="save_btn_hover" @click="updateNote">修改</button>
		
	</view>
</template>

<script>
	import {isEmpty} from "../../js_sdk/tool.js"
	const db = wx.cloud.database()
	export default {
		data() {
			return {
				noteContent:"",
				noteId:"",
				titleText:""
			}
		},
		onLoad(options) {
			this.noteId=options.id,
			this.getNoteContent()
		},
		methods: {
			// 监听输入的笔记内容
			inputNote(e){
				this.noteContent=e.detail.value
			},
			// 监听输入的标题内容
			inputTitle(e){
				this.titleText=e.detail.value
			},
			// 根据id获取笔记的标题和内容
			getNoteContent(){
				db.collection('noteList').doc(this.noteId).get().then(res=>{
					this.noteContent=res.data.note
					this.titleText=res.data.title
				})
			},
			// 更新笔记
			updateNote(){
				if(isEmpty(this.noteContent)){
					uni.showToast({
						title:'内容不能为空！'
					})
				}else if(isEmpty(this.titleText)){
					uni.showToast({
						title:'标题不能为空！'
					})
				}else{
					db.collection('noteList').doc(this.noteId).update({
						data:{
							'note':this.noteContent,
							'title':this.titleText
						},
						success:(res)=>{
							console.log(res)
							uni.showToast({
								title:'修改成功!',
								icon:'success'
							})
							uni.navigateTo({
								url:"../index/index"
							})
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	textarea{
		width: 760rpx;
		//height: 1050rpx;
		overflow: auto;
		padding: 30rpx 60rpx;
	}
	.title{
		padding: 30rpx 60rpx;
	}
	.line{
		margin-left: 60rpx;
		width: 640rpx;
		border-bottom: 2px solid $myNote-color;
	}
	.save_btn{
		width: 80%;
		background-color: $myNote-color;
		color: white;
		border-radius: 98rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		margin-top: 120rpx;
	}
	.save_btn_hover{
		background-color: #00cbff;
	}
</style>

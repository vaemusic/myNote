<template>
	<view>
		<!-- 标题框 -->
		<view class="title">
			<input disabled="true" type="text" :value="titleText" @input="inputTitle" placeholder="请输入标题,最多输入10个字"/>
		</view>
		<!-- 分割线 -->
		<view class="line"></view>
		<!-- 内容框 -->
		<textarea disabled="true" @input="inputNote" type="text" placeholder="点击此处输入您要记录的内容..." auto-height="true" maxlength="-1" :value="noteContent"/>	
	</view>
</template>

<script>
	import {isEmpty} from "../../js_sdk/tool.js"
	const db = wx.cloud.database()
	export default {
		data() {
			return {
				//笔记内容
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
			// 根据id获取笔记的标题和内容
			getNoteContent(){
				wx.cloud.callFunction({
					name:'getNoteContent',
					data:{
						'noteId':this.noteId
					}
				}).then(res=>{
					this.noteContent=res.result.data.note
					this.titleText=res.result.data.title
				})
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

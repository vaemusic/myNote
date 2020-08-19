<template>
	<view>
		<!-- 标题输入框 -->
		<view class="title">
			<input type="text" @input="inputTitle" placeholder="请输入标题,最多输入10个字" maxlength="10" auto-focus="true"/>
		</view>
		<!-- 分割线 -->
		<view class="line"></view>
		<!-- 内容输入框 maxlength='-1'代表没有上限 -->
		<textarea @input="inputNote" type="text" placeholder="点击此处输入您要记录的内容..." auto-height="true" maxlength="-1"/>
		<button class="save_btn" hover-class="save_btn_hover" @click="addNote">保存</button>
		
	</view>
</template>

<script>
	import { formatDate } from "../../js_sdk/tool.js";
	import {isEmpty} from "../../js_sdk/tool.js"
	const db = wx.cloud.database()
	export default {
		data() {
			return {
				noteText:"",
				titleText:""
			}
		},
		methods: {
			// 监听输入笔记内容
			inputNote(e){
				this.noteText=e.detail.value
			},
			// 监听输入笔记标题
			inputTitle(e){
				this.titleText=e.detail.value
			},
			// 添加笔记
			addNote(){
				var add_time = (new Date()).getTime()
				if(isEmpty(this.noteText)){
					uni.showToast({
						title:'内容不能为空！',
						icon:'none'
					})
				}else if(isEmpty(this.titleText)){
					uni.showToast({
						title:'标题不能为空！',
						icon:'none'
					})
				}else{
					db.collection('noteList').add({
						data:{
						  'note':this.noteText,
						  'time':add_time,
						  'title':this.titleText
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
				}
			}
		}
	}
</script>

<style lang="scss">
	textarea{
		width: 640rpx;
		height: 1050rpx;
		overflow: auto;
		padding: 30rpx 60rpx;
	}
	.line{
		margin-left: 60rpx;
		width: 640rpx;
		border-bottom: 2px solid $myNote-color;
	}
	.title{
		padding: 30rpx 60rpx;
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
		margin-top: 30rpx;
	}
	.save_btn_hover{
		background-color: #00cbff;
	}
</style>

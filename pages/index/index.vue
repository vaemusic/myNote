<template>
	<view class="content">
		<!--<view class="add_note" @click="addNote">
			<image src="../../static/add.png"></image>
			<text>添加笔记</text>
		</view>-->
		<view class="note">
			<view @click="goDetail(item._id)" class="note_item" v-for="item in noteData" :key="item._id" @longpress="longpress(item._id)" hover-class="note_item_hover">
				<view class="title">{{item.title}}</view>
				<view class="note_text">{{item.note}}</view>
				<view class="time">添加时间：{{item.time}}</view>
			</view>
		</view>
		<view class="cu-bar tabbar bg-blue">
			<view class="action text-white" style="padding-top: 10rpx;">
				<view class="cuIcon-homefill"></view> 首页
			</view>
			<view class="action text-white add-action">
				<button class="cu-btn cuIcon-add bg-white shadow" @click="addNote"></button>
				添加
			</view>
			<view class="action text-gray" style="padding-top: 10rpx;" @click="goMine">
				<view class="cuIcon-my"></view>
				我的
			</view>
		</view>
		
	</view>
</template>

<script>
	import { timestampToTime } from "../../js_sdk/tool.js";
	const db = wx.cloud.database()
	export default {
		data() {
			return {
				noteData:[]
			}
		},
		onLoad() {
			// 监听日记列表的删除操作
			/*db.collection('noteList').watch({
				onChange:res=>{
					this.noteData=[]
					this.getNotes()
				},
				onError:err=>{
					console.log(err)
				}
			})*/
			
			var date=new Date('2020-05-15').getTime()
			console.log(date)
		},
		onShow(){
			this.getNotes()
		},
		onPullDownRefresh() {
			this.noteData=[]
			this.getNotes()
			uni.stopPullDownRefresh()
		},
		methods: {
			// 跳转到添加笔记页面
			addNote(){
				uni.navigateTo({
					url:"../add-Note/add-Note"
				})
			},
			// 长按删除
			longpress(_id){
				const itemList = ['删除']
				uni.showActionSheet({
					itemList,
					success: (res) => {
						if(res.tapIndex==0){
							uni.showModal({
								title:'删除提醒',
								content:'您确定要删除这篇笔记吗?',
								success: (res) => {
									if(res.confirm){
										wx.cloud.callFunction({
											name:"delNote",
											data:{
												"id":_id
											}
										})
										.then(res=>{
											if(res.result.stats.removed){
												uni.showToast({
													title:'删除成功！'
												})
												this.noteData=[]
												this.getNotes()
											}else{
												uni.showToast({
													title:'删除失败！'
												})
											}
										})
									}
								}
							})
						}
					}
				})
			},
			// 获取笔记数据
			getNotes(){
				wx.cloud.callFunction({
					name:'getNoteList'
				})
				.then(res=>{
					this.noteData = res.result.data.map(v=>({
						...v,time:timestampToTime(v.time)
					}))
				})
			},
			// 跳转到笔记详情页面
			goDetail(_id){
				uni.navigateTo({
					url:"../note_detail/note_detail?id="+_id
				})
			},
			goMine(){
				uni.redirectTo({
					url:"../mine/mine"
				})
			}
		}
	}
</script>

<style lang="scss">
	.content{
		.note{
			margin-bottom: 104rpx;
		}
		.add-action{
			height: 200rpx;
		}
		/*.add_note{
			display: flex;
			background-color: #FFFFFF;
			width: 750rpx;
			height: 180rpx;
			border-bottom: 1px solid $myNote-color;
			image{ 
				width: 100rpx;
				height: 100rpx;
				align-self: center;
				position: absolute;
				margin-left: 200rpx;
			}
			text{
				margin-left: 320rpx;
				align-self: center;
				
				font-size: 60rpx;
			}
		}*/
		.note_item{
			font-family: 'simsun';
			.title{
				font-weight: bold;
			}
			
			background-color: #FFFFFF;
			width: 750rpx;
			height: 170rpx;
			border-bottom: 1px solid $myNote-color;
			font-size: 48rpx;
			padding-top: 10rpx;
			padding-left: 40rpx;
			.note_text{
				max-width: 680rpx;
				overflow: hidden;
				font-size: 30rpx;
				text-overflow: ellipsis;
				white-space: nowrap;
				color: #696969;
			}
			.time{
				margin-top: 12rpx;
				font-size: 25rpx;
			}
		}
		.note_item_hover{
			background-color: #F5F5F5;
		}
	}
</style>

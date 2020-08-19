<template>
	<view class="content">
		<view class="note">
			<view @click="goDetail(item._id)" class="note_item" v-for="item in noteData" :key="item._id" hover-class="note_item_hover">
				<view class="title">{{item.title}}</view>
				<view class="note_text">{{item.note}}</view>
				<view class="time">添加时间：{{item.time}}</view>
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
				noteData:[],
				openid:'',
				//当前用户笔记总数
				total:0
			}
		},
		onLoad(options) {
			this.openid=options.openid
		},
		onReady() {
			this.getNotesByOpenid()
			this.getNoteTotal()
		},
		onPullDownRefresh() {
			this.noteData=[]
			this.getNotesByOpenid()
			uni.stopPullDownRefresh()
		},
		onReachBottom() {
			var page=this.noteData.length
			uni.showLoading({
				title:'数据加载中',
				mask:true
			})
			if(page!=this.total){
				this.getNotesByOpenid(10,page)
				uni.hideLoading()
			}else{
				uni.hideLoading()
				uni.showToast({
					title:'没有更多数据了'
				})
			}
		},
		methods: {
			// 获取笔记数据
			getNotesByOpenid(num=10,page=0){
				wx.cloud.callFunction({
					name:'getNoteByOpenid',
					data:{
						openid:this.openid,
						num:num,
						page:page
					}
				})
				.then(res=>{
					var oldData=this.noteData
					var newData=oldData.concat(res.result.data);
					this.noteData = newData.map(v=>({
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
			//获取当前用户笔记总数
			getNoteTotal(){
				wx.cloud.callFunction({
					name:'getNoteTotal'
				}).then(res=>{
					this.total=res.result.total
				})
			}
		}
	}
</script>

<style lang="scss">
	.content{
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

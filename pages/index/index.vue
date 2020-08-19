<template>
	<view class="content">
		<!-- 笔记内容主体 -->
		<view class="note">
			<view @click="goDetail(item._id)" class="note_item" v-for="item in noteData" :key="item._id" hover-class="note_item_hover">
				<view class="title">{{item.title}}</view>
				<view class="note_text">{{item.note}}</view>
				<view class="time">添加时间：{{item.time}}</view>
			</view>
		</view>
		<!-- 底部栏 -->
		<view class="cu-bar tabbar bg-blue">
			<view class="action text-white" style="padding-top: 10rpx;" @click="Refresh">
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
	export default {
		data() {
			return {
				//笔记数据
				noteData:[],
				//当前用户笔记总数
				total:0
			}
		},
		onReady() {
			this.getNotes()
			this.getNoteTotal()
		},
		onPullDownRefresh() {
			//下拉刷新 初始化笔记数组，获取笔记总数，用于判断有无更多数据
			this.noteData=[]
			this.getNotes()
			this.getNoteTotal()
			uni.stopPullDownRefresh()
		},
		//触底加载更多数据
		onReachBottom() {
			var page=this.noteData.length
			uni.showLoading({
				title:'数据加载中',
				mask:true
			})
			//判断当前笔记列表和当前用户笔记总数
			if(page!=this.total){
				this.getNotes(10,page)
				uni.hideLoading()
			}else{
				uni.hideLoading()
				uni.showToast({
					title:'没有更多数据了'
				})
			}
		},
		methods: {
			// 跳转到添加笔记页面
			addNote(){
				uni.navigateTo({
					url:"../add-Note/add-Note"
				})
			},
			// 获取笔记数据，num：每次加载数据条数，page：下一页数据从多少条开始加载
			getNotes(num=10,page=0){
				wx.cloud.callFunction({
					name:'getNoteList',
					data:{
						num:num,
						page:page
					}
				})
				.then(res=>{
					var oldData=this.noteData
					var newData=oldData.concat(res.result.data);
					//数据库内添加时间存的是时间戳，方便根据时间排序笔记，在此需要把时间戳转换为正常日期
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
			//跳转到我的页面
			goMine(){
				uni.redirectTo({
					url:"../mine/mine"
				})
			},
			//获取当前用户笔记总数
			getNoteTotal(){
				wx.cloud.callFunction({
					name:'getNoteTotal'
				}).then(res=>{
					this.total=res.result.total
				})
			},
			//点击当前底部栏刷新页面
			Refresh(){
				uni.startPullDownRefresh()
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

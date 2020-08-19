<template>
	<view>
		<!-- 用户头像和微信昵称 -->
		<view class="user_info_wrap" v-if="userInfo.nickName">
			<view class="user_img_wrap">
				<view class="userinfo">
					<image class="user_icon" :src="userInfo.avatarUrl" mode="widthFix"></image>
					<text class="user_name">{{userInfo.nickName}}</text>
				</view>
			</view>
		</view>
		<!-- 判断用户级别，是管理员显示管理页面，是领导显示查看员工笔记 -->
		<view v-if="userLevel==2" class="admin" @click="goAdmin">
			管理页面
		</view>
		<view v-if="userLevel==1" class="admin" @click="goNote">
			查看员工笔记
		</view>
		<!-- 底部栏 -->
		<view class="cu-bar tabbar bg-blue">
			<view class="action text-gray" style="padding-top: 10rpx;" @click="goIndex">
				<view class="cuIcon-homefill"></view> 首页
			</view>
			<view class="action text-white add-action">
				<button class="cu-btn cuIcon-add bg-white shadow" @click="addNote"></button>
				添加
			</view>
			<view class="action text-white" style="padding-top: 10rpx;" @click="Refresh">
				<view class="cuIcon-my"></view>
				我的
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//用户信息
				userInfo:{},
				//用户级别
				userLevel:''
			}
		},
		onLoad() {
			//页面加载时加载用户信息和用户级别
			this.userInfo = uni.getStorageSync('userInfo');
			this.userLevel=uni.getStorageSync('level')
		},
		onPullDownRefresh() {
			//下拉刷新，重新获取用户级别
			//原因：用户级别是应用加载时存放在内存中，当管理员修改了用户级别时，内存里的用户等级不会实时更新，需要下拉刷新重新获取
			wx.cloud.callFunction({
				name:'getEmpLevel'
			}).then(res=>{
				uni.setStorageSync('level',res.result.data[0].level)
				this.userLevel=res.result.data[0].level
				uni.stopPullDownRefresh()
			})
		},
		methods: {
			// 跳转到添加笔记页面
			addNote(){
				uni.navigateTo({
					url:"../add-Note/add-Note"
				})
			},
			// 跳转到用户管理页面
			goAdmin(){
				uni.navigateTo({
					url:"/pages/admin-user/admin-user"
				})
			},
			// 跳转到查看员工笔记页面
			goNote(){
				uni.navigateTo({
					url:"/pages/admin-note/admin-note"
				})
			},
			//跳转到首页
			goIndex(){
				uni.redirectTo({
					url:"../index/index"
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
	.user_info_wrap{
		height: 250rpx;
		overflow: hidden;
		padding-top: 50rpx;
		display: flex;
		border-bottom: 1px solid $myNote-color;
		.user_img_wrap{
			position: relative;
			.userinfo{
				position: absolute;
				text-align: center;
				margin-left: 100rpx;
				display: flex;
				.user_icon{
					width: 180rpx;
					height: 180rpx;
					border-radius: 50%;
				}
				.user_name{
					margin-top: 40rpx;
					margin-left: 40rpx;
					font-size: 60rpx;
					width: 120rpx;
				}
			}
		}
	}
	.admin{
		display: flex;
		width: 750rpx;
		height: 90rpx;
		background-color: $myNote-color;
		color: #fff;
		justify-content: center;
		align-items: center;
		margin-top: 30rpx;
		border-radius: 10rpx;
	}
	.user_btn{
		width: 80%;
		margin-top: 500rpx;
		background-color: $myNote-color;
		color: white;
		border-radius: 98rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
	
</style>

<template>
	<view>
		<button class="user_btn" @click="login" v-if="!userInfo.nickName" open-type="getUserInfo">登录</button>
		<view class="user_info_wrap" v-if="userInfo.nickName">
			<view class="user_img_wrap">
				<view class="userinfo">
					<image class="user_icon" :src="userInfo.avatarUrl" mode="widthFix"></image>
					<text class="user_name">{{userInfo.nickName}}</text>
				</view>
			</view>
		</view>
		<view v-if="userInfo.nickName" class="admin" @click="goAdmin">
			管理页面
		</view>
		
		<view class="cu-bar tabbar bg-blue">
			<view class="action text-gray" style="padding-top: 10rpx;" @click="goIndex">
				<view class="cuIcon-homefill"></view> 首页
			</view>
			<view class="action text-white add-action">
				<button class="cu-btn cuIcon-add bg-white shadow" @click="addNote"></button>
				添加
			</view>
			<view class="action text-white" style="padding-top: 10rpx;">
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
				userInfo:{}
			}
		},
		methods: {
			// 跳转到添加笔记页面
			addNote(){
				uni.navigateTo({
					url:"../add-Note/add-Note"
				})
			},
			// 点击登录按钮获取用户信息
			login(){
				uni.getUserInfo({
					success: (res) => {
						this.userInfo=res.userInfo
						console.log(res)
					}
				})
			},
			goAdmin(){
				uni.navigateTo({
					url:"/pages/admin-user/admin-user"
				})
			},
			goIndex(){
				uni.redirectTo({
					url:"../index/index"
				})
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

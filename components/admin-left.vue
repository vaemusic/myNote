<template>
	<view>
		<view class="left_menu">
			<view v-for="(item,index) in left_menu" 
			:key="index" 
			@click="leftClickHandle(index)" 
			:class="active===index?'active':''">
				{{item}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:['active'],
		data() {
			return {
				left_menu:['首页','用户管理','笔记管理'],
				ziActive:0
			};
		},
		methods: {
			leftClickHandle(index) {
				this.ziActive=active
				if(active==1){
					uni.navigateTo({
						url:"/pages/admin-user/admin-user"
					})
				}
				console.log(this.active)
			}
		},
	}
</script>

<style lang="scss">
	
	.left_menu{
		width: 200rpx;
		height: 100%;
		border-right: 1px solid #eee;
		view {
			height: 60px;
			line-height: 60px;
			color: #333;
			text-align: center;
			font-size: 30rpx;
			border-top: 1px solid #eee;
		}
		.active{
			background-color: $myNote-color;
			color: #fff;
		}
	}
</style>

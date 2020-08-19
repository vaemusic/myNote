<template>
	<view>
		<!-- 标题 -->
		<view class="user_admin">
			<view class="title">
				用户管理
			</view>
		</view>
		<!-- 用户信息 采用表格形式 -->
		<view class="userinfo">
			<t-table border="1" border-color="#95b99e" @change="change">
				<!-- 表头 -->
				<t-tr font-size="18" color="#95b99e" align="left" style="width:780rpx;">
					<t-th align="center">用户名</t-th>
					<t-th align="center">用户权限</t-th>
					<t-th align="center">操作</t-th>
				</t-tr>
				<!-- 表体 -->
				<t-tr font-size="18" color="#5d6f61" align="right" v-for="(item,index) in tableList" :key="item.id">
					<t-td align="center" style="width: 625rpx;">{{ item.nickName }}</t-td>
					<t-td align='center' style="width:100rpx;">
						<!-- @change:绑定修改用户级别事件，需要传递当前用户索引和默认事件 -->
						<!-- :value:用户的级别，取值范围为0 1 2，分别代表员工、领导和管理员 -->
						<!-- :range:下拉选择列表，显示的文字为下边data中array数组定义的内容 -->
						<picker @change="bindPickerChange(index,$event)" :value="item.level" :range="array">
							<!-- 根据当前用户级别，显示不同级别名称 -->
							<view>{{array[item.level]}}</view>
						</picker>
					</t-td>
					<t-td style="width:50rpx;">
						<!-- 删除 暂未开发 -->
						<button disabled="true">删除</button>
					</t-td>
				</t-tr>
			</t-table>
		</view>
	</view>
</template>

<script>
	import tTable from '@/components/t-table/t-table.vue';
	import tTh from '@/components/t-table/t-th.vue';
	import tTr from '@/components/t-table/t-tr.vue';
	import tTd from '@/components/t-table/t-td.vue';
	export default {
		data() {
			return {
				//员工信息
				tableList:[],
				//下拉列表的文字
				array: ['员工', '领导', '管理员']
			}
		},
		onLoad() {
			//页面初始化时获取所有用户信息
			this.getAllUser()
		},
		methods: {
			//修改员工权限
			bindPickerChange: function(index,event) {
				const level = event.target.value
				const openid=this.tableList[index].openid
				uni.showLoading({
					title:'权限更改中……',
					mask:true
				})
				wx.cloud.callFunction({
					name:'updateEmpLevel',
					data:{
						'level':level,
						'openid':openid
					}
				}).then(res=>{
					//修改成功之后重新获取一遍所有用户，以更新当前用户级别
					this.getAllUser()
					uni.hideLoading()
				})
			},
			//获取所有员工
			getAllUser(){
				wx.cloud.callFunction({
					name:'getAllUser'
				}).then(res=>{
					this.tableList=res.result.data
					console.log(this.tableList)
				})
			}
		},
		components: {
			tTable,
			tTh,
			tTr,
			tTd
		}
	}
</script>

<style lang="scss">
	page{
		height: 100%;
		display: flex;
	}
	.right{
		font-size: 80rpx;
		color: $myNote-color;
		padding-left: 320rpx;
	}
	.btn{
		margin-top: 30rpx;
		margin-left: 70rpx;
		width: 80%;
		background-color: $myNote-color;
		color: white;
		border-radius: 98rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
	.uni-title{
		width: 300rpx;
		height: 80rpx;
		line-height: 50rpx;
		text-align: center;
		padding-top: 20rpx;
		letter-spacing: 5rpx;
		border-bottom: 1px solid #eee;
		justify-items: center;
		border-radius: 50rpx;
		margin-bottom: 20rpx;
	}
	.active{
		background-color: $myNote-color;
		color: #fff;
	}
	.title{
		margin-top: 40rpx;
		font-size: 50rpx;
		color: $myNote-color;
	}
	.user_admin{
		margin-left: 320rpx;
	}
	.userinfo{
		margin-left: 2rpx;
		margin-top: 10rpx;
		button{
			width: 145rpx;
			margin-left: 30rpx;
		}
	}
</style>

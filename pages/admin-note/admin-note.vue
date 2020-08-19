<template>
	<view>
		<view class="title">
			员工笔记
		</view>
		<view class="noteinfo">
			<t-table border="1" border-color="#95b99e" @change="change">
				<t-tr font-size="18" color="#95b99e" align="left" style="width:780rpx;">
					<t-th align="center" style="width:625rpx;">员工</t-th>
					<t-th align="center">操作</t-th>
				</t-tr>
				<t-tr font-size="18" color="#5d6f61" align="right" v-for="(item,index) in tableList" :key="index">
					<t-td align="center" style="width: 625rpx;">{{item.nickName}}</t-td>
					<t-td style="width:50rpx;">
						<button @click="getEmpNote(item.openid)">查看</button>
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
				left_menu:['用户管理','笔记管理'],
				tableList:[]
			}
		},
		onLoad() {
			this.getAllUser()
		},
		methods: {
			//根据该员工的openid查看该员工的笔记
			getEmpNote(openid){
				uni.navigateTo({
					url:"/pages/note_list/note_list?openid="+openid
				})
				console.log(openid)
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
	.note_admin{
		margin-left: 320rpx;
	}
	.noteinfo{
		margin-left: 2rpx;
		margin-top: 10rpx;
	}
	.title{
		margin-left: 260rpx;
		margin-top: 40rpx;
		font-size: 50rpx;
		color: $myNote-color;
	}
</style>

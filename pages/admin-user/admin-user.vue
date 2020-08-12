<template>
	<view>
		<button @click="handleClick" class="btn">导航</button>
		<uni-drawer ref="drawer" :visible="true">
		    <view style="padding:30rpx;">
		        <view v-for="(item,index) in left_menu" 
				class="uni-title active" 
				:key="index" 
				@click="menuClickHandle(index)">{{item}}</view>
		    </view>
		</uni-drawer>
		<view class="user_admin">
			<view class="title">
				用户管理
			</view>
		</view>
		<view class="userinfo">
			<t-table border="1" border-color="#95b99e" @change="change">
				<t-tr font-size="18" color="#95b99e" align="left" style="width:780rpx;">
					<t-th align="center">用户名</t-th>
					<t-th align="center">用户权限</t-th>
					<t-th align="center">操作</t-th>
				</t-tr>
				<t-tr font-size="18" color="#5d6f61" align="right" v-for="item in tableList" :key="item.id">
					<t-td align="center" style="width: 625rpx;">{{ item.nickName }}</t-td>
					<t-td align='center' style="width:100rpx;">
						<picker @change="bindPickerChange(item.id,$event)" :value="item.index" :range="array">
							<view>{{array[item.index]}}</view>
						</picker>
					</t-td>
					<t-td style="width:50rpx;">
						<button @click="edit(item)">删除</button>
					</t-td>
				</t-tr>
			</t-table>
		</view>
	</view>
</template>

<script>
	import uniDrawer from "@/components/uni-drawer/uni-drawer.vue"
	import tTable from '@/components/t-table/t-table.vue';
	import tTh from '@/components/t-table/t-th.vue';
	import tTr from '@/components/t-table/t-tr.vue';
	import tTd from '@/components/t-table/t-td.vue';
	
	export default {
		data() {
			return {
				left_menu:['用户管理','笔记管理'],
				tableList:[
					{
						id:0,
						nickName:"飘~",
						index:0
					},
					{
						id:1,
						nickName:"大卓~",
						index:0
					},
					{
						id:2,
						nickName:"张三",
						index:0
					},
					{
						id:3,
						nickName:"李四",
						index:0
					},
					{
						id:4,
						nickName:"王五",
						index:0
					}
				],
				array: ['员工', '主管', '董事长'],
				index: 0
			}
		},
		methods: {
			handleClick(){
			    this.$refs.drawer.open();
			},
			menuClickHandle(index){
				if(index==1){
					uni.navigateTo({
						url:"/pages/admin-note/admin-note"
					})
				}
			},
			bindPickerChange: function(id,event) {
				console.log('picker发送选择改变，携带值为', id,event)
				this.tableList[id].index = event.target.value
			}
		},
		components: {
			uniDrawer,
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

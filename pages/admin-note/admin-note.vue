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
		<view class="title">
			笔记管理页面
		</view>
		<view class="noteinfo">
			<t-table border="1" border-color="#95b99e" @change="change">
				<t-tr font-size="18" color="#95b99e" align="left" style="width:780rpx;">
					<t-th align="center" style="width:625rpx;">标题</t-th>
					<t-th align="center">用户</t-th>
					<t-th align="center">操作</t-th>
				</t-tr>
				<t-tr font-size="18" color="#5d6f61" align="right" v-for="item in tableList" :key="item.id">
					<t-td align="center" style="width: 625rpx;">{{ item.title }}</t-td>
					<t-td align='center' style="width:100rpx;">
						{{item.nickName}}
					</t-td>
					<t-td style="width:50rpx;">
						<button @click="edit">查看</button>
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
						title:"测试标题"
					},
					{
						id:1,
						nickName:"大卓~",
						title:"清明雨上"
					},
					{
						id:2,
						nickName:"张三",
						title:"测试标题"
					},
					{
						id:3,
						nickName:"李四",
						title:"测试标题"
					},
					{
						id:4,
						nickName:"王五",
						title:"测试标题"
					}
				]
			}
		},
		methods: {
			handleClick(){
			    this.$refs.drawer.open();
			},
			menuClickHandle(index){
				if(index==0){
					uni.navigateTo({
						url:"/pages/admin-user/admin-user"
					})
				}
			},
			edit(){
				uni.navigateTo({
					url:"/pages/note_detail/note_detail?id=d1cc6d125f27b930003d2d9768dc5bb0"
				})
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

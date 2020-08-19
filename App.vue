<script>
	export default {
		onLaunch: function() {
			wx.cloud.init({
					// env 参数说明：
					//   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
					//   此处请填入环境 ID, 环境 ID 可打开云控制台查看
					//   如不填则使用默认环境（第一个创建的环境）    
					//env: '你的环境ID',
					env: 'wxclouddev-wdq66',
					traceUser: true,
					})
			console.log('初始化')
			
			var userInfo = uni.getStorageSync('userInfo')
			if(!userInfo){
				uni.getUserInfo({
					success: (res) => {
						//this.userInfo=res.userInfo
						wx.cloud.callFunction({
							name:'addEmp',
							data:{
								'userinfo':res.userInfo
							}
						}).then(res=>{
							//console.log(res,this.userInfo)
						})
						uni.setStorageSync('userInfo',res.userInfo)
					}
				})
			}
		},
		onLoad() {
			this.getUserLevel()
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			// 获取当前用户等级
			getUserLevel(){
				wx.cloud.callFunction({
					name:'getEmpLevel'
				}).then(res=>{
					uni.setStorageSync('level',res.result.data[0].level) 
				})
			}
		},
	}
</script>

<style>
	@import "colorui/main.css";
	@import "colorui/icon.css";
	/*每个页面公共css */
</style>

<template>
	<view class="flex align-center px-5 py-3">
		<!-- #ifdef APP-PLUS || MP-ALIPAY -->
		<view class="flex-1 flex align-center justify-center"
		v-for="(item,index) in providerList" :key="index"
		@click="login(item)">
			<view :class="item.icon + ' '+item.bgColor" class="iconfont font-lg text-white flex align-center justify-center rounded-circle" style="width: 100rpx;height: 100rpx;"></view>
		</view>
		<!-- #endif -->
		
		<!-- #ifdef MP-WEIXIN -->
		<button type="primary" open-type="getUserInfo" @getuserinfo="mpGetUserInfo">微信一键登录</button>
		<!-- #endif -->
		
	</view>
</template>

<script>
	export default {
		props: {
			back: {
				type: Boolean,
				default: false
			},
		},
		data() {
			return {
				providerList: []
			}
		},
		mounted(){
			uni.getProvider({
				service: 'oauth',
				success: (result) => {
					this.providerList = result.provider.map((value) => {
						let providerName = '';
						let icon = ''
						let bgColor = ''
						switch (value) {
							case 'weixin':
								providerName = '微信登录'
								icon = 'icon-weixin'
								bgColor = 'bg-success'
								break;
							case 'qq':
								providerName = 'QQ登录'
								icon = 'icon-QQ'
								bgColor = 'bg-primary'
								break;
							case 'sinaweibo':
								providerName = '新浪微博登录'
								icon = 'icon-xinlangweibo'
								bgColor = 'bg-warning'
								break;
							// #ifdef MP-ALIPAY
							case 'alipay':
								providerName = '支付宝登录';
								icon='changyonglogo30';
								bgColor = 'bg-primary'
								break;
							// #endif
						}
						return {
							name: providerName,
							id: value,
							icon:icon,
							bgColor:bgColor
						}
					});
					console.log(this.providerList,"providers");
				},
				fail: (error) => {
					console.log('获取登录通道失败', error);
				}
			});
		},
		methods: {
			// 登录
			login(item) {
				console.log(item,"物体");
				uni.login({
					provider: item.id,
					// #ifdef MP-ALIPAY
					scopes: 'auth_user',  //支付宝小程序需设置授权类型
					// #endif
					success: res => {
						console.log(res,"成功");
						/*
						{
							"authResult": {
								"access_token": "28_ceqdzxESqQwYEFKp6LjgHZkUxkMpF6MqvCi0gr-Spwurp87utuxkHTr0nZFh7-TNZTQ4ds5ufnRoGnLsFw59NLWPWs3MNrZpOg1IsoQmfoE",
								"expires_in": 7200,
								"refresh_token": "28_FAqK9VRNebbvKiEBgG3V9lC5NHEGRuhnoXS3pkGdE3M2GTPmd2eVFWBRNbcAwF5heXPb4RWMmCXeYJOiaTUzn0TlXIcD4xFO3CnkShN5ObU",
								"openid": "oRrdQt3HS3Ns2TFCVLMOyxbR9DcM",
								"scope": "snsapi_userinfo",
								"unionid": "oU5Yytz7ielo7Xw00LMgZsPeSDkQ"
							},
							"errMsg": "login:ok"
						}
						*/
					   // 获取用户信息
					   uni.getUserInfo({
						 provider: item.id,
						 success:(infoRes)=> {
						    let obj = {
								provider:item.id,
								openid:infoRes.userInfo.openId,
								expires_in:0,
								nickName:infoRes.userInfo.nickName,
								avatarUrl:infoRes.userInfo.avatarUrl,
							}
							this.loginEvent(obj)
						 }
					   });
					},
					fail: () => {
						uni.showToast({
							title: '登录失败',
							icon: 'none'
						});
					},
				});
			},
			// 登录逻辑
			loginEvent(data){
				this.$H.post('/user/otherlogin',data)
				.then(res=>{
					// 修改vuex的state,持久化存储
					this.$store.commit('login',this.$U.formatUserinfo(res))
					// 返回上一页
					if(this.back){
						uni.navigateBack({
							delta: 1
						});
					}
					uni.showToast({
						title: '登录成功',
						icon: 'none'
					});
				})
			},
			// #ifdef MP-WEIXIN
			mpGetUserInfo(result) {
				uni.showLoading({ title: '登录中...', mask: true });
				// 获取失败
				if (result.detail.errMsg !== 'getUserInfo:ok') {
					uni.hideLoading();
					uni.showModal({
						title: '获取用户信息失败',
						content: '错误原因' + result.detail.errMsg,
						showCancel: false
					});
					return;
				}
				let userinfo = result.detail.userInfo;
				uni.login({
					provider:"weixin",
					success: (res) => {
						this.MpLogin({
							url:"/wxlogin",
							code:res.code,
							nickName:userinfo.nickName,
							avatarUrl:userinfo.avatarUrl
						})
					},
					complete: () => {
						uni.hideLoading();
					}
				})
			},
			// #endif
			MpLogin(options){
				this.$H.post(options.url,{
					code:options.code,
					nickName:options.nickName,
					avatarUrl:options.avatarUrl
				}).then(data=>{
					// 修改vuex的state,持久化存储
					this.$store.commit('login',this.$U.formatUserinfo(data))
					// 返回上一页
					if(this.back){
						uni.navigateBack({
							delta: 1
						});
					}
					uni.showToast({
						title: '登录成功',
						icon: 'none'
					});
				});
			},
		},
	}
</script>

<style>
	
</style>

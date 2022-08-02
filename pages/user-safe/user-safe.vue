<template>
	<view>
		<uni-list-item :title="item.name" 
		v-for="(item,index) in list"
		:key="index" @click="handleEvent(item)">
			<view class="flex align-center text-right text-light-muted" 
			slot="right">
				{{item.data}}
			</view>
		</uni-list-item>
	</view>
</template>

<script>
	import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue';
	import { mapState } from 'vuex'
	export default {
		components: {
			uniListItem
		},
		data() {
			return {
				list:[]
			}
		},
		computed: {
			...mapState({
				user:state=>state.user
			})
		},
		onShow() {
			this.__init()
		},
		methods: {
			__init(){
				let list = [{
					name:"手机号",
					data:this.user.phone ? this.user.phone : "未绑定",
					type:"navigateTo",
					url:"/pages/user-phone/user-phone"
				},{ 
					name:"登录密码",
					data:this.user.password ? "修改密码" : "未设置",
					type:"navigateTo",
					url:"/pages/user-password/user-password"
				},{ 
					name:"邮箱绑定",
					data:this.user.email ? this.user.email : "未绑定",
					type:"navigateTo",
					url:"/pages/user-email/user-email"
				}]
				this.list = [...list]
				this.$H.get('/user/getuserbind',{},{
					token:true
				}).then(res=>{
					this.$store.commit('editUserInfo',{
						key:"user_bind",
						value:res
					})
					let other = [{
						name:"微信账号",
						data:this.user.user_bind.weixin ? this.user.user_bind.weixin.nickname:"未绑定",
						type:"bind",
						provider:"weixin"
					}]
					this.list = [...this.list,...other]
				})
			},
			handleEvent(item){
				if(item.type === '') return
				switch (item.type){
					case 'navigateTo':
					uni.navigateTo({
						url: item.url,
					});
						break;
					case 'bind':
					if(item.data !== '未绑定'){
						return uni.showToast({
							title: '你已经绑定过了',
							icon: 'none'
						});
					}
					this.bind(item.provider)
						break;
				}
			},
			// 绑定第三方登录
			bind(provider){
				uni.login({
					provider: provider,
					success: r => {
						uni.getUserInfo({
							provider: provider,
							success:(res)=> {
								let obj = {
									provider:provider,
									openid:res.userInfo.openId,
									nickName:res.userInfo.nickName,
									avatarUrl:res.userInfo.avatarUrl,
								}
								this.$H.post('/user/bindother',obj,{
									token:true,
									native:true
								}).then(result=>{
									if(result.data.errorCode){
										return uni.showToast({
											title: result.data.msg,
											icon: 'none'
										});
									}
									this.__init()
									uni.showToast({
										title: '绑定成功',
										icon: 'none'
									});
								})
							}
						});
					},
				});
				
			}
		}
	}
</script>

<style>

</style>

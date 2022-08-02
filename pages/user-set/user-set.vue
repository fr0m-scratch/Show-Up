<template>
	<view>
		<template v-if="loginStatus">
			<uni-list-item title="修改账户密码" @click="open('user-safe')"></uni-list-item>
			<uni-list-item title="用户资料编辑" @click="open('user-userinfo')"></uni-list-item>
		</template>
		<uni-list-item title="清除缓存" @click="clear">
			<view slot="right" class="text-muted">{{currentSize|format}}</view>
		</uni-list-item>
		<uni-list-item title="关于社区" @click="open('about')"></uni-list-item>
		
		<view class="py-2 px-3" v-if="loginStatus">
			<button class="bg-main text-white" style="border-radius: 50rpx;border: 0;" type="primary" @click="logout">退出登录</button>
		</view>
		
	</view>
</template>

<script>
	import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue';
	import {mapState} from 'vuex';
	export default {
		components: {
			uniListItem
		},
		data() {
			return {
				currentSize:0
			}
		},
		onLoad() {
			this.getStorageInfo()
		},
		filters: {
			format(value) {
				return value > 1024 ? (value/1024).toFixed(2) + 'MB' : value.toFixed(2) + 'KB';
			}
		},
		computed: {
			...mapState({
				loginStatus:state=>state.loginStatus
			})
		},
		methods: {
			getStorageInfo(){
				let res = uni.getStorageInfoSync()
				this.currentSize = res.currentSize
			},
			open(path){
				uni.navigateTo({
					url: `../${path}/${path}`
				});
			},
			// 清除缓存
			clear(){
				uni.showModal({
					title: '提示',
					content: '是否要清除所有缓存？',
					cancelText: '不清除',
					confirmText: '清除',
					success: res => {
						if(res.confirm){
							uni.clearStorageSync()
							this.getStorageInfo()
							uni.showToast({
								title: '清除成功',
								icon: 'none'
							});
						}
					},
				});
			},
			// 退出登录
			logout(){
				uni.showModal({
					content: '是否要退出登录',
					success: (res)=> {
						if (res.confirm) {
							this.$store.commit('logout')
							// 关闭socket
							this.$store.dispatch('closeSocket')
							uni.navigateBack({
								delta: 1
							});
							uni.showToast({
								title: '退出登录成功',
								icon: 'none'
							});
						} 
					}
				});
			}
		}
	}
</script>

<style>

</style>

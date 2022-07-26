<template>
	<view>
		<template v-if="loginStatus">
			<uni-list-item title="账号与安全" @click="open('user-safe')"></uni-list-item>
			<uni-list-item title="资料编辑" @click="open('user-userinfo')"></uni-list-item>
		</template>
		<uni-list-item title="清除缓存" @click="clear">
			<view slot="right" class="text-muted">{{currentSize|format}}</view>
		</uni-list-item>
		<uni-list-item v-if="loginStatus" title="意见反馈" @click="open('user-feedback')"></uni-list-item>
		<uni-list-item title="关于社区" @click="open('about')"></uni-list-item>
		
		<view class="py-2 px-3" v-if="loginStatus">
			<button class="bg-main text-white" style="border-radius: 50rpx;border: 0;" type="primary" @click="logout">退出登录</button>
		</view>
			
	</view>
</template>

<script>
	import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue'
	export default {
		components:{
			uniListItem
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>

<template>
	<view class="flex align-center p-2 border-bottom border-light-secondary" hover-class="bg-light"
	@click="open">
		<image :src="item.avatar"
		style="height: 80rpx; width: 80rpx;"
		class="rounded-circle mr-2"></image>
		<view class="flex flex-column flex-1">
			<view class="flex align-center justify-between">
				<text class="font-xm">{{item.username}}</text>
				<text class="font text-secondary">{{item.update_time}}</text>
			</view>
			<view class="flex justify-between">
				<text class="text-secondary text-ellipsis" 
				style="max-width: 500rpx;">{{item.data}}</text>
				<uni-badge :text="item.unread" type="error"></uni-badge>
			</view>
		</view>
	</view>
</template>

<script>
	//import 时间库
	import uniBadge from "@/components/uni-ui/uni-badge/uni-badge.vue"
	export default {
		components:{
			uniBadge
		},
		props:{
			item:Object,
			index:Number
		},
		methods:{
			open() {
				uni.navigateTo({
					url:'/pages/user-chat/user-chat'
				});
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style>

</style>
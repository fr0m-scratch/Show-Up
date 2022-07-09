<template>
	<view>
		<!-- 时间显示 -->
		<view class="py-2 flex align-center justify-center font-sm text-light-muted">
			
		</view>
		<!-- 消息气泡 -->
		<view class="flex align-start p-2 my-1"
		:style="isSelf ? 'flex-direction: row-reverse;' : ' '">
			<image :src ="item.avatar"
			style="height: 100rpx;width: 100rpx;"
			class="rounded-circle"></image>
			<view class="flex bg-light p-2 rounded mx-2 mt-1"
			style="max-width: 400rpx;min-width: 50rpx;">
				{{item.data}}
			</view>
		</view>
	</view>
</template>

<script>
	//模拟当前用户uid
	const uid = 1;
	export default {
		props:{
			item:Object,
			index:Number
		},
		computed: {
			isSelf(){
				return uid === this.item.user_id
			}
		}
		
	}
</script>

<style>

</style>
<template>
	<view class="flex align-center justify-start p-2">
		<image :src="item.cover"
		style="height:150rpx;width:150rpx;"
		class="rounded mr-2"></image>
		<view class="flex flex-column ">
			<text class="font-md text-dark">#{{item.title}}#</text>
			<text class="font text-secondary">{{item.desc}}</text>
			<view class="flex align-center font text-secondary">
				<text>动态:{{item.news_count}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			item:Object,
			index:Number
		},
	}
</script>

<style>
</style>
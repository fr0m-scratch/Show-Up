<template>
	<view>
		<view style = "display: flex; justify-content: center; padding: 50rpx">
			<view class="animated" hover-class="fadeIn"
				style="border: 1rpx solid #333333; padding: 20rpx;">
					猫咪
			</view>
		</view> 
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'NYU 论坛'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>

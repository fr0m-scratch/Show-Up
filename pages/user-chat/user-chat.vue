<template>
	<view>
		<uni-nav-bar backgroundColor="#7b5aa6" color="#cbd3da"
		leftIcon="back" title="username" @clickLeft="back" statusBar="true">
		</uni-nav-bar >
		<view style="height: 100rpx;"
		class="fixed-bottom flex align-center border-top bg-white">
			<input type="text" value="" 
			class="flex-1 rounded ml-1 bg-light"
			style="padding: 5rpx;"/>
			
			<uni-icons type="paperplane" size="30" color="purple"
			style = "width: 100rpx;"></uni-icons>
			
		</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-ui/uni-icons/uni-icons.vue";
	import statusBar from "@/components/uni-ui/uni-nav-bar/uni-status-bar.vue";
	import uniNavBar from "@/components/uni-ui/uni-nav-bar/uni-nav-bar.vue" 
	export default {
		components:{
			uniIcons,
			statusBar,
			uniNavBar
		},
		data() {
			return {
				
			}
		},
		methods: {
			back(){
				uni.navigateTo({
					url:"/pages/msg/msg"
				})
			
			}
		}
	}
</script>

<style>

</style>

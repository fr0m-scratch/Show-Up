<template>
	<view>
		<uni-nav-bar backgroundColor="#7b5aa6" color="#cbd3da"
		leftIcon="back" title="username" @clickLeft="back">
		</uni-nav-bar>
	</view>
</template>

<script>
	import statusBar from "@/components/uni-ui/uni-nav-bar/uni-status-bar.vue";
	import uniNavBar from "@/components/uni-ui/uni-nav-bar/uni-nav-bar.vue" 
	export default {
		components:{
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

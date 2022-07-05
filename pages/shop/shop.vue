<template>
	<view>
		<!-- 导航 -->
		<uni-nav-bar :border="false" :fixed="true" :statusBar="true">
			<view class="flex align-center justify-center font-weight-bold">
				<view class="font-lg text-main mx-1">关注</view>
				<view class="font-lg text-muted mx-1">话题</view>
				
			</view>
			<text slot="right" class="gg-pen"></text>
			
		</uni-nav-bar>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-ui/uni-nav-bar/uni-nav-bar.vue";
	export default {
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


<template>
	<view>
		<uni-nav-bar leftIcon="back" rightIcon="more-filled" :title="title"></uni-nav-bar>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-ui/uni-nav-bar/uni-nav-bar.vue'
	export default {
		data() {
			return {
				title:"title",
			}
		},
		components:{
			uniNavBar
		},
		onLoad(e) {
			console.log(e.detail)
			if (e.detail) {
				this.__init(JSON.parse(e.detail))
			}
		},
		methods: {
			__init(data) {
				this.title = data.title
			}
		}
	}
</script>

<style>

</style>

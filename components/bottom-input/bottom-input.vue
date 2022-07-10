<template>
	<view>
		<view style="height: 100rpx;"
		class="fixed-bottom flex align-center border-top bg-white pb-5">
			<input type="text" v-model="content"
			class="flex-1 rounded ml-1 bg-light"
			style="padding: 5rpx;" @confirm="submit"/>
			<uni-icons type="paperplane" size="30" color="purple"
			style = "width: 100rpx;" @click="submit"></uni-icons>
		</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-ui/uni-icons/uni-icons.vue"
	export default {
		name:"bottom-input",
		data() {
			return {
				content:"",
				
			};
		},
		components:{
			uniIcons
		},
		methods:{
			submit(){
				if (this.content === ''){
					return uni.showToast({
						title:'不能发送空白内容',
						icon:'none'
					});
				}
				
				this.$emit('submit', this.content)
				this.content = ''
				
			},
		}
	}
</script>

<style>

</style>
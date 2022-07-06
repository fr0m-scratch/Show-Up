<template>
	<view>
		<view class="flex align-center justify-between px-2">
			<text class="font-md font-weight-normal">热门分类</text>
			<view class="flex align-center font text-secondary m-1" @click="openMore">
				更多 <uni-icons type="arrowright"></uni-icons>
			</view>
		</view>
		<view class="flex align-center py-3 px-2 border-bottom">
			<view class="border rounded bg-light mx-1 py px-1" v-for="(item,index) in hotCat" 
			:key="index" @click="openDetail(item)">
				{{item.name}}
			</view>
		</view>
	</view>

</template>

<script>
	import uniIcons from "@/components/uni-ui/uni-icons/uni-icons.vue"
	export default {
		props:['hotCat'],
		methods:{
			openMore(){
				uni.navigateTo({
					url:'/pages/topic-nav/topic-nav',
				});
			},
			openDetail(item) {
				console.log('huati');
				
			}
		},
		components: {
			uniIcons
		}
	}
</script>

<style>
</style>
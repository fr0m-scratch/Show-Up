<template>
	<view>
		<uni-search-bar placeholder="Type to search" cancelButton="auto" :showCase="showCase"></uni-search-bar>
		<view class="flex align-center py-2">
			<view class="flex-1 flex align-center justify-center" v-for="(item,index) in tabBars" :key = "index" :class="index === tabIndex ? 'font-lg font-weight bold text-main':'font-md'" @click="changeTab(index)">
			{{item.name}} {{item.num}}
			</view>
		</view>
	</view>
</template>

<script>
	import uniSearchBar from '@/components/uni-ui/uni-search-bar/uni-search-bar.vue'
	export default {
		data() {
			return {
				showCase: false,
				tabBars:[{
					name:"好友:",
					num:0
				},
				{
					name:"关注:",
					num:1
				},
				{
					name:"粉丝:",
					num:0
				}],
				tabIndex:0
			}
		},
		components:{
			uniSearchBar
		},
		methods: {
			changeTab(index){
				this.tabIndex = index
			}
		}
	}
</script>

<style>

</style>

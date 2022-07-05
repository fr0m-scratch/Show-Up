<template>
	<view>
		<!-- 导航 -->
		<uni-nav-bar :border="false" :fixed="true" :statusBar="true" @clickRight="openAddInput">
			<view class="flex align-center justify-center font-weight-bold w-100">
			<!-- 	<view class="font-lg text-main mx-1">关注</view> -->
				<view class="mx-1 my-4" @click="changeTab(index)"
				v-for="(item,index) in tabBar" :key="index"
				:class="tabIndex === index ? 'font-lg text-main' : 'font-md text-muted'">
					{{item.name}}
				</view>
				
			</view>
			<text slot="right" class="gg-pen mr-2"></text>
			
		</uni-nav-bar>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-ui/uni-nav-bar/uni-nav-bar.vue";
	export default {
		components: {
			uniNavBar
		},
		data() {
			return {
				tabIndex:0,
				tabBar:[{
					name:"关注"
				},{
					name:"话题"
				}]
				
			}
		},
		methods: {
			//打开发布
			openAddInput(){
				uni.navigateTo({
					url: '../add-input/add-input',
				});
			},
			//打开选项卡
			changeTab(index){
				this.tabIndex = index
				
			}
			
			
		}
	}
</script>

<style>

</style>


<template>
	<view>
		<uni-nav-bar backgroundColor="#7b5aa6" color="#cbd3da"
		leftIcon="back" title="username" @clickLeft="back" statusBar="true">
		</uni-nav-bar >
			
		<!-- 聊天 -->
		<scroll-view scroll-y="true" style="'height:'+ scrollH+'px;'">
			
			<block v-for="(item, index) in list" :key="index">
				<user-chat :item="item" :index="index"></user-chat>
			</block>
		</scroll-view>
			
		<!-- 底部输入框 -->	
		<view style="height: 100rpx;"
		class="fixed-bottom flex align-center border-top bg-white pb-5">
			<input type="text" value="" 
			class="flex-1 rounded ml-1 bg-light"
			style="padding: 5rpx;"/>
			<uni-icons type="paperplane" size="30" color="purple"
			style = "width: 100rpx;"></uni-icons>
		</view>
		
	</view>
</template>

<script>
	
	import userChat from "@/components/user-chat/user-chat.vue";
	import uniIcons from "@/components/uni-ui/uni-icons/uni-icons.vue";
	import statusBar from "@/components/uni-ui/uni-nav-bar/uni-status-bar.vue";
	import uniNavBar from "@/components/uni-ui/uni-nav-bar/uni-nav-bar.vue" 
	export default {
		components:{
			userChat,
			uniIcons,
			statusBar,
			uniNavBar
		},
		data() {
			return {
				scrollH: 500,
				list:[{
					user_id: 2,
					avatar:"../../static/Dr. Von Neumann.jpeg",
					username:"bili",
					data:"hellooo",
					type:"text",
					create_time:1657264852
				},{
					user_id: 1,
					avatar:"../../static/cat.jpeg",
					username:"goubili",
					data:"?",
					type:"text",
					create_time:1657264852
				}]
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					this.scrollH = res.windowHeight - uni.upx2px(151)
				}
			})
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

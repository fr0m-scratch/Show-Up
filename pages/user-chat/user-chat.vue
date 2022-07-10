<template>
	<view>
		<uni-nav-bar backgroundColor="#7b5aa6" color="#cbd3da"
		leftIcon="back" title="username" @clickLeft="back" statusBar="true">
		</uni-nav-bar >
			
		<!-- 聊天 -->
		<scroll-view scroll-y="true" 
		style="position: absolute;top: 180rpx; left: 0;right: 0;bottom: 140rpx;" :scroll-into-view="scrollInto"
		scroll-with-animation>
		
			
			<block v-for="(item, index) in list" :key="index">
				<view :id="'chat' + index">
					<user-chat :item="item" :index="index"></user-chat>
				</view>
			</block>
		</scroll-view>
			
		<!-- 底部输入框 -->	
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
				scrollInto:"",       
				content:"",
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
				},{
					user_id: 1,
					avatar:"../../static/cat.jpeg",
					username:"goubili",
					data:"?",
					type:"text",
					create_time:1657264852
				},{
					user_id: 1,
					avatar:"../../static/cat.jpeg",
					username:"goubili",
					data:"?",
					type:"text",
					create_time:1657264852
				},{
					user_id: 1,
					avatar:"../../static/cat.jpeg",
					username:"goubili",
					data:"?",
					type:"text",
					create_time:1657264852
				},{
					user_id: 1,
					avatar:"../../static/cat.jpeg",
					username:"goubili",
					data:"?",
					type:"text",
					create_time:1657264852
				},{
					user_id: 1,
					avatar:"../../static/cat.jpeg",
					username:"goubili",
					data:"?",
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
		onReady() {
			this.pageToBottom()
		},
		
		methods: {
			back(){
				uni.navigateTo({
					url:"/pages/msg/msg"
				})
			},
			
			submit(){
				let obj = {
					user_id: 1,
					avatar:"../../static/cat.jpeg",
					username:"goubili",
					type:"text",
					data:this.content,
					create_time:1657264852
				}
				if (this.content === ''){
					return uni.showToast({
						title:'不能发送空白内容',
						icon:'none'
					});
				}
				this.list.push(obj)
				this.content = ''
				this.pageToBottom()
			},
			pageToBottom(){
				let lastIndex = this.list.length - 1
				if (lastIndex < 0) return;
				this.scrollInto = 'chat' + lastIndex
			}
			
			
			
	},
}
</script>

<style>

</style>

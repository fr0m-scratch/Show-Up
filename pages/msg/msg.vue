<template>
	<view>
		<!-- 自定义导航栏 -->
		<uni-nav-bar backgroundColor="#7b5aa6" color="#cbd3da"

		title="消息" leftIcon="person" @clickLeft="people" statusBar>

		</uni-nav-bar>
		<template v-if="list.length > 0">
		<!-- 消息列表 -->
		<block v-for="(item,index) in list" :key="index">
			<msg-list :item="item" :index="index"></msg-list>
		</block>
		</template>
		<template v-else>
			<no-thing></no-thing>														
		</template>
	</view>	
	
</template>

<script>
	const demo = [{
					avatar:"../../static/Dr. Von Neumann.jpeg",
					username:"kk",
					update_time:1657264852,
					data:"neirongjjjjjjjjjjjjjjjjjjjjkkkkkkkkkkjjjjjjjjjjjjjjjjj",
					unread:2
				},{
					avatar:"../../static/Dr. Von Neumann.jpeg",
					username:"kk",
					update_time:1657264852,
					data:"neirongjjjjjjjjjjjjjjjjjjjjkkkkkkkkkkjjjjjjjjjjjjjjjjj",
					unread:2
				},{
					avatar:"../../static/Dr. Von Neumann.jpeg",
					username:"kk",
					update_time:1657264852,
					data:"neirongjjjjjjjjjjjjjjjjjjjjkkkkkkkkkkjjjjjjjjjjjjjjjjj",
					unread:2
				},{
					avatar:"../../static/Dr. Von Neumann.jpeg",
					username:"kk",
					update_time:1657264852,
					data:"neirongjjjjjjjjjjjjjjjjjjjjkkkkkkkkkkjjjjjjjjjjjjjjjjj",
					unread:2
				},{
					avatar:"../../static/Dr. Von Neumann.jpeg",
					username:"kk",
					update_time:1657264852,
					data:"neirongjjjjjjjjjjjjjjjjjjjjkkkkkkkkkkjjjjjjjjjjjjjjjjj",
					unread:2
				}];
	import uniNavBar from "@/components/uni-ui/uni-nav-bar/uni-nav-bar.vue";
	import msgList from "@/components/msg-list/msg-list.vue";
	import noThing from "@/components/common/no-thing.vue"
	export default {
		data() {
			return {
				list: []
			}
		},
		onLoad() {
			this.list = demo
		},
		watch: {
			name: function(val){
				console.log(val)
			}
		},
		components:{
			uniNavBar,
			msgList,
			noThing
		},
		onPullDownRefresh() {
			this.refresh()
		},
		methods:{
			//消息列表下拉刷新
			refresh(){
				setTimeout(()=>{
					this.list = demo
					uni.stopPullDownRefresh()
				},2000)
			},
			people(){
				uni.navigateTo({
					url: '/pages/user-list/user-list',	
				});
			}
		}
	}
</script>

<style>
.box {
	background-color: palegreen;
	color: "black";
	width: 350upx;
	height: 350upx;
	border-radius: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 50upx
}

</style>

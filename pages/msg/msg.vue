<template>
	<view>
		<!-- 自定义导航栏 -->
		<uni-nav-bar backgroundColor="#7b5aa6" color="#cbd3da"
		title="消息" leftIcon="person" rightIcon="more-filled">
		</uni-nav-bar>
		<!-- 消息列表 -->
		<block v-for="(item,index) in list" :key="index">
		<view class="flex align-center p-2 border-bottom border-light-secondary" hover-class="bg-light">
			<image :src="item.avatar"
			style="height: 80rpx; width: 80rpx;"
			class="rounded-circle mr-2"></image>
			<view class="flex flex-column flex-1">
				<view class="flex align-center justify-between">
					<text class="font-md">{{item.username}}</text>
					<text class="font text-secondary">{{item.update_time}}</text>
				</view>
				<view class="flex justify-between">
					<text class="text-secondary text-ellipsis" 
					style="max-width: 500rpx;">{{item.data}}</text>
					<uni-badge :text="item.unread" type="error"></uni-badge>
				</view>
			</view>
	    </view>
		</block>
	</view>	
	
</template>

<script>
	import uniBadge from "@/components/uni-ui/uni-badge/uni-badge.vue";
	import uniNavBar from "@/components/uni-ui/uni-nav-bar/uni-nav-bar.vue";
	
	export default {
		data() {
			return {
				list:[{
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
				}]
			}
		},
		watch: {
			name: function(val){
				console.log(val)
			}
		},
		components:{
			uniNavBar,
			uniBadge
		},
		 methods:{
			change: function(){
				this.name='b';
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

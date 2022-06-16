<template>
	<view>
		<block v-for="(item, index) in list" :key="index">
		<view class="p-2">
		<!-- 头像 关注 -->
		<view class="flex align-center justify-between">
			<view class="flex align-center">
				<image class="rounded-circle mr-2" :src="item.userpic" style="width: 65rpx; height: 65rpx;" lazy-load></image>
				<view>
					<view class="font-sm" style="line-height: 1.5;">{{item.username}}</view>
					<text class= "font-small text-muted" 
					style="color: #9d9589; line-height: 1.5;">{{item.newstime}}</text>
				</view>
			</view>
			<view class="flex align-center justify-center font rounded bg-main text-white" style="width: 90rpx; height: 50rpx;">
				关注
			</view>
		</view>
		<!-- //标题 -->
		<view class="font-sm my-1">{{item.title}}</view>
		<!-- //图片 -->
		<view>
			<image class="rounded" :src="item.titlepic" style="height: 350rpx; width: 100%;"></image>
		</view>
		<!-- //按钮 -->
		<view class="flex justify-center align-center">
			<view class="flex justify-center align-center flex-1">
				<text class="gg-heart mr-2 text-main" ></text>
				<text>{{item.support.support_count}}</text>
			</view>
			<view class="flex justify-center align-center flex-1">
				<text class="gg-smile-neutral mr-2 text-main"></text>
				<text>{{item.support.unsupport_count}}</text>
			</view>
			<view class="flex justify-center align-center flex-1">
				<text class="gg-comment mr-2 text-main"></text>
				<text>{{item.comment_count}}</text>
			</view>
			<view class="flex justify-center align-center flex-1">
				<text class="gg-share mr-3 text-main"></text>
				<text>{{item.share_num}}</text>
			</view>
		</view>
		</view>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[
					{
						username:"冯诺依曼博士",
						userpic:"/static/Dr. Von Neumann.jpeg",
						newstime:"日期 时间",
						isFollow:false,
						title:"我想说什么",
						titlepic:"/static/Dr. Von Neumann.jpeg",
						support:{
							type:"support",
							support_count:1,
							unsupport_count:1
						},
						comment_count:2,
						share_num:2
					},
					{
						username:"冯诺依曼博士",
						userpic:"/static/Dr. Von Neumann.jpeg",
						newstime:"日期 时间",
						isFollow:false,
						title:"我想说什么",
						titlepic:"/static/Dr. Von Neumann.jpeg",
						support:{
							type:"support",
							support_count:1,
							unsupport_count:1
						},
						comment_count:2,
						share_num:2
					}
				]
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	
</style>

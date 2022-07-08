<template>
	<view>
		<view class="p-2">
		<!-- 头像 关注 -->
		<view class="flex align-center justify-between">
			<view class="flex align-center">
				<image class="rounded-circle mr-2" :src="item.userpic" 
				style="width: 65rpx; height: 65rpx;" lazy-load
				@click="openSpace"></image>
				<view>
					<view class="font-sm" style="line-height: 1.5;">{{item.username}}</view>
					<text class= "font-small text-muted" 
					style="color: #9d9589; line-height: 1.5;">{{item.newstime}}</text>
				</view>
			</view>
			<view class="flex align-center justify-center font rounded bg-main text-white animated faster" 
			v-if="!item.isFollow"
			hover-class="bounceIn" @click="follow"
			style="width: 90rpx; height: 50rpx;">
				关注
			</view>
		</view>
		<!-- //标题 -->
		<view class="font-sm my-1" @click="openDetail">{{item.title}}</view>
		<!-- //图片 -->
		<slot>
			<view>
				<image v-if="item.titlepic"class="rounded" :src="item.titlepic" style="height: 350rpx; width: 100%;"
				@click="openDetail"></image>
			</view>
		</slot>
		<!-- //按钮 -->
		<view class="flex justify-center align-center">
			<view class="flex justify-center align-center flex-1 animated faster" hover-class="bounceIn"
			@click="doSupport('support')" :class="item.support.type === 'support' ? 'text-main' : 'text-muted'">
				<text class="gg-heart mr-2"></text>
				<text>{{item.support.support_count > 0 ? item.support.support_count : ""}}</text>
			</view>
			<view class="flex justify-center align-center flex-1 animated faster" hover-class="bounceIn"
			@click="doSupport('unsupport')" :class="item.support.type === 'unsupport' ? 'text-main' : 'text-muted'">
				<text class="gg-smile-neutral mr-2"></text>
				<text>{{item.support.unsupport_count> 0 ? item.support.unsupport_count : ""}}</text>
			</view>
			<view class="flex justify-center align-center flex-1 animated faster text-muted" hover-class="bounceIn"
			@click="doComment">
				<text class="gg-comment mr-2"></text>
				<text>{{item.comment_count> 0 ? item.comment_count : ""}}</text>
			</view>
			<view class="flex justify-center align-center flex-1 animated faster text-muted" hover-class="bounceIn" 
			@click="doShare">
				<text class="gg-share mr-3"></text>
				<text>{{item.share_num> 0 ? item.share_num : ""}}</text>
			</view>
		</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		props:{
			item:Object,
			index: {
				type:Number,
				default:-1
			},
			isdetail:{
				type:Boolean,
				default:false
			}
		},
		methods:{
			openSpace(){
				console.log("打开个人空间");
			},
			follow(){
				this.$emit('follow',this.index);
			},
			openDetail(){
				uni.navigateTo({
					url:'/pages/detail/detail?detail=' +  JSON.stringify(this.item)
				})
			},
			doSupport(type){
				this.$emit('doSupport',{
					type:type,
					index:this.index
				});
			},
			doComment(){
				if (!this.isdetail){
					return this.openDetail()
				}
				this.$emit('doComment')
			},
			doShare(){
				if (!this.isdetail){
					return this.openDetail()
				}
				this.$emit('doShare')
			}
			
				
		}
	}
</script>

<style>
.support-active{
	color: #7b5aa6;
}
</style>

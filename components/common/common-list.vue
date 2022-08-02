<template>
	<view>
		<view class="p-2">
		<!-- 头像 关注 -->
		<view class="flex align-center justify-between">
			<view class="flex align-center">
				<image class="rounded-circle mr-2"
				:src="item.userpic" @click="openSpace(item.user_id)"
				style="width: 65rpx;height: 65rpx;" 
				lazy-load></image>
				<!-- 昵称发布时间 -->
				<view>
					<view class="font" style="line-height: 1.5;">
						{{item.username}}
					</view>
					<text class="font-sm text-light-muted" 
					style="line-height: 1.5;">
						{{item.newstime|formatTime}}
					</text>
				</view>
			</view>
			<view @click="follow"
			v-if="!item.isFollow && user.id !== item.user_id"
			class="flex align-center justify-center rounded bg-main text-white animated faster" 
			style="width: 90rpx;height: 50rpx;"
			hover-class="jello"
			>
				关注
			</view>
		</view>
		<!-- //标题 -->
		<view v-if="!isdetail" class="font-sm my-1" @click="openDetail">{{item.title}}</view>
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
		</view>
		</view>
		
	</view>
</template>

<script>
	import $T from '@/common/time.js';
	import {mapState} from 'vuex';
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
		filters: {
			formatTime(value) {
				return $T.gettime(value);
			}
		},
		computed: {
			...mapState({
				user:state=>state.user
			})
		},
		methods:{
			openSpace(user_id) {
				uni.navigateTo({
					url: '/pages/user-space/user-space?user_id='+user_id,
				});
			},
			follow(){
				this.checkAuth(()=>{
					this.$H.post('/follow',{
						follow_id:this.item.user_id
					},{
						token:true
					}).then(res=>{
						// 通知更新
						uni.$emit('updateFollowOrSupport',{
							type:"follow",
							data:{
								user_id:this.item.user_id
							}
						})
					})
				})
			},
			// 进入详情页
			openDetail(){
				// 处于详情中
				if (this.isdetail) return;
				uni.navigateTo({
					url: '../../pages/detail/detail?detail='+JSON.stringify(this.item),
				});
				// 加入历史记录
				let list =  uni.getStorageSync('history')
				list = list ? JSON.parse(list) : []
				let index = list.findIndex(v=>v.id === this.item.id)
				if(index === -1){
					list.unshift(this.item)
					uni.setStorageSync('history',JSON.stringify(list))
				}
			},
			// 顶踩操作
			doSupport(type){
				this.checkAuth(()=>{
					this.$H.post('/support',{
						post_id:this.item.id,
						type:type === 'support' ? 0 : 1
					},{
						token:true,
						native:true
					}).then(res=>{
						if(res.data.errorCode){
							return uni.showToast({
								title:res.data.msg,
								icon: 'none'
							});
						}
						console.log('通知父组件');
						// 通知父组件
						uni.$emit('updateFollowOrSupport',{
							type:"support",
							data:{
								type:type,
								id:this.item.id
							}
						})
					})
				})
			},
			// 评论
			doComment(){
				this.checkAuth(()=>{
					if (!this.isdetail) {
						return this.openDetail()
					}
					this.$emit('doComment')
				})
			}
			
				
		}
	}
</script>

<style>
.support-active{
	color: #7b5aa6;
}
</style>

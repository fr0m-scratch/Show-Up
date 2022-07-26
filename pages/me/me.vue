<template>
	<view>
		<uni-nav-bar backgroundColor="#7b5aa6" color="#cbd3da"
		title="我的" rightIcon="more-filled" @clickLeft="userSet" statusBar>
		</uni-nav-bar>
		<view class="flex align-center p-2" hover-class="bg-light">
			<image src="/static/cat.jpeg"
			style="width: 100rpx;height: 100rpx;"
			class="rounded-circle"></image>
			<view class="flex flex-column flex-1 px-2">
				<text class="font-lg font-weight-bold text-dark">{{user.username}}</text>
				<text class="font text-muted">
					总帖子{{myData[0].num}}  今日发帖{{myData[1].num}}</text>
			</view>
			<text class="gg-chevron-right text-light-muted"></text>
		</view>
		
		<view class="flex align-center px-3 py-2">
			<view class="flex-1 flex flex-column align-center justify-center"
			v-for="(item,index) in myData" :key="index">
				<text class="font-lg font-weight-bold">{{item.num}}</text>
				<text class="font text-muted">{{item.name}}</text>
			</view>
		</view>
		
		<uni-list-item title="浏览历史" showExtraIcon @click="openHistory">
			<text slot="icon" class="gg-eye"></text>
		</uni-list-item>
		<uni-list-item title="社区认证" showExtraIcon>
			<text slot="icon" class="gg-eye"></text>
		</uni-list-item>
		<uni-list-item title="审核帖子" showExtraIcon>
			<text slot="icon" class="gg-airplane"></text>
		</uni-list-item>
	
		<navigator url="../user-set/user-set" hover-class="none">
		<uni-list-item title="我的设置" showExtraIcon>
			<text slot="icon" class="iconfont icon-shezhi"></text>
		</uni-list-item>
		</navigator>
		
	</view>
</template>	
		
		
<script>
	import uniNavBar from "@/components/uni-ui/uni-nav-bar/uni-nav-bar.vue";
	import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue';
	// import otherLogin from '@/components/common/other-login.vue';
	import { mapState } from 'vuex'
	export default {
		components: {
			uniNavBar,
			uniListItem
			// otherLogin
		},
		data() {
			return {
				myData:[{
					name:"帖子",
					num:0
				},{
					name:"动态",
					num:0
				},{
					name:"评论",
					num:0
				},{
					name:"粉丝",
					num:0
				}]
			}
		},
		userSet(){
			uni.navigateTo({
				url: '../user-set/user-set'
			});
		},
		computed: {
			...mapState({
				loginStatus:state=>state.loginStatus,
				user:state=>state.user
			}),
			// 用户头像
			avatar(){
				return this.user.userpic ? this.user.userpic : '/static/default.jpg'
			}
		},
		onShow() {
			if(this.loginStatus){
				this.getCounts()
			}
		},
		watch: {
			loginStatus(newValue, oldValue) {
				if(newValue){
					this.getCounts()
				} else {
					this.myData.forEach(item=>{
						item.num = 0
					})
				}
			}
		},
		methods: {
			// 获取用户相关数据
			getCounts(){
				this.$H.get('/user/getcounts/'+this.user.id,{},{
					token:true,
					notoast:true
				}).then(res=>{
					if(res){
						this.myData[0].num = res.post_count
						this.myData[1].num = res.today_posts_count
						this.myData[2].num = res.comments_count
						this.myData[3].num = res.withfen_count
					}
				})
			},
			// 打开登录页
			openLogin(){
				uni.navigateTo({
					url: '../login/login',
				});
			},
			openHistory(){
				uni.navigateTo({
					url: '../history/history'
				});
			}
		}
	}
</script>		
	
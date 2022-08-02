<template>
	<view>
		<uniNavBar></uniNavBar>
		<!-- 未登录 -->
		<template v-if="!loginStatus">
			<view class="flex align-center justify-center py-2 font-lg text-main">
				登录北美留学圈，体验更多功能
			</view>
			<view class="flex align-center justify-center py-2 font text-secondary bg-light"  @click="openLogin">
				邮箱/微信/手机登录 <text class="gg-enter ml-1"></text>
			</view>
		</template>

		<!-- 已登录 -->
		<view v-else class="flex align-center justify-between p-2" hover-class="bg-light">
			<image :src="avatar"
			style="width: 120rpx;height: 120rpx;"
			class="rounded-circle mr-2"></image>
			<view class="flex flex-column flex-1 px-2">
				<text class="font-lg font-weight-bold text-dark">{{user.username}}</text>
				<text class="font text-muted">
					总帖子{{myData[0].num}}  今日发帖{{myData[1].num}}</text>
			</view>
		</view>
		
		<view class="flex align-center px-3 py-2">
			<view class="flex-1 flex flex-column align-center justify-center"
			v-for="(item,index) in myData" :key="index">
				<text class="font-lg font-weight-bold">{{item.num}}</text>
				<text class="font text-muted">{{item.name}}</text>
			</view>
		</view>
		
		
		
		<uni-list-item title="浏览历史" showExtraIcon @click="openHistory">
			<text slot="icon" class="iconfont icon-liulan"></text>
		</uni-list-item>
		
		<navigator url="../user-email/user-email" hover-class="none">
		<uni-list-item title="学生身份认证" showExtraIcon>
			<text slot="icon" class="iconfont icon-huiyuanvip"></text>
		</uni-list-item>
		</navigator>
	
		<navigator url="../user-set/user-set" hover-class="none">
		<uni-list-item title="我的设置" showExtraIcon>
			<text slot="icon" class="iconfont icon-shezhi"></text>
		</uni-list-item>
		</navigator>
		
		
		
	</view>
</template>

<script>
	import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue';
	import otherLogin from '@/components/common/other-login.vue';
	import { mapState } from 'vuex'
	import uniNavBar from "@/components/uni-ui/uni-nav-bar/uni-status-bar.vue"
	export default {
		components: {
			uniListItem,
			otherLogin,
			uniNavBar
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
		onNavigationBarButtonTap() {
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

<style>

</style>

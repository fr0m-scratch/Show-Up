<template>
	<view>
		<!-- 导航 -->
		<uni-nav-bar :border="false" :fixed="true" :statusBar="true" @click-right="openAddInput">
			<view class="flex align-center justify-center font-weight-bold w-100">
				<view class="mx-1" @click="changeTab(index)"
				v-for="(item,index) in tabBars" :key="index"
				:class="tabIndex === index ? 'font-lg text-main' : 'font-md text-light-muted'">
					{{item.name}}
				</view>
			</view>
			<text slot="right" class="iconfont icon-fatie_icon"></text>
		</uni-nav-bar>
		
		<swiper :current="tabIndex" :duration="150" :style="'height:'+scrollH+'px;'" @change="onChangeTab">
			<!-- 关注 -->
			<swiper-item>
				<scroll-view scroll-y="true" :style="'height:'+scrollH+'px;'"
				@scrolltolower="loadmoreEvent">
					<block v-for="(item,index) in list" :key="index">
						<common-list :item="item" :index="index" @doSupport="doSupport"></common-list>
						<divider></divider>
					</block>
					<load-more v-if="list.length" :loadmore="loadmore"></load-more>
					<no-thing v-else></no-thing>
				</scroll-view>
			</swiper-item>
			<!-- 话题 -->
			<swiper-item>
				<scroll-view scroll-y="true" :style="'height:'+scrollH+'px;'">
					
					<!-- 热门分类 -->
					<hot-cate :hotCate="hotCate"></hot-cate>
					<!-- 搜索框 -->
					<view class="p-2">
						<view class="bg-light rounded flex align-center justify-center py-2 text-secondary" @click="openSearch">
							<text class="iconfont icon-sousuo mr-2"></text>
							搜索话题
						</view>
					</view>
					<!-- 轮播图 -->
					<swiper class="px-2 pb-2" :indicator-dots="true" 
					:autoplay="true" 
					:interval="3000" :duration="1000">
						<swiper-item v-for="(item,index) in swiperList"
						:key="index">
							<image :src="item.src"
							style="height: 300rpx;" 
							class="w-100 rounded"></image>
						</swiper-item>
					</swiper>
					<divider></divider>
					<!-- 最近更新 -->
					<view class="p-2 font-md">最近更新</view>
					<!-- 话题列表组件 -->
					<block v-for="(item,index) in topicList" :key="index">
						<topic-list :item="item" :index="index"></topic-list>
					</block>
					
				</scroll-view>
			</swiper-item>
		</swiper>
		
		
	</view>
</template>

<script>

	import uniNavBar from '@/components/uni-ui/uni-nav-bar/uni-nav-bar.vue';
	import commonList from '@/components/common/common-list.vue';
	import loadMore from '@/components/common/load-more.vue';
	
	import hotCate from '@/components/news/hot-cate.vue';
	import topicList from '@/components/news/topic-list.vue';
	import noThing from '@/components/common/no-thing.vue';
	export default {
		components: {
			uniNavBar,
			commonList,
			loadMore,
			hotCate,
			topicList,
			noThing
		},
		data() {
			return {
				scrollH:500,
				tabIndex:0,
				tabBars:[{
					name:"关注"
				},{
					name:"话题"
				}],
				// 关注列表
				list:[],
				// 1.上拉加载更多  2.加载中... 3.没有更多了
				loadmore:"上拉加载更多",
				page:1,
				
				hotCate:[],
				
				topicList:[],
				
				swiperList:[]
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success:res=>{
					this.scrollH = res.windowHeight - res.statusBarHeight - 44
				}
			})
			// 获取数据
			this.getTopicNav()
			this.getSwipers()
			this.getHotTopic()
		},
		onShow() {
			this.page = 1
			this.getList()
		},
		methods: {
			// 获取关注好友文章列表
			getList(){
				let isrefresh = this.page === 1
				this.$H.get('/followpost/'+this.page,{},{
					token:true,
					notoast:true
				}).then(res=>{
					let list = res.list.map(v=>{
						return this.$U.formatCommonList(v)
					})
					this.list = isrefresh ? list : [...this.list,...list];
					this.loadmore  = list.length < 10 ? '没有更多了' : '上拉加载更多';
				}).catch(err=>{
					if(!isrefresh){
						this.page--;
					}
				})
			},
			// 获取热门分类
			getTopicNav(){
				this.$H.get('/topicclass').then(res=>{
					this.hotCate = res.list.map(item=>{
						return {
							id:item.id,
							name:item.classname
						}
					})
				})
			},
			// 获取热门话题
			getHotTopic(){
				this.$H.get('/hottopic').then(res=>{
					this.topicList = res.list.map(item=>{
						return {
							id:item.id,
							cover:item.titlepic,
							title:item.title,
							desc:item.desc,
							today_count:item.todaypost_count,
							news_count:item.post_count
						}
					})
				})
			},
			// 获取轮播图
			getSwipers(){
				this.$H.get('/adsense/0').then(res=>{
					this.swiperList = res.list
				})
			},
			// 打开发布页
			openAddInput(){
				uni.navigateTo({
					url: '../add-input/add-input',
				});
			},
			// 切换选项卡
			changeTab(index){
				this.tabIndex = index
			},
			// 滑动
			onChangeTab(e){
				this.tabIndex = e.detail.current
			},
			// 顶踩操作
			doSupport(e){
				// 拿到当前对象
				let item = this.list[e.index]
				let msg = e.type === 'support' ? '顶' : '踩'
				// 之前没有操作过
				if (item.support.type === '') {
					item.support[e.type+'_count']++
				} else if (item.support.type ==='support' && e.type === 'unsupport') {
					// 顶 - 1
					item.support.support_count--;
					// 踩 + 1
					item.support.unsupport_count++;
				} else if(item.support.type ==='unsupport' && e.type === 'support'){ 					// 之前踩了
					// 顶 + 1
					item.support.support_count++;
					// 踩 - 1
					item.support.unsupport_count--;
				}
				item.support.type = e.type
				uni.showToast({ title: msg + '成功' });
			},
			// 上拉加载
			loadmoreEvent(){
				// 验证当前是否处于可加载状态
				if (this.loadmore !== '上拉加载更多') return;
				// 设置加载状态
				this.loadmore = '加载中...'
				// 请求数据
				this.page++
				this.getList()
			},
			// 打开搜索页
			openSearch(){
				uni.navigateTo({
					url: '../search/search?type=topic',
				});
			}
		}
	}
</script>

<style>

</style>

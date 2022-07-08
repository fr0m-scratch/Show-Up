<template>
	<view>
		<!-- 导航 -->
		<uni-nav-bar :border="false" :fixed="true" :statusBar="true">
			<view class="flex align-center justify-center font-weight-bold w-100">
			<!-- 	<view class="font-lg text-main mx-1">关注</view> -->
				<view class="mx-1 my-4" @click="changeTab(index)"
				v-for="(item,index) in tabBars" :key="index"
				:class="tabIndex === index ? 'font-lg text-main' : 'font-md text-muted'">
					{{item.name}}
				</view>
				
			</view>
		</uni-nav-bar>
		
		<swiper :current="tabIndex" :duration="500" :style="'height:'+scrollH+'px;'" @change="onChangeTab">
			<!-- 关注 -->
			<swiper-item>
				<scroll-view scroll-y="true":style="'height:' + scrollH + 'px;'"
				@scrolltolower="loadmoreEvent">
					<block v-for="(item,index) in list" :key="index">
						<common-list :item="item" :index="index" @doSupport="doSupport"></common-list>
						<divider></divider>
					</block>
					<load-more :loadmore ="loadmore"></load-more>
				</scroll-view>
			</swiper-item>
			<!-- 话题 --> 
			<swiper-item>
				<scroll-view scroll-y="true":style="'height:' + scrollH + 'px;'">

					<!-- 热门 -->
					<hot-cat :hotCat="hotCat"></hot-cat>
					<!-- 搜索框 -->
					<view class="p-2">
						<view class="bg-light rounded flex align-center justify-between py-2">
							<uni-icons type="search"></uni-icons>
							
						</view>
					</view>
					<!-- 轮播图 -->
					<swiper class="px-5 pb-2" :indicator-dots="true" :autoplay="true" 
					:interval="3000" :duration="1000">
						<swiper-item>
							<image src="/static/Dr. Von Neumann.jpeg"
							style="height: 300rpx;" class="w-100 rounded"></image>
						</swiper-item>
					</swiper>
					<divider></divider>
					<!-- 最近更新-->
					<view class="font-md p-2">最近更新</view>
					<!-- 话题列表组件 -->
					<block v-for="(item,index) in topicList" :key="index">
						<topic-list :item="item" :index="index"></topic-list>
					</block>
			
				</scroll-view>
			</swiper-item>
		</swiper>
		<uni-fab horizontal="right" vertical="bottom" :pattern="fabPattern" @fabClick="openAddInput"></uni-fab>
	</view>
</template>

<script>
	import uniFab from '@/components/uni-ui/uni-fab/uni-fab.vue'
	const demo = [{
		username:"冯诺依曼博士",
		userpic:"/static/Dr. Von Neumann.jpeg",
		newstime:"日期 时间",
		isFollow:false,
		title:"王子殿下午茶餐厅力考试",
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
		title:"这是一只猫咪",
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
		title:"这是一只猫咪",
		titlepic:"/static/Dr. Von Neumann.jpeg",
		support:{
			type:"",
			support_count:1,
			unsupport_count:1
		},
		comment_count:2,
		share_num:2,
	}];
	import topicList from "@/components/shop/topicList.vue";
	import hotCat from "@/components/shop/hot-cat.vue";
	import uniIcons from "@/components/uni-ui/uni-icons/uni-icons.vue";
	import uniNavBar from "@/components/uni-ui/uni-nav-bar/uni-nav-bar.vue";
	import loadMore from "@/components/common/load-more.vue";
	import commonList from "@/components/common/common-list.vue";
	export default {
		components: {
			topicList,
			hotCat,
			uniIcons,
			uniNavBar,
			loadMore,
			commonList,
			uniFab
			
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
				list:[ ],
				loadmore:"上拉加载更多",
				
				hotCat:[{
					name:"关注"
				},{
					name:"推荐"
				},{
					name:"周围"
				},{
					name:"测试"
				},{
					name:"测试"
				},{
					name:"测试"
				}],
				
				topicList:[{
					cover:"/static/Dr. Von Neumann.jpeg",
					title:"话题名称",
					desc:"话题描述",
					news_count:10
				
				},{
					cover:"/static/Dr. Von Neumann.jpeg",
					title:"话题名称",
					desc:"话题描述",
					news_count:10
					
					
				},{
					cover:"/static/Dr. Von Neumann.jpeg",
					title:"话题名称",
					desc:"话题描述",
					news_count:10
				
				},{
					cover:"/static/Dr. Von Neumann.jpeg",
					title:"话题名称",
					desc:"话题描述",
					news_count:10
				
				}],
				fabPattern:{
					buttonColor: "#7b5aa6"
				},
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: res => {
					this.scrollH = res.windowHeight - res.statusBarHeight - 44
				}
			})
			this.list = demo
		}, 
		methods: {
			//打开发布
			openAddInput(){
				uni.navigateTo({
					url: '../add-input/add-input',
				});
			},
			//打开选项卡
			changeTab(index){
				this.tabIndex = index
				
			},
			//监听滑动
			onChangeTab(e){
				this.tabIndex = e.detail.current
			},
			//顶踩臭狗
			doSupport(e){
				let item = this.list[e.index]
				if (item.support.type === ""){
					item.support.type = e.type
					item.support[e.type+'_count']++
					return;
				}
				if (item.support.type === "support" && e.type === "unsupport"){
					item.support.type = e.type;
					item.support.support_count--;
					item.support.unsupport_count++;
					
				} else if (item.support.type === "unsupport" && e.type === "support"){
					item.support.type = e.type;
					item.support.unsupport_count--;
					item.support.support_count++;
				}
				else if (item.support.type === e.type){
					item.support.type = "";
					item.support[e.type+'_count']--;
				}
				
				console.log(e.type)	
			},
			//上拉加载
			loadmoreEvent(){
				if (this.loadmore!== '上拉加载更多') return;
				this.loadmore = '加载中...'
				//数据请求
				setTimeout(()=>{
					//加载页面的数据
					this.list = [...this.list,...this.list]
					//恢复加载状态
					this.loadmore = '上拉加载更多'
				},2000)
				
			}			
		}
	}
</script>

<style>

</style>


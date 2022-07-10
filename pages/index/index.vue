<template>
	<view>
		<!-- 搜索栏 -->
		<uni-search-bar @click.native="search" placeholder="Type to search" cancelButton="none" :showCase="showCase"></uni-search-bar>
		<!-- 顶部选项卡 -->
		<scroll-view scroll-x :scroll-into-view="scrollInto"
		scroll-with-animation
		class="scroll-row border-bottom" 
		style="height: 120rpx;">
			<view v-for="(item,index) in tabBars":key="index"
			class="scroll-row-item px-5 py-2 font-md":id = "'tab'+index"
			:class="tabIndex === index?'text-main font-lg font-weight-bold' : ''"
			@click="changeTab(index)">{{item.name}}</view>
		</scroll-view>

		 

		
		<swiper :duration="500":current="tabIndex" @change="onChangeTab"
		:style="'height:'+scrollH+'px;'">
			<swiper-item v-for="(item,index) in newsList":key="index">
				<scroll-view scroll-y="true":style="'height:' + scrollH + 'px;'">
					<template v-if="item.list.length > 0">
						<!-- 列表 -->
						<block v-for="(item2, index2) in item.list" :key="index2">
							<!-- 列表样式 -->
							<common-list :item="item2" :index="index2" @follow="follow" @doSupport="doSupport"></common-list>
							<!-- 全局分割线 -->
							<divider></divider>
						</block>
						<!-- 上拉加载 -->
						<load-more :loadmore ="item.loadmore" ></load-more>
					</template>
					<!-- 无数据 -->
					<template v-else>
						<no-thing></no-thing>
					</template>
					
					
				</scroll-view>
				
			</swiper-item>
		</swiper>
		
		<uni-fab horizontal="right" vertical="bottom" :pattern="fabPattern" @fabClick="addInput"></uni-fab>

	</view>
</template>

<script>
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
		share_num:2,
		images:["/static/Dr. Von Neumann.jpeg","https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/6acec660-4f31-11eb-a16f-5b3e54966275.jpg"],
		content:"我好爱猫咪🐈"
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
	
	
	import commonList from "@/components/common/common-list.vue";
	import loadMore from '@/components/common/load-more.vue';
	import uniSearchBar from "@/components/uni-ui/uni-search-bar/uni-search-bar.vue"
	import uniFab from "@/components/uni-ui/uni-fab/uni-fab.vue"
	import uniStatusBar from "@/components/uni-ui/uni-nav-bar/uni-status-bar.vue"
	export default {
		components:{
			commonList,
			loadMore,
			uniSearchBar,
			uniFab,
			uniStatusBar
		},
		data() {
			return {
				fabPattern:{
					buttonColor: "#7b5aa6"
				},
				//列表高度
				scrollH: 600,
				//顶部选项卡
				scrollInto: "",
				tabIndex:0,
				tabBars:[{
					name:'关注',
				},{
					name:'关注',
				},{
					name:'关注',
				},{
					name:'关注',
				},{
					name:'关注',
				},{
					name:'关注',
				}],
				newsList:[{
							
					}],
				showCase: false
					
				
			}
		},
		//监听点击导航栏搜索框
		onLoad() {
			uni.getSystemInfo({
				success: res => {
					this.scrollH = res.windowHeight - uni.upx2px(101)
				}
				
			})
			//根据选项生成列表
			this.getData()
			

		},
		methods: {
			addInput(){
				uni.navigateTo({
					url:'../add-input/add-input'
				})
			},
			//获取数据
			getData(){
				var arr = []
				for (let i = 0; i < this.tabBars.length; i++) {
					//生产列表模板
					let obj = {
						//1.上拉加载更多 2.加载中 3. 没有更多了
						loadmore:"上拉加载更多",
						
						list:[]
					}
					if (i < 2) {
						obj.list = demo
					}
					
					arr.push(obj)
				}
				this.newsList = arr
				
			},
			//监听滑动
			onChangeTab(e){
				this.changeTab(e.detail.current)
			},


			follow(e){
				this.list[e].isFollow = !this.list[e].isFollow
			},
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

			//切换顶部导航选项
			changeTab(index){
				if (this.tabIndex === index){
					return;
				}
				this.tabIndex = index
				//滚动到指定元素
				this.scrollInto = 'tab' + index

			},
			//上拉加载更多
			loadmore(index){
				
				//得到当前列表数据
				let item = this.newsList[index]
				//判断是否处于可加载状态
				if 	(item.loadmore !== '上拉加载更多') return;			
				//修改当前列表加载状态
				item.loadmore = '加载中...'
				//数据请求
				setTimeout(()=>{
					//加载页面的数据
					item.list = [...item.list,...item.list]
					//恢复加载状态
					item.loadmore = '上拉加载更多'
				},10000)
			},
			search(){
				uni.navigateTo({
					url: '../search/search?type=post',
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>

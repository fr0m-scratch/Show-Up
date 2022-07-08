<template>
	<view>
		<uni-search-bar placeholder="Type to search" cancelButton="auto" :showCase="showCase"></uni-search-bar>
		<view class="flex align-center py-2">
			<view class="flex-1 flex align-center justify-center" v-for="(item,index) in tabBars" :key = "index" :class="index === tabIndex ? 'font-lg font-weight bold text-main':'font-md'" @click="changeTab(index)">
			{{item.name}} {{item.num}}
			</view>
		</view>
		
		
		<swiper :duration="500":current="tabIndex" @change="onChangeTab"
		:style="'height:'+scrollH+'px;'">
			<swiper-item v-for="(item,index) in userList":key="index">
				<scroll-view scroll-y="true":style="'height:' + scrollH + 'px;'">
					<template v-if="item.list.length > 0">
						<!-- 列表 -->
						<block v-for="(item2, index2) in item.list" :key="index2">
							<!-- 列表样式 -->
							<view class="p-2 flex align-center border-bottom border-light-secondary">
								<image src="../../static/Dr. Von Neumann.jpeg" style="width: 100rpx; height:100rpx;" class="rounded-circle mr-2"></image>
								<view class="flex flex-column flex-1">
									<text class="font-md text-dark">name</text>
									<uni-badge text="24" type="error">
										<text class="iconfont icon-nv" style="font-size: 18rpx;"></text>
									</uni-badge>
								</view>
								<uni-icons type="checkbox-filled" color="grey"></uni-icons>
							</view>
							<!-- 全局分割线 -->
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
		
		
	</view>
</template>

<script>
	import uniSearchBar from '@/components/uni-ui/uni-search-bar/uni-search-bar.vue';
	import commonList from '@/components/common/common-list.vue';
	import loadMore from '@/components/common/load-more.vue';
	import noThing from '@/components/common/no-thing.vue';
	import uniIcons from '@/components/uni-ui/uni-icons/uni-icons.vue'
	import uniBadge from '@/components/uni-ui/uni-badge/uni-badge.vue'
	export default {
		data() {
			return {
				showCase: false,
				tabBars:[{
					name:"好友:",
					num:0
				},
				{
					name:"关注:",
					num:1
				},
				{
					name:"粉丝:",
					num:0
				}],
				tabIndex:0,
				scrollH:600,
				userList:[]
			}
		},
		components:{
			uniSearchBar,
			commonList,
			loadMore,
			noThing,
			uniIcons,
			uniBadge
		},
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
			changeTab(index){
				this.tabIndex = index
			},
			onChangeTab(e){
				this.changeTab(e.detail.current)
			},
			loadmore(index){
				
				//得到当前列表数据
				let item = this.userList[index]
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
						obj.list = [1,2,3,4,5]
					}
					
					arr.push(obj)
				}
				this.userList = arr
				
			},
		},
		
		
		
	}
</script>

<style>

</style>

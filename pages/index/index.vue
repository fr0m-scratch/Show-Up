<template>
	<view>
		<!-- 顶部选项卡 -->
		<scroll-view scroll-x :scroll-into-view="scrollInto"
		scroll-with-animation
		class="scroll-row border-bottom">
			<view v-for="(item,index) in tabBars":key="index"
			class="scroll-row-item px-5 py-2 font-md":id = "'tab'+index"
			:class="tabIndex === index?'text-main font-lg font-weight-bold' : ''"
			@click="changeTab(index)">{{item.name}}</view>
		</scroll-view>
		 
		 <!-- <swiper :duration="500" :current="tabIndex">
		   <swiper-item v-for="(item,index) in tabBars":key="index">
		    <view class="swiper-item">{{item.name}}</view>
		   </swiper-item>
		  </swiper>
		  -->
		<block v-for="(item, index) in list" :key="index">
			<common-list :item="item" :index="index" @doSupport="doSupport" @follow="follow"></common-list>
			<divider></divider>
		</block>
	</view>
</template>

<script>
	import commonList from "@/components/common/common-list.vue"
	export default {
		components:{
			commonList
		},
		data() {
			return {
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
				list:[
					{
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
						share_num:2
					}
				]
			}
		},
		//监听点击导航栏搜索框
		onNavigationBarSearchInputClicked() {
			uni.navigateTo({
				url: '../search/search',
				
			})
			
		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url:'../add-input/add-input'
			})
		},
		onLoad() {

		},
		methods: {

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

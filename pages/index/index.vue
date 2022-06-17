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
		
		<!-- <block v-for="(item, index) in list" :key="index">
			<common-list :item="item" :index="index"></common-list>
			<divider></divider>
		</block> -->
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
						title:"这是一只猫咪",
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
		//监听点击导航栏搜索框
		onNavigationBarSearchInputClicked() {
			uni.navigateTo({
				url: '../search/search',
				
			})
			
		},
		onLoad() {

		},
		methods: {
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

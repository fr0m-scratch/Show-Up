<template>
	<view>
		<template v-if="searchList.length === 0">
			<!-- search history -->
			<view class="py-2 font-lg px-3 text-muted">search history</view>
			<view class="flex flex-wrap">
				<view class="border rounded font mx-1 my-1 px-2 text-muted" 
				v-for="(item,index) in list":key="index"
				hover-class="bg-light"
				@click="clickSearchHistory(item)">{{item}}</view>
			</view>
		</template>

		<template v-else>
			<!-- 数据列表 -->
			<block v-for="(item,index) in searchList" :key="index">
				<common-list :item="item" :index ="index"></common-list>
			</block>
		</template>

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
	import commonList from '@/components/common/common-list.vue';
	export default {
		components:{
			commonList
		},
		data() {
			return {
				searchText:"",
				list:['nyc dating','food','thrift'],
				//搜索结果
				searchList:[]
			}
		},
		//监听导航输入
		onNavigationBarSearchInputChanged(e){
			this.searchText = e.text  
			
		},
		//监听点击导航搜索按钮
		onNavigationBarButtonTap(e)  {
			if (e.index === 0) {
				this.searchEvent()
			}
			
		},
		methods: {
			//点击搜索历史
			clickSearchHistory(text){
				this.searchText = text
				this.searchEvent()
			},
			//搜索事件
			searchEvent(){
				//收起键盘
				uni.hideKeyboard()
				//显示Loading
				uni.showLoading({
					title: 'Loading...',
					mask: false
				})
				//请求搜索
				setTimeout(()=>{
					this.searchList = demo
					//隐藏loading
					uni.hideLoading()
				},3000)	
			}
		}
	}
</script>

<style>

</style>

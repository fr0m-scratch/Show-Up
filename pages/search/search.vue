<template>
	<view>
		<uni-search-bar placeholder="Type to search"></uni-search-bar>
		
			
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
				<!-- post -->
				<template v-if="type === 'post'">
					<common-list :item="item" :index ="index"></common-list>
				</template>
				<!-- user -->
				<template v-if="type === 'user'">
					<user-list :item="item" :index ="index"></user-list>
				</template>
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
	const demo1 = [{
		avatar:"/static/cat.jpeg",
		username:"asd",
		sex:1,
		age:24,
		isFollow:true
	},
	{
		avatar:"/static/logo.png",
		username:"asd",
		sex:2,
		age:19,
		isFollow:true
	}];
	import commonList from '@/components/common/common-list.vue';
	import uniSearchBar from "@/components/uni-ui/uni-search-bar/uni-search-bar.vue";
	import uniNavBar from "@/components/uni-ui/uni-nav-bar/uni-nav-bar.vue";
	import uniStatusBar from "@/components/uni-ui/uni-nav-bar/uni-status-bar.vue"
	import userList from "@/components/user-list/user-list.vue"
	export default {
		components:{
			commonList,
			uniSearchBar,
			uniNavBar,
			uniStatusBar,
			userList
		},
		data() {
			return {
				searchText:"",
				list:['nyc dating','food','thrift'],
				//搜索结果
				searchList:[],
				type:"post"
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
		onLoad(e) {
			if (e.type) {
				this.type = e.type
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
					switch (this.type){
						case 'post':
							this.searchList = demo
							break;
						case 'user':
							this.searchList = demo1
							break;
					}
					
					//隐藏loading
					uni.hideLoading()
				},3000)	
			}
		}
	}
</script>

<style>

</style>

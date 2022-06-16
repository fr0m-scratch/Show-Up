<template>
	<view>
		<template v-if="searchList.length === 0">
			<!-- search history -->
			<view class="py-2 font-md px-3">search history</view>
			<view class="flex flex-wrap">
				<view class="border rounded font mx-2 my-1 px-2" 
				v-for="(item,index) in list":key="index"
				hover-class="bg-light">{{item}}</view>
			</view>
			
		</template>
		
		<!-- <template v-else> -->
			<!-- 数据列表 -->
			<!-- <block v-for = "(item,index) in searchList" :key="index">
				<common-list :item="item :index="index></common-list>
			</block> -->
			
		<!-- </template> -->
		
	</view>
</template>

<script>
	//等上一个组件完成
	// import New from '@/components/common/common-list.vue';
	export default {
		
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
		// onNavigationBarButtonTap(e)  {
		// 	if (e.index === 0) {
		// 		this.searchEven()
		// 	}
			
		// },
		methods: {
			//搜索事件
			// searchEvent(){
			// 	//收起键盘
			// 	uni.hideKeyboard()
			// 	//请求搜索
				
				
			// }
			
		}
	}
</script>

<style>

</style>

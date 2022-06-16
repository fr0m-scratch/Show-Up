<template>
	<view>
		<template v-if="searchList.length === 0">
			<!-- search history -->
			<view class="py-2 font-lg px-3 text-muted">search history</view>
			<view class="flex flex-wrap">
				<view class="border rounded font mx-1 my-1 px-2 text-muted" 
				v-for="(item,index) in list":key="index"
				hover-class="bg-light">{{item}}</view>
			</view>
			
		</template>
		
		
		
	</view>
</template>

<script>
	//等上一个组件完成
	import New from '@/components/common/common-list.vue';
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
		onNavigationBarButtonTap(e)  {
			if (e.index === 0) {
				this.searchEven()
			}
			
		},
		methods: {
			//搜索事件
			
			// 	//收起键盘
				
			// 	//请求搜索
				
				
			// }
			
		}
	}
</script>

<style>

</style>

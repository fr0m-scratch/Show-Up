<template>
	<view>
							<!-- 列表样式 -->
							<view class="p-2 flex align-center border-bottom border-light-secondary" hover-class="bg-light">
								<image :src="item.avatar" style="width: 100rpx; height:100rpx;" class="rounded-circle mr-2"></image>
								<view class="flex flex-column flex-1">
									<text class="font-md text-dark">{{item.username}}</text>
									<uni-badge :text="item.age" :type="item.sex === 1 ? 'error':'primary'">
										<text v-if="item.sex" class="iconfont" :class="item.sex === 1 ? 'icon-nv':'icon-nan'" style="font-size: 18rpx;"></text>
									</uni-badge>
								</view>
								<uni-icons type="checkbox-filled" color="grey"></uni-icons>
							</view>
							
						
		
		
	</view>
</template>

<script>
	import uniIcons from '@/components/uni-ui/uni-icons/uni-icons.vue'
	import uniBadge from '@/components/uni-ui/uni-badge/uni-badge.vue'
	export default {
		props:{
			item:Object,
			index:Number
		},
		name:"user-list",
		data() {
			return {
				
			};
		},
		components:{
			uniIcons,
			uniBadge
		},
	}
</script>

<style>

</style>
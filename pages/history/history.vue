<template>
	<view>
		<common-list v-for="(item,index) in list" :key="index"
		:item="item" :index="index"></common-list>
		
		<no-thing v-if="list.length === 0"></no-thing>
	</view>
</template>

<script>
	import commonList from '@/components/common/common-list.vue';
	import noThing from '@/components/common/no-thing.vue';
	export default {
		components: {
			commonList
		},
		data() {
			return {
				list:[]
			}
		},
		onLoad() {
			// 取出历史记录
			let list =  uni.getStorageSync('history')
			if(list){
				this.list = JSON.parse(list)
			}
			// 监听关注和顶踩操作
			uni.$on('updateFollowOrSupport',(e)=>{
				switch (e.type){
					case 'follow': // 关注
					this.follow(e.data.user_id)
						break;
					case 'support': // 顶踩
					this.doSupport(e.data)
						break;
				}
			})
			// 监听评论数变化
			uni.$on('updateCommentsCount',({id,count})=>{
				this.list.forEach((item)=>{
					if(item.id === id){
						item.comment_count = count
					}
				})
			})
		},
		onUnload() {
			uni.$off('updateFollowOrSupport',(e)=>{})
			uni.$off('updateCommentsCount',(e)=>{})
		},
		onNavigationBarButtonTap() {
			uni.showModal({
				content: '是否要清除历史记录？',
				success: (res)=>{
					if (res.confirm) {
						uni.removeStorageSync('history')
						this.list = []
					}
				}
			});
		},
		methods: {
			// 关注
			follow(user_id){
				// 找到当前作者的所有列表
				this.list.forEach((item)=>{
					if(item.user_id === user_id){
						item.isFollow = true
					}
				})
				uni.showToast({ title: '关注成功' })
			},
			// 顶踩操作
			doSupport(e){
				// 拿到当前的选项卡对应的list
				this.list.forEach(item=>{
					if(item.id === e.id){
						// 之前没有操作过
						if (item.support.type === '') {
							item.support[e.type+'_count']++
						} else if (item.support.type ==='support' && e.type === 'unsupport') {
							// 顶 - 1
							item.support.support_count--;
							// 踩 + 1
							item.support.unsupport_count++;
						} else if(item.support.type ==='unsupport' && e.type === 'support'){ 					// 之前踩了
							// 顶 + 1
							item.support.support_count++;
							// 踩 - 1
							item.support.unsupport_count--;
						}
						item.support.type = e.type
					}
				})
				let msg = e.type === 'support' ? '顶' : '踩'
				uni.showToast({ title: msg + '成功' });
			},
		}
	}
</script>

<style>

</style>

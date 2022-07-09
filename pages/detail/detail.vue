<template>
	<view>
		<uni-nav-bar rightIcon="more-filled" :title="title"></uni-nav-bar>
		<common-list :item="info" isdetail @doComment="doComment" @doShare="doShare" @follow="follow">
			<view>{{info.content}}</view>
			<!-- 图片-->
			<view></view>
		</common-list>
		<!-- popup -->
		
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-ui/uni-nav-bar/uni-nav-bar.vue'
	import commonList from '@/components/common/common-list.vue'
	export default {
		data() {
			return {
				title:"title",
				info:{
					
				}
			}
		},
		components:{
			uniNavBar,
			commonList
		},
		onLoad(e) {
			console.log(e.detail)
			if (e.detail) {
				this.__init(JSON.parse(e.detail))
			}
		},
		methods: {
			__init(data) {
				this.title = data.title
				this.info = data
			},
			doComment(){
				
			},
			doShare(){
				
			},
			follow(e){
				uni.showToast({
					title:"关注成功"
				});
			},
			preview(item){
				uni.previewImage({
					
				})
			}
			
		}
	}
</script>

<style>

</style>

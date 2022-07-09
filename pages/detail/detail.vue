<template>
	<view>
		<uni-nav-bar rightIcon="more-filled" :title="title" @clickRight="open"></uni-nav-bar>
		<common-list :item="info" isdetail @doComment="doComment" @doShare="doShare" @follow="follow">
			<view>{{info.content}}</view>
			<!-- 图片-->
			<view></view>
		</common-list>
		
		<!-- popup -->
		<view>
			<uni-popup ref="popup" type="bottom">
				<pop-share></pop-share>
			</uni-popup>
		</view>
	
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-ui/uni-nav-bar/uni-nav-bar.vue'
	import commonList from '@/components/common/common-list.vue'
	import uniPopup from '@/components/uni-ui/uni-popup/uni-popup.vue'
	import popShare from '@/components/uni-ui/uni-popup-share/uni-popup-share.vue'
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
			commonList,
			uniPopup,
			popShare
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
			},
			open(){
				this.$refs.popup.open()
			}
			
		}
	}
</script>

<style>

</style>

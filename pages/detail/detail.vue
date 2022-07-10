<template>
	<view>
		<common-list :item="info" isdetail @doComment="doComment" @follow="follow">
			<view>{{info.content}}</view>
			<!-- 图片-->
			<view>
				<image v-for="(item,index) in info.images" :src="item" class="w-100" mode="widthFix" @click="preview(index)"></image>
			</view>
		</common-list>
		
	
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
		onReady() {
			uni.showShareMenu({
				withShareTicket:true
			})
		},
		methods: {
			__init(data) {
				uni.setNavigationBarTitle({
					title:data.title
				})
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
			preview(index){
				console.log(index)
				uni.previewImage({
					current:index,
					urls: this.info.images
				})
			}
			
		}
	}
</script>

<style>

</style>

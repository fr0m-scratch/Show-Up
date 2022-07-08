<template>
	<view>
		<!-- 导航栏 -->
		<uniNavBar leftIcon="back" title="所有人可见" statusBar :border="false">
			<view class="align-center flex justify-center w-100">
				所有人可见 <uni-icons type="settings"></uni-icons>
			</view>
		</uniNavBar>
		<!-- 输入框 -->
		<textarea value="" placeholder="来说点什么吧~" class="uni-textarea px-2" v-model="content"></textarea>
		<!-- 多图上传 -->
		<upload-image @change="changeImage" :list= "imageList"></upload-image>
		<!-- 底部栏 -->
		<view class="fixed-bottom bg-white flex align-center" style="height: 85rpx;">
			<view class="gg-menu-cake m-3"></view>
			<view class="gg-tag m-3"></view>
			
			<view class="bg-main text-white ml-auto flex justify-center align-center rounded mr-2" style="width: 140rpx;height: 60rpx;">发送</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-ui/uni-nav-bar/uni-nav-bar.vue"
	import uniIcons from "@/components/uni-ui/uni-icons/uni-icons.vue"
	import uploadImage from "@/components/common/upload-image.vue"
	export default {
		components:{
			uniNavBar,
			uniIcons,
			uploadImage
		},
		data() {
			return {
				content:"",
				showBack:false,
				imageList:[]
			}
		},
		onBackPress(){
			if ((this.content || this.imageList.length)&& !this.showBack){
				uni.showModal({
					title: '提示',
					content: '是否要保存为草稿',
					showCancel: true,
					cancelText: '不保存',
					confirmText: '保存',
					success: res => {
						if (res.confirm){
							this.store()
						} else {
							uni.removeStorage({
								key:"add-input"
							})
						}
						uni.navigateBack({
							delta: 1
						});
					},
				});
				this.showBack=true
				return true
			}
		},
		onLoad(){
			uni.getStorage({
				key:"add-input",
				success:(res)=>{
					if (res.data) {
						let result = JSON.parse(res.data)
						this.content = result.content;
						this.imageList = result.imageList
					}
				}
			})
		},
		methods: {
			iconClickEvent(e){
				switch(e){
					
				}
			},
			changeImage(e){
				this.imageList = e;
			},
			store(){
				uni.setStorage({
					key:'add-input',
					data:JSON.stringify({
						content:this.content,
						imageList:this.imageList
					})
				})
				
			},
		}
	}
</script>

<style>
.footer-btn{
	width: 86rpx;
	height: 86rpx;
	display: flex;
	justify-content: center;
	align-content: center;
	font-size: 60rpx;
}

</style>

<template>
	<view>
		
	
		
		<uniNavBar left-icon="back" statusBar :border="false" @click-left="goBack">
			<view class="flex align-center justify-center w-100"
			@click="changeIsopen">
				{{isopenText}}<text class="iconfont icon-shezhi"></text>
			</view>
		</uniNavBar>
		
		<!-- 文本域 -->
		<textarea v-model="content" placeholder="说一句话吧" class="uni-textarea px-2"/>
		<!-- 选中的分类 -->
		<picker mode="selector" :range="range"
		@change="choosePostClass">
		<view class="font-md px-2 py-1 flex">
			<view class="border px-3 py main-color main-border-color flex align-center justify-center" style="border-radius: 50rpx;">
				<text class="iconfont icon-huati mr-1"></text>
				{{post_class_name ? "所属分类："+post_class_name : "请选择分类"}}
			</view>
		</view>
		</picker>
		
		
		<!-- 多图上传 -->
		<upload-image :show="show" ref="uploadImage" :list="imageList" @change="changeImage"></upload-image>
		
		<!-- 底部操作条 -->
		<view class="fixed-bottom bg-white flex align-center" style="height: 85rpx;">
			
			
			<view class="bg-main text-white ml-auto flex justify-center align-center rounded mr-2 animated" hover-class="jello" style="width: 140rpx;height: 60rpx;" @click="submit">发送</view>
		</view>
		
	</view>
</template>

<script>
	const isOpenArray = ['仅自己可见','所有人可见'];
	import uniNavBar from '@/components/uni-ui/uni-nav-bar/uni-nav-bar.vue';
	import uploadImage from '@/components/common/upload-image.vue';
	export default {
		components: {
			uniNavBar,
			uploadImage
		},
		data() {
			return {
				content:"",
				imageList:[],
				// 是否已经弹出提示框
				showBack:false,
				isopen:1,
				topic:{
					id:2,
					title:""
				},
				post_class_list:[],
				post_class_index:-1
			}
		},
		computed: {
			show() {
				return this.imageList.length > 0 
			},
			isopenText(){
				return isOpenArray[this.isopen]
			},
			// 文章分类可选项
			range(){
				return this.post_class_list.map(item=>{
					return item.classname
				})
			},
			post_class_id(){
				if(this.post_class_index !== -1){
					return this.post_class_list[this.post_class_index].id
				}
			},
			post_class_name(){
				if(this.post_class_index !== -1){
					return this.post_class_list[this.post_class_index].classname
				}
			},
			imgListIds(){
				return this.imageList.map(item=>{
					return {
						id:item.id
					}
				})
			}
		},
		// 监听返回
		onBackPress() {
			if ((this.content !== '' || this.imageList.length > 0) && !this.showBack ) {
				uni.showModal({
					content: '是否要保存为草稿？',
					showCancel: true,
					cancelText: '不保存',
					confirmText: '保存',
					success: res => {
						// 点击确认
						if (res.confirm) {
							this.store()
						} else { // 点击取消，清除缓存
							uni.removeStorage({
								key:"add-input"
							})
						}
						// 手动执行返回
						uni.navigateBack({ delta: 1 });
					},
				});
				this.showBack = true
				return true
			}
		},
		// 页面加载时
		onLoad() {
			uni.getStorage({
				key:"add-input",
				success:(res)=>{
					if (res.data) {
						let result = JSON.parse(res.data)
						this.content = result.content
						this.imageList = result.imageList
					}
				}
			})
			
			// 获取所有分类
			this.getPostClass()
		},
		beforeDestroy() {
			uni.$off('chooseTopic',(e)=>{})
		},
		methods: {
			// 发布
			submit(){
				if(this.topic.id == 1){
					return uni.showToast({
						title: '请选择话题',
						icon: 'none'
					});
				}
				if(this.post_class_id == 0){
					return uni.showToast({
						title: '请选择分类',
						icon: 'none'
					});
				}
				uni.showLoading({
					title: '发布中...',
					mask: false
				});
				this.$H.post('/post/create',{
					imglist:JSON.stringify(this.imgListIds),
					text:this.content,
					isopen:this.isopen,
					topic_id:this.topic.id,
					post_class_id:this.post_class_id
				},{
					token:true
				}).then(res=>{
					uni.hideLoading()
					uni.$emit('updateIndex')
					uni.showToast({
						title: '发布成功',
						icon:"none"
					});
					this.showBack = true
					uni.navigateBack({
						delta: 1
					});
				}).catch(err=>{
					uni.hideLoading()
				})
			},
			// 获取所有文章分类
			getPostClass(){
				this.$H.get('/postclass').then(res=>{
					this.post_class_list = res.list
					
				})
			},
			// 选择文章分类
			choosePostClass(e){
				this.post_class_index = e.detail.value
			},
			// 选择话题
			chooseTopic(){
				uni.navigateTo({
					url: '../topic-nav/topic-nav?choose=true',
				});
			},
			// 切换可见性
			changeIsopen(){
				uni.showActionSheet({
				    itemList: isOpenArray,
				    success: (res)=> {
				        this.isopen = res.tapIndex
				    }
				});
			},
			// 底部图片点击事件
			iconClickEvent(e){
				switch (e){
					case 'uploadImage':
					this.$refs.uploadImage.chooseImage()
						break;
				}
			},
			// 返回上一步
			goBack(){
				uni.navigateBack({ delta: 1 });
			},
			// 选中图片
			changeImage(e){
				this.imageList = e
			},
			// 保存操作
			store(){
				// 保存为本地存储
				let obj = {
					content:this.content,
					imageList:this.imageList
				}
				uni.setStorage({
					key:'add-input',
					data:JSON.stringify(obj)
				})
			}
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
	font-size: 50rpx;
}
</style>

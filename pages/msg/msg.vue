<template>
	<view>
		<!-- 自定义导航栏 -->
		<uni-nav-bar backgroundColor="#7b5aa6" color="#cbd3da"
		title="消息" leftIcon="person" rightIcon="more-filled">
		</uni-nav-bar>
		<!-- 消息列表 -->
		<view class="flex align-center p-2 border-bottom border-light-secondary" hover-class="bg-light">
			<image src="../../static/Dr. Von Neumann.jpeg"
			style="height: 80rpx; width: 80rpx;"
			class="rounded-circle mr-2"></image>
			<view class="flex flex-column flex-1">
				<view class="flex align-center justify-between">
					<text class="font-md">nic</text>
					<text class="font text-secondary">12:33</text>
				</view>
				<view class="flex justify-between">
					<text class="text-secondary">neirong</text>
					<uni-badge text="1" type="error"></uni-badge>
				</view>
			</view>

	    </view>
	</view>	
	
</template>

<script>
	import uniBadge from "@/components/uni-ui/uni-badge/uni-badge.vue";
	import uniNavBar from "@/components/uni-ui/uni-nav-bar/uni-nav-bar.vue";
	
	export default {
		data() {
			return {
				name:"a"
			}
		},
		watch: {
			name: function(val){
				console.log(val)
			}
		},
		components:{
			uniNavBar,
			uniBadge
		},
		 methods:{
			change: function(){
				this.name='b';
			}
		}
	}
</script>

<style>
.box {
	background-color: palegreen;
	color: "black";
	width: 350upx;
	height: 350upx;
	border-radius: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 50upx
}

</style>

<template>
	<view>
		<!-- 自定义导航栏 -->
		<uni-nav-bar backgroundColor="#7b5aa6" color="#cbd3da"
		title="消息" leftIcon="person" rightIcon="more-filled" @clickLeft="people">
		</uni-nav-bar>
		<!-- 消息列表 -->
		<view class="flex align-center"></view>
	</view>
</template>

<script>
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
			uniNavBar
		},
		 methods:{
			change: function(){
				this.name='b';
			},
			people(){
				uni.navigateTo({
					url: '/pages/user-list/user-list',	
				});
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

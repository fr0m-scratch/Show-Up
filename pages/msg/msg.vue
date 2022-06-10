<template>
	<view>
	<view @tap="change()">{{name}}</view>
	</view>
</template>

<script>
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

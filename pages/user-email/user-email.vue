<template>
	<view>
		<view class="text-dark py-2">请输入你要验证的学校邮箱(.edu后缀)</view>
		<input class="uni-input bg-light" type="text" v-model="email" :disabled="this.user.email" />
		<view class="py-2 px-3">
			<button class="bg-main text-white h3" style="border-radius: 50rpx;border: 0;" type="primary" :disabled="disabled || this.user.email" :class="disabled ? 'bg-main-disabled' : ''" @click="submit">验证</button>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		data() {
			return {
				email:""
			}
		},
		computed: {
			...mapState({
				user:state=>state.user
			}),
			disabled() {
				return this.email === ''
			}
		},
		onLoad() {
			if(this.user.email){
				this.email = this.user.email
			}
		},
		methods: {
			check(){
				let rule = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.edu$/;
				if (!rule.test(this.email)) {
					uni.showToast({
						title:"邮箱格式不正确",
						icon:"none"
					})
					return false;
				}
				return true
			},
			submit(){
				if (!this.check()) {
					return;
				}
				this.$H.post('/user/bindemail',{
					email:this.email
				},{
					token:true
				}).then(res=>{
					this.$store.commit('editUserInfo',{
						key:'email',
						value:this.email
					})
					uni.navigateBack({
						delta: 1
					});
					uni.showToast({
						title: '学生验证成功',
						icon: 'none'
					});
				})
			}
		}
	}
</script>

<style>

</style>

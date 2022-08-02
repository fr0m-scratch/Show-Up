<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// 检测更新
			// #ifdef APP-PLUS
			this.$U.update()
			// #endif
			// 网络监听
			this.$U.onNetWork()
			// 初始化用户登录状态
			this.$store.dispatch('initUser')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "./common/uni.css";
	@import "./common/animate.css";
	@import "./common/all.css";
	@import "./common/free.css";
	@import "./common/common.css";
	@import "components/uni-ui/uni-icons/uniicons.css";
	page{
		background: #FFFFFF; 
		height: 100%;
	}
	::-webkit-scrollbar{
		display: none;
	}
	image{
		background-color: #CCCCCC;
	}
</style>

import Vue from 'vue'
import App from './App'
import store from './store/index.js';

Vue.prototype.$store = store

Vue.config.productionTip = false

// 引入全局组件
import divider from './components/common/divider.vue';
Vue.component('divider',divider)
import noThing from './components/common/no-thing.vue';
Vue.component('no-thing',noThing)

// 引入配置文件
import $C from './common/config.js';
Vue.prototype.$C = $C
// 挂在助手函数库
import $U from './common/util.js';
Vue.prototype.$U = $U
// 引入请求库
import $H from './common/request.js';
Vue.prototype.$H = $H
// 权限验证操作
Vue.prototype.checkAuth = (callback,checkPhone = true)=>{
	// 权限验证
	if (!store.state.loginStatus) {
		uni.showToast({
			title: '请先登录',
			icon: 'none'
		});
		return uni.navigateTo({
			url: '/pages/login/login'
		});
	}
	// 验证是否绑定手机号
	if(checkPhone && !store.state.user.phone){
		uni.showToast({
			title: '请先登录',
			icon: 'none'
		});
		return uni.navigateTo({
			url: '/pages/user-phone/user-phone'
		});
	}
	callback()
}

// 权限验证跳转
Vue.prototype.navigateTo = (options,checkPhone = true)=>{
	// 权限验证
	if (!store.state.loginStatus) {
		uni.showToast({
			title: '请先登录',
			icon: 'none'
		});
		return uni.navigateTo({
			url: '/pages/login/login'
		});
	}
	// 验证是否绑定手机号
	if(checkPhone && !store.state.user.phone){
		uni.showToast({
			title: '请先登录',
			icon: 'none'
		});
		return uni.navigateTo({
			url: '/pages/user-phone/user-phone'
		});
	}
	uni.navigateTo(options);
}


App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()

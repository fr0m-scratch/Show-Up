import App from './App'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false

// import share
import share from './common/share.js'
Vue.mixin(share)

import divider from "./components/common/divider.vue";
Vue.component("divider", divider)
import noThing from "./components/common/no-thing.vue";
Vue.component("no-thing", noThing)
import "./common/iconfont.css"
//import config
import $C from '@/common/config.js';
Vue.prototype.$C = $C

//引入时间库

App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
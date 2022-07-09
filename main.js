import App from './App'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false


import divider from "./components/common/divider.vue";
Vue.component("divider", divider)
import noThing from "./components/common/no-thing.vue";
Vue.component("no-thing", noThing)
import "./common/iconfont.css"
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
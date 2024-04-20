import App from './App'
import customTabBar from './custom-tab-bar/custom-tab-bar.vue'
 

// #ifndef VUE3
import Vue from 'vue'
Vue.component('custom-tab-bar',customTabBar)
Vue.config.productionTip = false
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
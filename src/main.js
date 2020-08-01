import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false
// 全局事件订阅分发
new Vue({
  render: h => h(App)
}).$mount('#app')

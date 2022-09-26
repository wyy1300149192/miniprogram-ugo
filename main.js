// #ifndef VUE3
import Vue from 'vue'
import App from './App'

// 引入网络请求的包
import {
	$http
} from '@escook/request-miniprogram'
// 请求的方法挂载在uni顶级对象上
uni.$http = $http

// 请求根路径
$http.baseUrl = 'https://api-hmugo-web.itheima.net'

// 请求拦截器
$http.beforeRequest = function(options) {
	uni.showLoading({
		title: '请求数据中'
	})
}

// 响应拦截器
$http.afterRequest = function() {
	uni.hideLoading()
}

// 封装弹框方法
uni.$showToast = function(title = "请求数据失败", duration = 1500) {
	uni.showToast({
		duration,
		title,
		icon: 'none'
	})
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif

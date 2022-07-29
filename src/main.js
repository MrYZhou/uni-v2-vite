import {
	createSSRApp
} from "vue";
import App from "./App.vue";
export function createApp() {
	const app = createSSRApp(App);
	return {
		app,
	};
}



// import App from './App'
// import Vue from 'vue'
// // import store from './store'
// Vue.prototype.$store = store
// Vue.config.productionTip = false
// App.mpType = 'app'
// // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
// const app = new Vue({
// 	// store,
// 	...App
// })

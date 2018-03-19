# 学习VUE
## webpack 打包工具
## 使用脚手架工具vue-cli创建项目
## vue-router
	### 安装
		在package.js里设置开发依赖的版本
		"dependencies": {"vue-router": "^3.0.1"}
		npm install vue-router
	### 引入
		import VueRouter from 'vue-router';或者src="../../...vue-router.js"
	### 使用
		Vue.use(VueRouter);
		const routes = [{ path: '/goods', component: goods },{path: '/', redirect: '/goods'}];
		const router = new VueRouter({routes,linkActiveClass: 'active'});

		new Vue({el: '#app',router: router,components: { App },template: '<App />'});
		
		redirect:重定向路径
		linkActiveClass：重新定义选中的样式
		component:引入自定义组件
	
## vue-resource
	### 安装
		在package.js里设置开发依赖的版本
		"dependencies": {"vue-resource": "^"}
		npm install vue-resource
		### 引入
		import VueResource from 'vue-resource';;或者src="../../...vue-resource.js"
		### 使用
		Vue.use(VueResource);
		this.$http.get('/api/seller').then(response => {
      		// 成功
      		// get body data
      		response = response.body;
    	}, response => {
      		// erro
    	});
# 学习VUE
## webpack 打包工具
## 使用脚手架工具vue-cli创建项目

## 后台模拟数据（data.json）

##### 后台写数据接口路径
	webpack.dev.conf.js框架升级已经没有dev-server.js了
	
	const express = require('express');
	const app = express();
	const appData = require('data.json');
	let seller = appData.seller;
	let pro = appData.pro;
	在devServer下写接口路径
	before(app) {
		app.get('/api/seller',(req,res) => {
			res.json({
				errno:0,
				data:seller
			})
		});
	}
	
## VUE 
#### 1、自定义组件使用方法
	<v-header></v-header>
	import header from 'components/header/header';
	components: {
		'v-header': header
	}
#### 1、子组件接收父级的数据
	1）子组件需要接收父组件传递的值
		props: {
			seller: {
				type: Number,
				default: 0
			}
		}
	2）父组件写法
	<v-fuzujian :seller="datas"></v-fuzujian>
	

## vue-router
#### 安装
	在package.js里设置开发依赖的版本
	"dependencies": {"vue-router": "^3.0.1"}
	npm install vue-router
#### 引入
	import VueRouter from 'vue-router';或者src="../../...vue-router.js"
#### 使用
	Vue.use(VueRouter);
	const routes = [
			{ path: '/goods', component: goods },
			{path: '/', redirect: '/goods'}
		];
	const router = new VueRouter({routes,linkActiveClass: 'active'});

	new Vue({
		el: '#app',
		router: router,
		components: { App },
		template: '<App />'
	});
		
	1）redirect:重定向路径
	2）linkActiveClass：重新定义选中的样式
	3）component:引入自定义组件
	
## vue-resource
#### 安装
	在package.js里设置开发依赖的版本
	"dependencies": {"vue-resource": "^"}
	npm install vue-resource
#### 引入
	import VueResource from 'vue-resource';;或者src="../../...vue-resource.js"
#### 使用
	Vue.use(VueResource);
	this.$http.get('/api/seller').then(response => {
      	// 成功
      	// get body data
      	response = response.body;
    }, response => {
      		// erro
    });
    	
## better-scroll滚动组件
#### 安装
		在package.js里设置开发依赖的版本
		"dependencies": {"better-scroll": "^0.1.7"}
		npm install better-scroll
#### 引入
		import BScroll from 'better-scroll';或者src="../../...better-scroll.js"
#### 使用
	1、meunScroll = new BScroll(this.$refs.meunWrapper, {});
		1）this.$refs.meunWrapper获取ref=meunWrapper的元素，例如
			<div class="menu-wrapper" ref="meunWrapper">
		2）meunScroll返回当前滚动元素的对象
	2、监听meunScroll滚动，获取位置
		meunScroll.on('scroll', (pos) => {
               scolY = Math.abs(Math.round(pos.y));
        });
	3、执行meunScroll
		因项目数据是用vue-resource异步获取数据，在执行meunScroll的时候可能数据dom这部分还没有加载完，所以使用vue的vm.$nextTick( [callback] )生命周期方法，该方法将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新
	4、自己滚动到某元素的位置
		meunScroll.scrollToElement(el, 300);
 
## 遇到的问题
#### 1、 webpack.dev.conf.js框架升级已经没有dev-server.js了
		写法发生改变，已经不需要借用express.Router()来写数据接口
		原来写法
			var apiRoutes = express.Router();
			app.use('/api',apiRoutes);
			apiRoutes.get('/seller',function(req, res){
				res.json({
					errno: 0,
					data: seller
				})
			});
		新写法->见后台模拟数据接口
#### 2、 v-for
		因eclint对vue进行检查，因框架跟新，v-for这部分总是出现报错(https://google.com/#q=vue%2Fvalid-v-bind  'v-bind' directives require an attribute value)
		解决过程
		1、网上给出的方案（屏蔽检查）没有解决这个问题，（不知如何下手查找） 
		2、手动加<li v-for="item in goods" :key="item.name" class="foot-list-hook"> 

#### 3、better-scroll
	1、绑定监听事件@on="clickLi($event)"页面dom没有绑定上
		解决办法
		在初始化better-scroll的时候设置click
		new BScroll(this.$refs.meunWrapper, {
			click: true
		}) 	
	2、在手机页面click事件触发两次
		解决办法
		function clickLi(event){
			if (!event._constructed) {解决手机端两次派发事件 onclick两次
				return;
			}
			......
		}
#### 4、给数据添加属性
	给数据添加属性count
	this.food.count=1 不能添加到数据中，需要用vue内置方法
	引入vue模块 import Vue from 'vue';
	Vue.set(this.food,'count',1)
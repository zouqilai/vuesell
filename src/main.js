// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
// 当前目录App.vue
import App from './App';
// 配置路径在webpack.base.conf.js的resolve的alias里  不配置按照相对路径写./components/goods/goods
import goods from 'components/goods/goods';
import ratings from 'components/ratings/ratings';
import seller from 'components/seller/seller';
// import router from './router'

import './common/stylus/icon.css';

// Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(VueResource);
/* eslint-disable no-new */
// components: { App },//注册当前的插件{App:App} es6的写法缩写了
const routes = [
  { path: '/goods', component: goods, props: this.$ref },
  { path: '/ratings', component: ratings },
  { path: '/seller', component: seller },
  {path: '/', redirect: '/goods'}
];
const router = new VueRouter({
  routes, // （缩写）相当于 routes: routes
  linkActiveClass: 'active' // 路游配置项 配置元素选中的状态为active的class  如tab上的选中
});

// router.go('/goods');

new Vue({
  el: '#app', // 要插入页面的元素的位置
  router: router,
  components: { App },
  template: '<App />'
});

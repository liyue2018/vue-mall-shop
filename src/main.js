/*
* @Author: yongze-chen
* @Date:   2018-06-20 10:56:57
* @Last Modified by:   liyue2018
* @Last Modified time: 2018-07-19 10:53:04
*/

import Vue from 'vue'
import $ from 'jquery'
import axios from 'axios'
Vue.prototype.$axios = axios

// 使用 vue-form
import VueForm from 'vue-form'
Vue.use(VueForm)

// 引入element-ui 步骤条
import { Steps, Step } from 'element-ui'
Vue.use(Steps)
Vue.use(Step)

import 'element-ui/lib/theme-chalk/index.css'

// 使用 vue-resource 完成本地json格式的数据请求
import VueResource from 'vue-resource'
Vue.use(VueResource)

// 使用vue-lazyload 实现图片懒加载
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad, {
    loading: 'static/images/load.gif'
})

import router from './router/router.js'
import app from './App.vue'

// 使用 vuex
import Vuex from 'vuex'
Vue.use(Vuex)
import store from './store/vuex.js'

// 使用 vue-awesome-swiper 
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)

// 导入 product-mock.js 
import './mock/product-mock.js'

var vm = new Vue({
    el: '#app',
    render: function(createElement) {
        return createElement(app)
    },
    router,
    store
})
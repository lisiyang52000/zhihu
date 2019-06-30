// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import $ from 'jquery'
import toastr from 'toastr'
import store from './store/store.js'
import 'materialize-css/dist/js/materialize.js'
import 'materialize-css/dist/css/materialize.css'
const jsonBird = 'https://bird.ioliu.cn/v1/?url='
const zhihu = 'http://news-at.zhihu.com'

Vue.prototype.$url = `${jsonBird}${zhihu}`
Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

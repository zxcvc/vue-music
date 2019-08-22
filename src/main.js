// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import qs from 'querystring'
import store from './store/store'
import {ajax} from 'jquery'
import Lyric from 'lyric-parser'
import 'animate.css/animate.min.css'
import './dist/js/rem'
import './dist/css/main.css'
import './dist/css/fontIcon.css'
import 'mint-ui/lib/style.css'
import 'swiper/dist/css/swiper.min.css' //这里注意具体看使用的版本是否需要引入样式，以及具体位置。
import {
  Navbar,
  TabItem,
  Button
} from 'mint-ui'
import {
  debounce,
  throttle
} from 'lodash'
import list from './components/list.vue'
import player from './components/player.vue'
Vue.component(Navbar.name, Navbar)
Vue.component(TabItem.name, TabItem)
Vue.component(Button.name, Button)
Vue.component('list', list)
Vue.component('player', player)
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// axios.defaults.baseURL = '/music'
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
Vue.prototype.$ajax = ajax
Vue.prototype.debounce = debounce
Vue.prototype.throttle = throttle
Vue.prototype.$Lyric = Lyric
/* eslint-disable no-new */


new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
})

//移动端bug修复
window.onload = function () {
  let list = document.getElementsByClassName('clickList')[0]
  let audio = document.getElementsByClassName('audio')[0]
  function click() {
    audio.play()
    list.removeEventListener('click', click)
  }
  list && list.addEventListener('click', click)
}

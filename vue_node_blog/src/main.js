// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// 引入iview组件库
import iView from 'iview'
import 'iview/dist/styles/iview.css'
// 引入富文本编辑器
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// import axios from 'axios'

/**
 * FIXME:
 * axios 默认不发送cookie，跨域也是一个原因，需要全局设置
 * 见服务端app.js
 */
// axios.defaults.withCredentials = true

Vue.use(iView)
Vue.use(mavonEditor)

Vue.config.productionTip = false

// 开发环境接口跨域
let dev = process.env.NODE_ENV === 'development' ? '/dev' : ''

// 全局变量设置的一种方式
Vue.prototype.$golbal = {
  host: `${dev}/api_admin`
}

Vue.$Message = Vue.prototype.$Message

/**
 * NOTE:
 * 为避免跨域脚本攻击，通过js是无法访问httponly标记的cookie
 */
// console.log(document.cookie)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})

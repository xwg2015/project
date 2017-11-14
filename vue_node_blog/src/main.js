// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
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

console.log(process.env.NODE_ENV)

let dev = process.env.NODE_ENV === 'development' ? '/dev' : ''

// 全局变量
Vue.prototype.$golbal = {
  host: `${dev}/api_admin`
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

import Vue from 'vue'
import App from './App'
import axios from 'axios'
import {post,fetch,patch,put} from './config/http'
import router from './router'
import store from './store/index'
import Mint from 'mint-ui'
import animate from 'animate.css'
import'mint-ui/lib/style.css'
import 'lib-flexible/flexible.js'

Vue.use(Mint,animate)

//定义全局变量
Vue.prototype.$post = post
Vue.prototype.$fetch = fetch
Vue.prototype.$patch = patch
Vue.prototype.$put = put

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

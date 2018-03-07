import Vue from 'vue'
import App from './App'
import {post,fetch,patch,put} from './config/http'
import errorMessage from './config/message'
import router from './router'
import store from './store/index'
import Mint from 'mint-ui'
import animate from 'animate.css'
import'mint-ui/lib/style.css'
import './assets/css/fonts.scss'
import './assets/css/common.scss'
import 'lib-flexible/flexible.js'

Vue.use(Mint,animate)

//定义全局变量
Vue.prototype.$post = post   // axios post fun
Vue.prototype.$fetch = fetch	// axios get fun
Vue.prototype.$patch = patch	// axios patch fun
Vue.prototype.$put = put  	// axios put fun
Vue.prototype.publicUrl = 'http://116.62.194.149:8000/'  //图片网络地址
Vue.prototype.errorMessage = errorMessage

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

import Vue from 'vue'
import App from './App'
import router from './router'
import Mint from 'mint-ui'
import'mint-ui/lib/style.css'
import 'lib-flexible/flexible.js'

Vue.use(Mint)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

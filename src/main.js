// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

// import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// Vue.use(ElementUI)
import element from './element/index'     // element-ui
import common from './components/common'
import  base from './components/publicFn/base'
Vue.use(element)
Vue.use(base)

Vue.prototype.$http = axios
Vue.prototype.COMMON = common
Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

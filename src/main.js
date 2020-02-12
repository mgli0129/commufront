import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './network/api'
import VueLazyLoad from 'vue-lazyload'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

Vue.config.productionTip = false

//挂载网络api
Vue.prototype.$api = api;

Vue.use(VueLazyLoad, {
  preload: 1,
  loading: require('assets/imges/common/loading.gif')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

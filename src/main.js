import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './network/api'
import VueLazyLoad from 'vue-lazyload'
import moment from 'moment'
import mavonEditor from 'mavon-editor';
import leftTime from 'common/utils';
import {Toast} from "vant";
import VueCookies from 'vue-cookies';

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'mavon-editor/dist/css/index.css'
import 'vant/lib/index.css'

Vue.config.productionTip = false

Vue.use(mavonEditor)
Vue.use(Toast)
Vue.use(VueCookies)

Vue.use(VueLazyLoad, {
  preload: 1,
  error: require('assets/imges/default_logo.jpg'),
  loading: require('assets/imges/common/loading.gif')
})

//挂载网络api
Vue.prototype.$api = api;
Vue.prototype.$moment = moment;
Vue.prototype.$leftTime = leftTime;

Vue.filter('dateFormat', function (value, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(value).format(pattern)
})

//全局路由导航
router.beforeEach((to, from, next) => {
  if (to.matched.some(m => m.meta.requireAuth)) {
    let token = store.state.Authorization;
    if (token === 'null' || token === '' || token === undefined) {
      new Toast({
        message: "检测到您未登录，请先登录",
        duration: 2000,
        forbidClick: true
      });
      next({path: '/login'});
    }
  }
  next();
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import axios from 'axios'
import router from 'router'
import store from 'store/index.js'
import {Toast} from "vant";

/**
 * 提示函数
 * 禁止点击蒙层、显示一秒后关闭
 * @param msg
 */
const tip = msg => {
  Toast({
    message: msg,
    duration: 2000,
    forbidClick: true
  });
}

/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
  router.replace({
    path: '/login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  });
}

/**
 * 请求失败后的统一处理
 * @param status
 * @param other
 */
const errorHandle = (status, message) => {

  //状态码判断
  switch (status) {
    //401 未登录状态, 跳转登录界面
    case 401:
      // store.commit('removeAuthorization');
      localStorage.removeItem('Authorization');
      tip(message);
      toLogin();
      break;
    //403 token过期，清除token并跳转登录页
    case 403:
      // store.commit('removeAuthorization');
      localStorage.removeItem('Authorization');
      tip(message);
      setTimeout(() => {
        toLogin();
      }, 1000);
      break;
    //404 请求不存在
    case 404:
      tip('请求的资源不存在');
      break;
    case 500:
      tip(message);
      break;
    default:
      tip('其他问题！');
  }
}

// 创建实例
let instance = axios.create({
  timeout: 10000
});

// 设置post的请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
instance.interceptors.request.use(config => {
  // 登录流程控制中，根据本地是否存在token判断用户的登录情况
  // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
  // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
  // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
  const token = store.state.Authorization;
  if (token) {
    config.headers.authorization = token;
  }
  return config;
}, error => Promise.error(error))

// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  res => {
    console.log(res);
    if (res.status === 200) {
      if (res.data.code === "000000") {
        return Promise.resolve(res.data);
      } else {
        tip(res.data.message);
      }
    } else {
      errorHandle(res.status, res.data.message);
      // return Promise.reject(res.data);
    }
  },
// 请求失败
  error => {
    const {response} = error;
    if (response) {
      // 请求已发出，但是不在2xx的范围
      errorHandle(response.status, response.data.message);
      return Promise.reject(response.data);
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      // store.commit('changeNetwork', fasle);
    }
  }
)

export default instance;
























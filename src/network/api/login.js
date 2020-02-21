import base from "@/network/api/base";
import axios from "../http";
import qs from 'qs';

const loginout = {

  /**
   * 本地登录
   * @param username
   * @param password
   * @returns {Promise<AxiosResponse<T>>}
   */
  loginLocal(username, password) {
    let params = {
      username: username,
      password: password
    }
    return axios.post(base._commuback_ + '/user/login', qs.stringify(params))
  },

  /**
   * 退出登录
   * @returns {Promise<AxiosResponse<T>>}
   */
  logout() {
    return axios.get(base._commuback_ + '/user/logout')
  },

  register(username, password, phone) {
    let params = {
      username: username,
      password: password,
      phone: phone,
    }
    return axios.post(base._commuback_ + '/user/register', qs.stringify(params))

  }

}

export default loginout;

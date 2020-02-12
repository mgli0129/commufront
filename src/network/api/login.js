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
    return axios.post(base._commuback_ + '/login', {
      params: {
        username,
        password
      }
    })
  },

  /**
   * 退出登录
   * @returns {Promise<AxiosResponse<T>>}
   */
  logout() {
    return axios.get(base._commuback_ + '/logout')
  }

}

export default loginout;

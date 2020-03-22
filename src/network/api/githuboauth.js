import base from "@/network/api/base";
import axios from "../http";
import qs from 'qs';

const githuboauth = {

  /**
   * github OAuth 回调程序
   * @param code
   * @param state
   * @returns {Promise<AxiosResponse<T>>}
   */
  callback(code, state) {
    let params = {
      code: code,
      state: state
    }
    return axios.get(base._commuback_ + '/callback', {
      params: {
        code,
        state
      }
    })
  }
}

export default githuboauth;

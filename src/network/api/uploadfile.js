import base from "@/network/api/base";
import axios from "../http";
import qs from 'qs';

const upload = {

  /**
   * 读取一条通知信息
   * Restful风格
   * @param id
   * @returns {Promise<AxiosResponse<T>>}
   */
  upload(data) {
    return axios.post(base._commuback_ + '/upload', data)
  }

}

export default upload;

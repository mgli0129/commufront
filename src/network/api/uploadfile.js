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
  upload(file) {
    return axios.get(base._commuback_ + '/upload', {
      params: {
        file
      }
    })
  }

}

export default upload;

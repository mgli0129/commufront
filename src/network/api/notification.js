import base from "@/network/api/base";
import axios from "../http";
import qs from 'qs';

const notification = {

  /**
   * 读取一条通知信息
   * Restful风格
   * @param id
   * @returns {Promise<AxiosResponse<T>>}
   */
  readNotifyMessage(id) {
    return axios.get( base._commuback_+'/notify', {
      params: {
        id
      }
    })
  },

  /**
   * 设置全部通知信息已读
   * @param params
   *        {
   *          parentId,content,type
   *        }
   * @returns {Promise<AxiosResponse<T>>}
   */
  clearNotifications() {
    return axios.get(base._commuback_+'/clear')
  }

}

export default notification;

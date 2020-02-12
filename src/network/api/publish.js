import base from "@/network/api/base";
import axios from "../http";
import qs from 'qs';

const publish = {

  /**
   * 获取单个发布的问题
   * Restful风格
   * @param id
   * @returns {Promise<AxiosResponse<T>>}
   */
  getPublishQuestionById(id) {
    return axios.get( base._commuback_+'/publish', {
      params: {
        id
      }
    })
  },

  /**
   * 提交一个问题
   * @param params
   *        {
   *          title,content,tag,id
   *        }
   * @returns {Promise<AxiosResponse<T>>}
   */
  publishQuestion(params) {
    return axios.post('/axios/publish',qs.stringify(params))
  }

}

export default publish;

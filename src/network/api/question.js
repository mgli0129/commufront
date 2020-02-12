import base from "@/network/api/base";
import axios from "../http";
import qs from 'qs';

const question = {

  /**
   * 获取单个问题
   * Restful风格
   * @param id
   * @returns {Promise<AxiosResponse<T>>}
   */
  getQuestionById(id) {
    return axios.get( base._commuback_+'/question', {
      params: {
        id
      }
    })
  },

  /**
   * 获取首页问题列表
   * @param pageNum
   * @param pageSize
   * @param search
   * @returns {Promise<AxiosResponse<T>>}
   */
  getIndexByPage(pageNum,pageSize,search){
    return axios.get( base._commuback_+'/', {
      params: {
        pageNum,
        pageSize,
        search
      }
    })
  },

  /**
   * 获取问题列表
   * @param pageNum
   * @param pageSize
   * @param search
   * @returns {Promise<AxiosResponse<T>>}
   */
  getQuestionByPage(pageNum,pageSize,search){
    return axios.get( base._commuback_+'/question/publish', {
      params: {
        pageNum,
        pageSize,
        search
      }
    })
  },

  /**
   * 获取最近的通知信息
   * @param pageNum
   * @param pageSize
   * @returns {Promise<AxiosResponse<T>>}
   */
  getLatelyReply(pageNum,pageSize){
    return axios.get( base._commuback_+'/question/reply', {
      params: {
        pageNum,
        pageSize
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
  postQuestion(params) {
    return axios.post('/axios/publish',qs.stringify(params))
  }

}

export default question;

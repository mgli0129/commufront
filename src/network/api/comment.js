import base from "@/network/api/base";
import axios from "../http";
import qs from 'qs';

const comment = {

  /**
   * 获取二级评论列表
   * Restful风格
   * @param id
   * @returns {Promise<AxiosResponse<T>>}
   */
  getCommentList(id) {
    return axios.get( base._commuback_+'/comment', {
      params: {
        id
      }
    })
  },

  /**
   * 回复问题或者评论
   * @param params
   *        {
   *          parentId,content,type
   *        }
   * @returns {Promise<AxiosResponse<T>>}
   */
  comment(params) {
    return axios.post(base._commuback_+'/comment',qs.stringify(params))
  }

}

export default comment;

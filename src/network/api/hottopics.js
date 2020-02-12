import base from "@/network/api/base";
import axios from "../http";
import qs from 'qs';

const hottopics = {

  /**
   * 获取热门话题问题列表
   * Restful风格
   * @param params
   *        {
   *          id,tag,pageNum,pageSize,search
   *        }
   *        [id]:
   *        1 - 最多回复数列表查询
   *        2 - 最多阅读数列表查询
   *        空 - 按时间倒序列表查询
   *
   * @returns {Promise<AxiosResponse<T>>}
   */
  getHotTopics(params) {
    return axios.get(base._commuback_ + '/hottopics', qs.stringify(params))
  }

}

export default hottopics;

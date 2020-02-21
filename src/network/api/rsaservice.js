import base from "@/network/api/base";
import axios from "../http";

const rsaService = {

  /**
   * 获取RSA公钥
   * @returns {*}
   */
  getPublicKey() {
    return axios.get(base._commuback_ + '/rsapublickey')
  }

}

export default rsaService;

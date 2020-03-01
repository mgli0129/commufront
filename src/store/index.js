import Vue from 'vue'
import Vuex from 'vuex'
// import {Storage} from "common/lstorage";

Vue.use(Vuex)

// let storage = new Storage();

export default new Vuex.Store({
  state: {
    //定义token
    Authorization: localStorage.getItem("Authorization") ? localStorage.getItem("Authorization") : ''
    // Authorization: storage.getItem("Authorization") ? storage.getItem("Authorization") .value : ''
  },
  mutations: {
    //存储token
    saveAuthorization(state, value){
      state.Authorization = value;
      localStorage.setItem('Authorization', value);
      // storage.setItem({
      //   name: 'Authorization',
      //   value: value,
      //   expires: 1000*60*60*24
      // });
    },
    removeAuthorization(state){
      state.Authorization = '';
      localStorage.removeItem('Authorization');
      // storage.removeItem('Authorization');
    }
  },
  actions: {
  },
  modules: {
  }
})

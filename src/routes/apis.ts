import { API_URL } from "@/app/_libs/config";
import Axios from "./axiosConfig";

const apis = {
  usersUrl: 'users',

  //********** Users */
  async getUsers() {
    try {
      const promise = Axios.get(API_URL + this.usersUrl);
      return promise;      
    }
    catch(err:any) {
      console.log(err?.message || err)
    }
  },

  createUser() {

  },

  //******** messages */
};

export default apis;
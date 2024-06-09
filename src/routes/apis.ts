import { API_URL } from "@/app/_libs/config";
import Axios from "./axiosConfig";
import { ILogin, IRegister, TUpload } from "@/dtos/auth-dto";
import { TCreateGroup } from "@/dtos/group-dto";

const apis = {
  usersUrl: 'users',
  authUrl: 'auth',
  groupsUrl: 'groups',

  //********** Users */
  async getUsers() {
    try {
      const promise = Axios.get(API_URL + this.usersUrl);
      return promise;      
    }
    catch(err:any) {
      console.log(err?.message || err);
    }
  },

  // register
  async register(payload:IRegister) {
    try {
      const promise = Axios.post(
        API_URL + this.authUrl + '/register',
        payload,
      );
      return promise;
    }
    catch(err:any) {
      console.log(err?.message || err);
    }
  },

  // login
  async login(payload:ILogin) {
    try {
      const promise = Axios.post(
        API_URL + this.authUrl + '/login',
        payload,
      );
      return promise;
    }
    catch(err:any) {
      console.log(err?.message || err);
    }
  },

  // get authUser (client)
  async checkAuth() {
    try {
      const promise = Axios.post(
        API_URL + this.authUrl + '/check',
      );
      return promise;
    }
    catch(err:any) {
      console.log(err?.message || err);
    }
  },

  // update profile

  // POST: /groups (create)
  async createGroup(payload: TCreateGroup) {
    try {
      const promise = Axios.post(
        API_URL + this.groupsUrl,
        payload,
      );
      return promise;
    }
    catch(err:any) {
      console.log(err?.message || err);
    }
  },

  // upload file
  async upload(payload: TUpload) {
    try {
      const promise = Axios.post(
        API_URL + 'upload',
        payload,
        {
          headers: {'Content-Type': 'multipart/form-data'},
        },
      );
      return promise;
    }
    catch(err:any) {
      console.log(err?.message || err);
    }
  },
  //******** messages */
};

export default apis;
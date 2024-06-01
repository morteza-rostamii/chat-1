import { API_URL, NODE_ENV } from '@/app/_libs/config';
import axios from 'axios'

const BASE_URL = API_URL;

const Axios = axios.create({
  //withCredentials: true,
  baseURL: BASE_URL,
  headers: {
    "Accept": "application/json",
    //Accept: '*/*',
    "Content-Type": "application/json",
    //'X-Requested-With': 'XMLHttpRequest',
    //'Access-Control-Allow-Credentials':true,
  }
});

export default Axios;
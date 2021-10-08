import * as axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { API_URL } from "../utils/config";

axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const ajax = axios.create({
  baseURL: "https://pro-api.coinmarketcap.com",
});

ajax.CancelToken = axios.CancelToken;
ajax.isCancel = axios.isCancel;
ajax.interceptors.request.use(
  config => {
      config.headers['X-CMC_PRO_API_KEY'] = '91addbff-2501-4976-8908-65f8454b9c16';
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

ajax.interceptors.response.use(
  response => {
    return response
  },
  async error => {
    console.log("ERROR", error.response)
    switch (error.response && error.response.status) {
      case 401:
        break;
      default:
        break;
    }
    return Promise.reject(error);
  },
);

export default ajax;
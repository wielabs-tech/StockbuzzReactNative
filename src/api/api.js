import * as axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { API_URL } from "../utils/config";

axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const ajax = axios.create({
  baseURL: API_URL,
});

let api_token;

const tokenFunction = async () => {
  api_token = await AsyncStorage.getItem('@token');
};

tokenFunction();

export const setAsyncStorageToken = async (access_token, refresh_token) => {
  await AsyncStorage.setItem('@token', access_token);
  await AsyncStorage.setItem('@refreshToken', refresh_token)
  api_token = access_token;
};



export const setEmptyAsyncStorageToken = async () => {
  await AsyncStorage.removeItem('@token');
  api_token = null;
};

ajax.CancelToken = axios.CancelToken;
ajax.isCancel = axios.isCancel;
ajax.interceptors.request.use(
  config => {

    if (api_token) {
      config.headers['Authorization'] = 'Bearer' + ' ' + api_token;
    }
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
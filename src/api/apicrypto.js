import * as axios from 'axios';

axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const ajaxCrypto = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3/',
});

ajaxCrypto.CancelToken = axios.CancelToken;
ajaxCrypto.isCancel = axios.isCancel;
ajaxCrypto.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

ajaxCrypto.interceptors.response.use(
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

export default ajaxCrypto;
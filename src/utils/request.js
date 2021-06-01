import axios from 'axios';
import { Toast } from 'vant';
import App from '@/utils/app';
import { getQueryString } from '@/utils/tools';

Toast.setDefaultOptions('loading', { forbidClick: true });

let requestCount = 0;

let appToken = '';

axios.defaults.timeout = 10 * 1000;

axios.interceptors.request.use((config) => {
  // config.headers.Authorization = 'Bearer 427fac7140961c7cb59dc71a218ec35d';
  if (appToken) {
    config.headers.Authorization = `Bearer ${appToken}`;
  }

  console.log('process.env --- ', process.env);
  if (process.env.NODE_ENV === 'production') {
    config.url = `${process.env.VUE_APP_JAVA_API_URL}${config.url}`;
  }
  return config;
}, (error) => Promise.reject(error));

axios.interceptors.response.use((response) => {
  if (response.data.code === 400810) {
    setTimeout(() => {
      Toast({
        message: response.data.msg,
      });

      if (!App.isApp) {
        let params = '';
        const shareId = getQueryString('share_id');
        if (shareId) {
          params = `&share_id=${shareId}`;
        }
        window.location.href = `https://bingou.com.cn/h5/Login/login.html?ref_url=${encodeURIComponent(window.location.href)}${params}`;
      }
    });
  }
  return response.data;
},
(error) => Promise.reject(error));

const resolveArr = [];

const getToken = () => new Promise((resolve) => {
  if (resolveArr.length === 0) {
    App.getToken((args) => {
      // eslint-disable-next-line prefer-destructuring
      if (args[0]) {
        resolveArr.forEach((item) => item(args[0]));
        resolveArr.length = 0;
      }
    });
  }
  resolveArr.push(resolve);
});

const request = async ({
  url, method, data, options = {},
}) => {
  console.log(process);
  const { showLoading = true, showError = true } = options;
  if (App.isApp && !appToken) {
    appToken = await getToken();
  }

  if (showLoading && requestCount === 0) {
    Toast.loading({
      message: '加载中...',
      duration: 0,
    });
  }

  if (showLoading) {
    requestCount += 1;
  }

  let params = 'data';

  if (method === 'get') {
    params = 'params';
  }

  return axios({
    url,
    method,
    [params]: {
      ...data,
      platform: 'web_app',
    },
  }).then((res) => {
    if (res.code !== 0 && showError) {
      setTimeout(() => {
        Toast({
          message: res.msg,
        });
      }, 1000);
    }
    return res;
  }).catch((error) => {
    if (showError) {
      setTimeout(() => {
        if (error.message === 'timeout of 10000ms exceeded') {
          Toast({
            message: '网络请求超时',
          });
        } else {
          Toast({
            message: '网络请求失败',
          });
        }
      }, 1000);
    }
  }).finally(() => {
    if (showLoading) {
      requestCount -= 1;
    }

    if (requestCount <= 0) {
      requestCount = 0;
      Toast.clear();
    }
  });
};

const get = ({ url, data = {}, options }) => request({
  url,
  method: 'get',
  data,
  options,
});

const post = ({ url, data = {}, options }) => request({
  url,
  method: 'post',
  data,
  options,
});

export default request;

export {
  get,
  post,
};

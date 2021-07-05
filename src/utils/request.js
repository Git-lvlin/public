import axios from 'axios';
import { Toast } from 'vant';
import { refresToken } from '@/constant/index';

Toast.setDefaultOptions('loading', { forbidClick: true });

// accessToken过期
const ACCESS_TOKEN_INVALID = 10014;
// refreshToken过期
const REFRESH_TOKEN_INVALID = 10015;

let requestCount = 0;

let appToken = '';

axios.defaults.timeout = 10 * 1000;

axios.interceptors.request.use((config) => {
  // config.headers.Authorization = 'Bearer 427fac7140961c7cb59dc71a218ec35d';
  if (appToken) {
    config.headers.Authorization = `Bearer ${appToken}`;
  }
  config.headers.p = "miniprogram";
  config.headers.v = "1.0.0";

  console.log('process.env --- ', process.env);
  console.log('window', window);
  if (process.env.NODE_ENV === 'production') {
    config.url = `${process.env.VUE_APP_JAVA_API_URL}${config.url}`;
  }
  return config;
}, (error) => Promise.reject(error));

/* eslint-disable */

function requestRefreshToken() {
  //获取原生用户信息
  return post({
    url: refresToken,
    data: { 'id': '1395631517728378881', 'refreshToken': 'eyJhbGciOiJIUzUxMiJ9.eyJNRU1CRVJOQU1FIjoiMTgxMjIyNTI3NDUiLCJjcmVhdGVkIjoxNjIyNTM3NTA1MzE5LCJ0b2tlblR5cGUiOiJyZWZyZXNoVG9rZW4iLCJleHAiOjE2MjMxNDIzMDV9.0hf2BejooKMcLiPq-DasHWuiaYKg0BrSPaN-0m1b-KwoKRn1xjj3bYqgKlei1fk3ugcCBs9hv5vBqZ2vTe-XpA' },
  }).then(res => res.data);
}

let isRefreshing = false
let requestHistory = []

axios.interceptors.response.use(async response => {
  const { code } = response.data
  if (code == 0) {
    return response.data;
  }
  if (code == REFRESH_TOKEN_INVALID) {
    // refreshToken过期退出登录
    Toast('登录过期，请重新登录')
    return null;
  }
  if (code === ACCESS_TOKEN_INVALID) {
    const config = response.config
    if (!isRefreshing) {
      isRefreshing = true
      var res = await requestRefreshToken();
      const { accessToken } = res.data
      axios.defaults.headers['accessToken'] = accessToken
      config.headers['accessToken'] = accessToken
      //恢复历史请求
      requestHistory.forEach(cb => cb(accessToken))
      requestHistory = []
      return axios(config)
    } else {
      return new Promise((resolve) => {
        requestHistory.push((token) => {
          config.headers['accessToken'] = token
          resolve(axios(config))
        })
      })
    }
  }
}, error => {
  return Promise.reject(error)
})

/* eslint-enable */

const resolveArr = [];

const request = async ({
  url, method, data, options = {},
}) => {
  console.log(process);
  const { showLoading = true, showError = true } = options;

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

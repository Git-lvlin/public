import axios from 'axios';
import { Toast, Dialog } from 'vant';
import jsBridge from '@/utils/jsBridge';
import store from '@/store';
Toast.setDefaultOptions('loading', { forbidClick: true });

// accessToken过期
const ACCESS_TOKEN_INVALID = 10014;
// refreshToken过期
const REFRESH_TOKEN_INVALID = 10015;

let requestCount = 0;

let appToken = '';
axios.defaults.timeout = 10 * 1000;
let v = store.state.appInfo.appVersion || "1.0.0";
axios.interceptors.request.use((config) => {
  if (appToken) {
    config.headers.Authorization = `Bearer ${appToken}`;
  }
  config.headers.p = "H5";
  config.headers.v = v;
  if (process.env.NODE_ENV === 'production') {
    if (!config.url.includes('-oss.yeahgo.com')) {
      config.url = `${process.env.VUE_APP_JAVA_API_URL}${config.url}`;
    }
  }
  return config;
}, (error) => Promise.reject(error));

/* eslint-disable */

axios.interceptors.response.use(
  response => {
    if (response.data) {
      return Promise.resolve(response.data);
    } else {
      return Promise.resolve({code:null,data:null,msg:response})
    }
}, error => {
  return Promise.reject(error)
})

/* eslint-enable */

const request = async ({
  url, method, data, options = {},
}) => {
  const { showLoading = true, showError = true, token, appVersion} = options;
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

  let all = {
    url,
    method,
    [params]: {
      ...data,
      platform: 'web_app',
    },
  }
  if (token) {
    all.headers = {
      token: token
    }
  }
  if (appVersion) {
    all.headers = {
      ...all.headers,
      appVersion: appVersion
    }
  }
  return axios(all).then((res) => {
    if (res.code === ACCESS_TOKEN_INVALID || res.code === REFRESH_TOKEN_INVALID || res.code === 10010) {
      if (store.state.appInfo.isApp) {
        jsBridge.callHandler('refreshToken',{})
        return
      }
      if (store.state.appInfo.isMiniprogram) {
        wx.miniProgram.navigateTo({
          url: '/pages/login/mobile/index'
        })
        return
      }
    }
    if (res.code !== 0 && showError) {
      setTimeout(() => {
        Dialog({ message: res.msg });
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
    return error;
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

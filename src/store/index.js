import Vue from 'vue';
import Vuex from 'vuex';
import { getQueryObj } from '@/utils/tools';
import { getQueryString } from '../utils/tools';

// 设置是否在app内
const {
  userAgent,
} = navigator;
const appInfo = getQueryObj(userAgent);
if (!window.WeixinJSBridge || !window.WeixinJSBridge.invoke) {
  document.addEventListener('WeixinJSBridgeReady', () => {
    if (window.__wxjs_environment === 'miniprogram') {
      appInfo.isMiniprogram = true;
    } else {
      appInfo.isMiniprogram = false;
    }
  }, false);
}
appInfo.isApp = appInfo.webViewClientTag ? true : false;

// 设置安全区域
const urlParams = getQueryObj(window.location.search) || {};
let {
  navigationBarHeight = 0,
  bottomBarHeight = 0,
} = urlParams;
// 避免重复设置 navigationBarHeight bottomBarHeight
const deviceInfo = {};
const getPx = (num) => {
  num = Number(num) || 0;
  if (!num) {
    return 0;
  }
  return num / window.devicePixelRatio;
};
if (!!navigationBarHeight && navigationBarHeight > 0) {
  deviceInfo.navigationBarHeight = getPx(navigationBarHeight);
}
if (!!navigationBarHeight && bottomBarHeight > 0) {
  deviceInfo.bottomBarHeight = getPx(bottomBarHeight);
}

Vue.use(Vuex);
Vue.prototype.appInfo = appInfo;

export default new Vuex.Store({
  state: {
    appInfo,
    ...deviceInfo,
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
});

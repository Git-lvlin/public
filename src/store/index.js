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
  navigationBarHeight,
  bottomBarHeight,
  numa
} = urlParams;
const getPx = (num) => {
  num = Number(num) || 0;
  if (!num) {
    return 0;
  }
  return num / window.devicePixelRatio;
};
if (navigationBarHeight > 0) {
  navigationBarHeight = getPx(navigationBarHeight);
}
if (bottomBarHeight > 0) {
  bottomBarHeight = getPx(bottomBarHeight);
}

Vue.use(Vuex);
Vue.prototype.appInfo = appInfo;

export default new Vuex.Store({
  state: {
    appInfo,
    navigationBarHeight,
    bottomBarHeight,
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
});

import { apiUrl } from '@/constant/index';
import { IMG_CDN } from '@/constant/common';
import util from '@/utils/util';

// 获取当前环境接口域名 
export const getBaseApiUrl = () => {
  // const url = apiUrl;
  const envUrl = process.env.VUE_APP_JAVA_API_URL ;
  const url = envUrl ? envUrl : apiUrl;
  return url;
};

// 格式化图片路径
export const getImgUrl = (url = '') => IMG_CDN[process.env.VUE_APP_API_ENV] + url;

// 获取当前距离结束时间
export const getLastTime = (time) => {
  if (!time) {
    return 100;
  }
  let endTime = 100;
  time = time.length < 13 ? time * 1000 : time;
  endTime = new Date().getTime();
  endTime = time - endTime;
  if (endTime < 0 || Number.isNaN(endTime)) {
    endTime = 100;
  }
  return endTime;
};

// 防抖
export const debounce = (func, wait) => {
  if (typeof func !== 'function') {
    throw new TypeError('need a function');
  }
  wait = +wait || 0;
  let timeId = null;
  return (...args) => {
    const self = this;
    // const args = arguments;
    if (timeId) {
      clearTimeout(timeId);
    }
    timeId = setTimeout(() => {
      func.apply(self, args);
    }, wait);
  };
};

// 节流
export const throttle = (func, wait) => {
  if (typeof func !== 'function') {
    throw new TypeError('need a function');
  }
  wait = +wait || 0;
  let valid = true;
  let timeId = null;
  return (...args) => {
    const self = this;
    // const args = arguments;
    if (!valid) {
      return false;
    }
    // 工作时间，执行函数并且在间隔期内把状态位设为无效
    valid = false;
    timeId = setTimeout(() => {
      func.apply(self, args);
      valid = true;
      clearTimeout(timeId);
    }, wait);
  };
};

// 取url参数
export const getQueryObj = (str) => {
  let hash;
  const myJson = {};
  const url = str ? str : window.location.search;
  if (url.indexOf('?') < 0 && url.indexOf('&') < 0) {
    return {};
  }
  const hashes = url.slice(url.indexOf('?') + 1).split('&');
  for (let i = 0; i < hashes.length; i++) {
    hash = hashes[i].split('=');
    myJson[hash[0]] = hash[1];
  }
  return myJson;
};

export const getQueryString = (name) => {
  const reg = new RegExp(`(^|&)'${name}=([^&]*)(&|$)`, "i");
  const r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
};

export const urlAddParams = (str) => {
  let url = window.location.href;
  if (url.indexOf('?') !== -1) {
    url += `&${str}`;
  } else {
    url += `?${str}`;
  }
  return url;
};

export const objToParamStr = (paramObj = {}) => {
  const sdata = [];
  for (let attr in paramObj) {
    sdata.push(`${attr}=${paramObj[attr]}`);
  }
  return sdata.join('&');
};

// 转为浮点数
export const mapNum = (list = []) => {
  list.forEach((item) => {
    if (item.marketPrice) {
      item.marketPrice = util.divide(item.marketPrice, 100);
    }
    if (item.salePrice) {
      item.salePrice = util.divide(item.salePrice, 100);
    }
    if (item.freeAmount) {
      item.freeAmount = util.divide(item.freeAmount, 100);
    }
    if (item.usefulAmount) {
      item.usefulAmount = util.divide(item.usefulAmount, 100);
    }
  });
  return list;
};

export const storage =  {
  get(name) {
    return JSON.parse(localStorage.getItem(name));
  },
  set(name, val) {
    localStorage.setItem(name, JSON.stringify(val))
  },
  add(name, addVal) {
    let oldVal = storage.get(name)
    let newVal = oldVal.concat(addVal)
    storage.set(name, newVal)
  }
}

export default {};

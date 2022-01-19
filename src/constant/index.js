// 定义不常用常量

import { IMG_CDN } from './common';

// 小程序版本号
export const VERSION = '1.0.0';

// 服务器接口域名
// export const apiUrl = 'http://8.135.39.109';
export const apiUrl = 'https://api-dev.yeahgo.com';
// jsbridge 打开app配置域名 
export const appBaseUrl = 'https://www.yeahgo.com';
// jsbridge 打开本项目配置域名
const env = {
  'dev': '-dev',
  'uat': '-uat',
  'pro': '',
}
export const meBaseUrl = `https://publicmobile${env[process.env.VUE_APP_API_ENV]}.yeahgo.com`;
export const refresToken = '/member/open/refreshToken';
// 服务器接口域名
export const HTTP_TIMEOUT = 5000;
// 接口请求来源
export const SOURCE_TYPE = 4;

// 空状态图片列表
// export const NODATA_LIST = [
//   {
//     type: 'content',
//     img: `${IMG_CDN['pro']}miniprogram/common/nodata/content.png`,
//     title: '暂无数据',
//   },
// ];

// 空状态图片列表
export const NODATA_LIST = {
  content: {
    img: `${IMG_CDN[process.env.VUE_APP_API_ENV]}publicMobile/common/nodata/content.png`,
    title: "暂无数据"
  },
  bankCard: {
    img: `${IMG_CDN[process.env.VUE_APP_API_ENV]}publicMobile/common/nodata/bank_card.png`,
    title: "暂无银行卡"
  },
  cart: {
    img: `${IMG_CDN[process.env.VUE_APP_API_ENV]}publicMobile/common/nodata/cart.png`,
    title: "空空如也"
  },
  collection: {
    img: `${IMG_CDN[process.env.VUE_APP_API_ENV]}publicMobile/common/nodata/collection.png`,
    title: "暂无收藏"
  },
  coupon: {
    img: `${IMG_CDN[process.env.VUE_APP_API_ENV]}publicMobile/common/nodata/coupon.png`,
    title: "暂无红包"
  },
  data: {
    type: "data",
    img: `${IMG_CDN[process.env.VUE_APP_API_ENV]}publicMobile/common/nodata/data.png`,
    title: "暂无数据"
  },
  goodLose: {
    type: "goodLose",
    img: `${IMG_CDN[process.env.VUE_APP_API_ENV]}publicMobile/common/nodata/good_lose.png`,
    title: "哎呀，找不到数据~"
  },
  loadFail: {
    img: `${IMG_CDN[process.env.VUE_APP_API_ENV]}publicMobile/common/nodata/load_fail.png`,
    title: "加载失败"
  },
  location: {
    img: `${IMG_CDN[process.env.VUE_APP_API_ENV]}publicMobile/common/nodata/location.png`,
    title: "获取定位失败"
  },
  msg: {
    type: "msg",
    img: `${IMG_CDN[process.env.VUE_APP_API_ENV]}publicMobile/common/nodata/msg.png`,
    title: "暂无消息"
  },
  network: {
    img: `${IMG_CDN[process.env.VUE_APP_API_ENV]}publicMobile/common/nodata/network.png`,
    title: "网络不给力"
  },
  order: {
    img: `${IMG_CDN[process.env.VUE_APP_API_ENV]}publicMobile/common/nodata/order.png`,
    title: "暂无订单"
  },
  search: {
    img: `${IMG_CDN[process.env.VUE_APP_API_ENV]}publicMobile/common/nodata/search.png`,
    title: "暂无数据"
  },
  storeClose: {
    img: `${IMG_CDN[process.env.VUE_APP_API_ENV]}publicMobile/common/nodata/store_close.png`,
    title: "门店休息中..."
  },
  user: {
    img: `${IMG_CDN[process.env.VUE_APP_API_ENV]}publicMobile/common/nodata/user.png`,
    title: "暂无好友"
  }
};

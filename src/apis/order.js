import { post, get } from '@/utils/request';

const url = {
  orderDetail: '/order/open/order/findOrderDetailById',
  goodDetail: '/goods/option/goodsInfo',
  BDetail: "/store/option/v2/wholesale/productDetail",
};

export default {
  // 订单详情 C端
  getOrderDetail(params = {}, options = { }) {
    return post({
      url: url.orderDetail,
      data: params,
      options: {
        showError: false,
        ...options
      },
    });
  },
  // 商品详情 C端集约 秒约 样品
  getGoodDetail(params = {}, options = { }) {
    return post({
      url: url.goodDetail,
      data: params,
      options: {
        showError: false,
        ...options
      },
    });
  },
  // 商品详情 B端集约
  getBDetail(params = {}, options = { }) {
    return get({
      url: url.BDetail,
      data: params,
      options: {
        showError: false,
        ...options
      },
    });
  },
};

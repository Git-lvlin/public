import { post, get } from '@/utils/request';

const url = {
  orderDetail: '/order/open/order/findOrderDetailById',
  goodDetail: '/goods/option/goodsInfo',
};

export default {
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
};

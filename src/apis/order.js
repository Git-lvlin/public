import { post, get } from '@/utils/request';

const url = {
  orderDetail: '/order/open/order/findOrderDetailById',
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
};

import { post, get } from '@/utils/request';

const url = {
  list: '/activity/open/everydayCouponGoodsList',
  index: '/activity/option/everydayCouponIndex',
};

export default {
  getList(params = {}, options = {}) {
    return post({
      url: url.list,
      data: params,
      options,
    });
  },
  getIndex(params = {}, options = {}) {
    return post({
      url: url.index,
      data: params,
      options,
    })
  }
};

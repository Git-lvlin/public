import { post, get } from '@/utils/request';

const url = {
  list: '/goods/option/getSpeInfoByType',
  getHealthProducts: '/healthy/option/doctor/solutionGoods',
};

export default {
  getList(params = {}, options = {}) {
    return post({
      url: url.list,
      data: params,
      options,
    });
  },
  getHealthProducts(params = {}, options = {}) {
    return post({
      url: url.getHealthProducts,
      data: params,
      options,
    });
  },
};

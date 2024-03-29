import { post, get } from '@/utils/request';

const url = {
  list: '/activity/open/acSpecGoodsList',
  one: '/activity/open/acCentGoodsList'
};

export default {
  getList(params = {}, options = {}) {
    return post({
      url: url.list,
      data: params,
      options,
    });
  },
  getOneList(params = {}, options = {}) {
    return post({
      url: url.one,
      data: params,
      options,
    });
  },
};

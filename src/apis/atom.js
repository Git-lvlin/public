import { post, get } from '@/utils/request';

const url = {
  list: '/goods/option/getSpeInfoByType',
};

export default {
  getList(params = {}, options = {}) {
    return post({
      url: url.list,
      data: params,
      options,
    });
  },
};

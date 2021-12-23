import { post, get } from '@/utils/request';

const url = {
  happy: '/goods/option/nianHuoHappy',
};

export default {
  getHappy(params = {}, options = {}) {
    return post({
      url: url.happy,
      data: params,
      options,
    });
  },
};

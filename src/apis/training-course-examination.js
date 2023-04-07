import { post, get } from '@/utils/request';

const url = {
    get: '/healthy/auth/examResult/get',
    set: '/healthy/auth/examResult/post'
};

export default {
  examResultGet(params = {}, options = {}) {
    return get({
      url: url.get,
      data: params,
      options,
    });
  },
  examResultSet(params = {}, options = {}) {
    return post({
      url: url.set,
      data: params,
      options,
    });
  },
};

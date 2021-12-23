import { post, get } from '@/utils/request';

const url = {
  pk: '/activity/option/rankinglist/wholesalepk',
};

export default {
  getPkList(params = {}, options = {}) {
    return get({
      url: url.pk,
      data: params,
      options,
    });
  },
};

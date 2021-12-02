import { post, get } from '@/utils/request';

const url = {
  list: '/activity/open/inviteCouponActivityList',
};

export default {
  getActionList(params = {}, options = {}) {
    return post({
      url: url.list,
      data: params,
      options,
    });
  },
};

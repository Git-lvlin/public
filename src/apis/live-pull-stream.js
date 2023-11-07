import { post, get } from '@/utils/request';

const url = {
    liveInfo: '/open/live/info',
};

export default {
  getLiveInfo(params = {}, options = {}) {
    return post({
      url: url.liveInfo,
      data: params,
      options,
    });
  },
};

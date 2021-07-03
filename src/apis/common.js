import { get } from '@/utils/request';

const url = {
  resourceKey: '/cms/open/json/selByResourceKey',
};

export default {
  // 获取资源位详情
  getResourceKey(params = {}, options = {}) {
    return get({
      url: url.resourceKey,
      data: params,
      options,
    });
  },
};

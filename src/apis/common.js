import { get, post } from '@/utils/request';

const url = {
  resourceKey: '/cms/open/json/selByResourceKey',
  bannerList: '/cms/option/banner/list',
  rule: '/activity/option/group/ruleInfo',
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
  // 获取拼团列表页顶部banner位数据
  getBannerList(params = {}, options = {}) {
    return get({
      url: url.bannerList,
      data: params,
      options,
    });
  },
  // 获取拼团规则
  getRule(params = {}, options = {}) {
    return post({
      url: url.rule,
      data: params,
      options,
    });
  },
};

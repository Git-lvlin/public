import { post } from '@/utils/request';

const url = {
  teamList: '/activity/option/group/platform/list',
  teamDetail: '/activity/option/group/platform/goodsInfo',
  userList: '/activity/option/group/personal/list',
};

export default {
  // 获取单约列表
  getUserList(params = {}, options = {}) {
    return post({
      url: url.userList,
      data: params,
      options,
    });
  },
  // 获取团约列表
  getTeamList(params = {}, options = {}) {
    return post({
      url: url.teamList,
      data: params,
      options,
    });
  },
  // 获取团约详情
  getTeamDetail(params = {}, options = {}) {
    return post({
      url: url.teamDetail,
      data: params,
      options,
    });
  },
};

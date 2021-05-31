import { post } from '@/utils/request';

const url = {
  teamList: '/activity/option/group/platform/list',
};

export default {
  // 获取团约列表
  getTeamList(params = {}, options = {}) {
    return post({
      url: url.teamList,
      data: params,
      options,
    });
  },
};

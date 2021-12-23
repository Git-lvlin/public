import { post, get } from '@/utils/request';

const url = {
  openBox: '/activity/auth/blindBoxWheel',
  detail: '/activity/option/getMemberBlindboxList',
  prize: '/activity/auth/blindBoxPrize',
  taskInfo: '/activity/option/blindboxInfo',
  sgin: '/public/auth/userSign/getSignNumber',
  task: '/activity/auth/blindboxTask',
};

export default {
  // 领取任务
  getTask(params = {}, options = {}) {
    return post({
      url: url.task,
      data: params,
      options,
    });
  },
  openBox(params = {}, options = {}) {
    return post({
      url: url.openBox,
      data: params,
      options,
    });
  },
  // 盲盒明细
  getDetailList(params = {}, options = {}) {
    return post({
      url: url.detail,
      data: params,
      options,
    });
  },
  // 我的奖品
  getPrizeList(params = {}, options = {}) {
    return post({
      url: url.prize,
      data: params,
      options,
    });
  },
  // 任务信息
  getTaskInfo(params = {}, options = {}) {
    return post({
      url: url.taskInfo,
      data: params,
      options,
    });
  },
  // 当天是否签到
  sameDayHasSgin(params = {}, options = {}) {
    return post({
      url: url.sgin,
      data: params,
      options,
    });
  },
};

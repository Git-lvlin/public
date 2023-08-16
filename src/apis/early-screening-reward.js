import { post, get } from '@/utils/request';

const url = {
  findCert: '/public/auth/contract/findCert',
  genContract: '/public/auth/contract/genContract',
  getVerifyUrl: '/public/auth/contract/getVerifyUrl',
  getReward: '/healthy/auth/ipo/reward',
  rewardList: '/healthy/auth/ipo/rewardList',
};

export default {
  getFindCert(params = {}, options = {}) {
    return post({
      url: url.findCert,
      data: params,
      options,
    });
  },
  genContract(params = {}, options = {}) {
    return post({
      url: url.genContract,
      data: params,
      options,
    });
  },
  getVerifyUrl(params = {}, options = {}) {
    return post({
      url: url.getVerifyUrl,
      data: params,
      options,
    });
  },
  getReward(params = {}, options = {}) {
    return post({
      url: url.getReward,
      data: params,
      options,
    });
  },
  rewardList(params = {}, options = {}) {
    return post({
      url: url.rewardList,
      data: params,
      options,
    });
  },
};

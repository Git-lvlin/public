import { post, get } from '@/utils/request';

const url = {
  findCert: '/public/auth/contract/findCert',
  genContract: '/public/auth/contract/genContract',
  getVerifyUrl: '/public/auth/contract/getVerifyUrl',
  receivePage: '/healthy/auth/ipoAward/receivePage',
  createPayOrder: '/healthy/auth/ipoAward/createPayOrder',
  awardList: '/healthy/auth/ipo/awardList',
  awardCounts: '/healthy/auth/ipo/awardCounts',
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
  receivePage(params = {}, options = {}) {
    return post({
      url: url.receivePage,
      data: params,
      options,
    });
  },
  createPayOrder(params = {}, options = {}) {
    return post({
      url: url.createPayOrder,
      data: params,
      options,
    });
  },
  awardList(params = {}, options = {}) {
    return post({
      url: url.awardList,
      data: params,
      options,
    });
  },
  awardCounts(params = {}, options = {}) {
    return post({
      url: url.awardCounts,
      data: params,
      options,
    });
  },
};

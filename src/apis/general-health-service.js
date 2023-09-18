import { post, get } from '@/utils/request';

const url = {
  findCert: '/public/auth/contract/findCert',
  genContract: '/public/auth/contract/genContract',
  getVerifyUrl: '/public/auth/contract/getVerifyUrl',
  receivePage: '/healthy/auth/ipoAward/receivePage',
  receivedPage: '/healthy/auth/ipoAward/receivedPage',
  createPayOrder: '/healthy/auth/ipoAward/createPayOrder',
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
  receivedPage(params = {}, options = {}) {
    return post({
      url: url.receivedPage,
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
};

import { post, get } from '@/utils/request';

const url = {
  genCompanyContract: "/public/open/contract/genCompanyContract",
  genContractH5: "/public/open/contract/genContractH5",
};

export default {
  genCompanyContract(params = {}, options = {}) {
    return post({
      url: url.genCompanyContract,
      data: params,
      options,
    });
  },
  genContractH5(params = {}, options = {}) {
    return post({
      url: url.genContractH5,
      data: params,
      options,
    });
  },
};

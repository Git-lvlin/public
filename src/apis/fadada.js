import { post, get } from '@/utils/request';

const url = {
  genCompanyContract: "/public/open/contract/genCompanyContract",
};

export default {
  genCompanyContract(params = {}, options = {}) {
    return post({
      url: url.genCompanyContract,
      data: params,
      options,
    });
  },
};

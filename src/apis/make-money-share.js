import { get } from '@/utils/request';

const url = {
  generateurllink: '/activity/open/wechat/generateurllink',
};

export default {
  generateurllink(params = {}, options = {}) {
    return get({
      url: url.generateurllink,
      data: params,
      options,
    });
  }
};

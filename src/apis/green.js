import { post, get } from '@/utils/request';

const url = {
  up: '/store/open/memberShopApply/uploadToken',
  code: '/store/open/memberShopApply/sendCaptcha',
  submit: '/store/open/memberShopApply/greenchannel'
};

export default {
  getUploadUrl(params = {}, options = {}) {
    return get({
      url: url.up,
      data: params,
      options,
    });
  },
  getCode(params = {}, options = {}) {
    return post({
      url: url.code,
      data: params,
      options,
    });
  },
  submit(params = {}, options = {}) {
    return post({
      url: url.submit,
      data: params,
      options,
    });
  },
};

import { post, get } from '@/utils/request';

const url = {
  code: '/member/open/getAuthCode',
  reg: '/member/auth/memberInvite/doInvite',
};

export default {
  getCode(params = {}, options = {}) {
    return post({
      url: url.code,
      data: params,
      options,
    });
  },
  getReg(params = {}, options = {}) {
    return post({
      url: url.reg,
      data: params,
      options,
    });
  },
};

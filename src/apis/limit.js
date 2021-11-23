import { post, get } from '@/utils/request';

const url = {
  info: '/activity/auth/inviteCouponIndex',
  popup: '/activity/auth/inviteCouponShowInfo',
  popuped: '/activity/auth/inviteCouponRead',
  goodsList: '/activity/auth/inviteCouponGoodsList',
  recordList: '/activity/auth/inviteCouponMemberLogList',
  limit: '/activity/auth/timePreferenceList',
};

export default {
  getInfo(params = {}, options = {}) {
    return post({
      url: url.info,
      data: params,
      options,
    });
  },
  getPopup(params = {}, options = {}) {
    return post({
      url: url.popup,
      data: params,
      options,
    });
  },
  isPopupEd(params = {}, options = {}) {
    return post({
      url: url.popuped,
      data: params,
      options,
    });
  },
  getGoodsList(params = {}, options = {}) {
    return post({
      url: url.goodsList,
      data: params,
      options,
    });
  },
  getRecordList(params = {}, options = {}) {
    return post({
      url: url.recordList,
      data: params,
      options,
    });
  },
  getTimeLimit(params = {}, options = {}) {
    return post({
      url: url.limit,
      data: params,
      options,
    });
  },
};

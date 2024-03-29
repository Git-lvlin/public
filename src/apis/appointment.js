import { post, get } from '@/utils/request';

const url = {
  teamList: '/activity/option/group/platform/list',
  teamDetail: '/activity/option/group/platform/goodsInfo',
  userList: '/activity/option/group/personal/list',
  saveList: '/contestprice/open/contestprice/GetHotGoodsList',
  hotList: '/contestprice/open/contestprice/GetRecGoodsList?isPage=1',
  newCouponGoodsList: '/activity/option/newCouponGoodsList',
  sendMemberCoupon: '/activity/auth/sendMemberCoupon',
  sendNewMemberCoupon: '/activity/auth/sendNewMemberCoupon',
  couponList: '/activity/option/couponCenterList',
  couponClassList: '/activity/option/couponCenterClassList',
  couponTimeInfo: '/activity/option/couponCmsCenterList',
  couponIndex: '/activity/option/newMemberCouponList',
  getInviteInfo: '/member/auth/memberInvite/getInviteInfo',
  activitySubject: '/cms/open/activitySubject/getById',
  getGcid: '/goods/open/category',
  share: '/share/option/shareParam/queryMemberQrCode',
};

export default {
  // 获取单约列表
  getUserList(params = {}, options = {}) {
    return post({
      url: url.userList,
      data: params,
      options,
    });
  },
  // 获取团约列表
  getTeamList(params = {}, options = {}) {
    return post({
      url: url.teamList,
      data: params,
      options,
    });
  },
  // 获取团约详情
  getTeamDetail(params = {}, options = {}) {
    return post({
      url: url.teamDetail,
      data: params,
      options,
    });
  },
  // 获取低价爆品
  getSaveGoodsList(params = {}, options = {}) {
    return get({
      url: url.saveList,
      data: params,
      options,
    })
  },
  // 获取热门推荐列表
  getHotGoodsList(params = {}, options = {}) {
    return get({
      url: url.hotList,
      data: params,
      options,
    })
  },
  // 新人红包页面商品列表
  getNewCouponGoodsList(params = {}, options = {}) {
    return post({
      url: url.newCouponGoodsList,
      data: params,
      options,
    })
  },
  // 领券中心 领券
  getCoupon(params = {}, options = {}) {
    return post({
      url: url.sendMemberCoupon,
      data: params,
      options,
    })
  },
  // 领券中心 分类
  getCouponClassList(params = {}, options = {}) {
    return post({
      url: url.couponClassList,
      data: params,
      options,
    })
  },
  // 领券中心 全部
  getCouponAll(params = {}, options = {}) {
    return post({
      url: url.couponList,
      data: params,
      options,
    })
  },
  // 领券中心 倒计时配置
  getCouponTimeInfo(params = {}, options = {}) {
    return post({
      url: url.couponTimeInfo,
      data: params,
      options,
    })
  },
  // 领券中心 分类列表
  getGcid(params = {}, options = {}) {
    return get({
      url: url.getGcid,
      data: params,
      options,
    })
  },
  // 新人红包 领取
  getNewRedbox(params = {}, options = {}) {
    return post({
      url: url.sendNewMemberCoupon,
      data: params,
      options,
    })
  },
  // 新人专享 红包
  getNewPeoplesCoupon(params = {}, options = {}) {
    return post({
      url: url.couponIndex,
      data: params,
      options,
    })
  },
  // 获取用户分享信息
  apiGetInviteInfo(params = {}, options = {}) {
    return post({
      url: url.getInviteInfo,
      data: params,
      options,
    })
  },
  // 营销资源
  getActivitySubject(params = {}, options = {}) {
    return get({
      url: url.activitySubject,
      data: params,
      options,
    })
  },
  // 营销资源
  getShareImg(params = {}, options = {}) {
    return post({
      url: url.share,
      data: params,
      options,
    })
  }
};

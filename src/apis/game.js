import { post, get } from '@/utils/request';

const url = {
  game: '/activity/auth/buildhouseInfo',
  pkInvite: '/activity/auth/getInviteRank',
  pkRank: '/activity/auth/getFloorRank',
  rankList: '/activity/auth/getMemberBuildhouseList',
  totalPrice: '/activity/auth/getMyTotalPrize',
  priceList: '/activity/auth/getMyPrizeList',
  accountInfo: '/financial/auth/purseAccountActivity/info',
  withdrawVerify: '/financial/auth/purseAccountActivity/withdrawVerifyAmount',
  withdrawSms: '/financial/auth/purseAccountActivity/withdrawSendSms',
  withdrawApply: '/financial/auth/purseAccountActivity/withdrawApply',
  withdrawList: '/financial/auth/purseAccountActivity/rollPage',
  demo: '/activity/auth/useBhDemoChance',
  pro: '/activity/auth/useBuildhouseChance',
  prize: '/activity/auth/prizeDraw',
  record: '/activity/auth/addGameRecord',
  pic: '/member/auth/memberInfo/getMemberInfoMiz',
};

export default {
  getPic(params = {}, options = {}) {
    return post({
      url: url.pic,
      data: params,
      options,
    });
  },
  getGameInfo(params = {}, options = {}) {
    return post({
      url: url.game,
      data: params,
      options,
    });
  },
  getConsume(params = {}, options = {}) {
    return post({
      url: url.demo,
      data: params,
      options,
    });
  },
  getUseBuildingNum(params = {}, options = {}) {
    return post({
      url: url.pro,
      data: params,
      options,
    });
  },
  getPrize(params = {}, options = {}) {
    return post({
      url: url.prize,
      data: params,
      options,
    });
  },
  getAddRecord(params = {}, options = {}) {
    return post({
      url: url.record,
      data: params,
      options,
    });
  },
  // 排行榜 邀请列表
  getPkInvite(params = {}, options = {}) {
    return post({
      url: url.pkInvite,
      data: params,
      options,
    });
  },
  // 排行榜 楼层列表
  getPkRank(params = {}, options = {}) {
    return post({
      url: url.pkRank,
      data: params,
      options,
    });
  },
  // 机会明细列表
  getRankList(params = {}, options = {}) {
    return post({
      url: url.rankList,
      data: params,
      options,
    });
  },
  // 参与记录 红包总额
  getTotalPrice(params = {}, options = {}) {
    return post({
      url: url.totalPrice,
      data: params,
      options,
    });
  },
  // 参与记录 红包列表
  getPriceList(params = {}, options = {}) {
    return post({
      url: url.priceList,
      data: params,
      options,
    });
  },
  // 提现账户信息
  getAccountInfo(params = {}, options = {}) {
    return post({
      url: url.accountInfo,
      data: params,
      options,
    });
  },
  // 提现金额校验
  getWithdrawVerify(params = {}, options = {}) {
    return post({
      url: url.withdrawVerify,
      data: params,
      options,
    });
  },
  // 提现发送验证码
  getWithdrawSms(params = {}, options = {}) {
    return post({
      url: url.withdrawSms,
      data: params,
      options,
    });
  },
  // 提现申请
  getWithdrawApply(params = {}, options = {}) {
    return post({
      url: url.withdrawApply,
      data: params,
      options,
    });
  },
  // 提现列表
  getWithdrawList(params = {}, options = {}) {
    return post({
      url: url.withdrawList,
      data: params,
      options,
    });
  },
};

import { post, get } from '@/utils/request';

const url = {
  game: '/activity/auth/buildhouseInfo',
  pkInvite: '/activity/auth/getInviteRank',
  pkRank: '/activity/auth/getFloorRank',
  accountInfo: '/financial/auth/purseAccountActivity/info',
  demo: '/activity/auth/useBhDemoChance',
  pro: '/activity/auth/useBuildhouseChance',
  prize: '/activity/auth/prizeDraw',
  record: '/activity/auth/addGameRecord',
};

export default {
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
  getPkInvite(params = {}, options = {}) {
    return post({
      url: url.pkInvite,
      data: params,
      options,
    });
  },
  getPkRank(params = {}, options = {}) {
    return post({
      url: url.pkRank,
      data: params,
      options,
    });
  },
  getAccountInfo(params = {}, options = {}) {
    return post({
      url: url.accountInfo,
      data: params,
      options,
    });
  },
  
};

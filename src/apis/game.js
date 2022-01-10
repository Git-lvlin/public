import { post, get } from '@/utils/request';

const url = {
  game: '/activity/auth/buildhouseInfo',
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

};

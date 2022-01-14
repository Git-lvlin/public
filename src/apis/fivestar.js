import { post, get } from '@/utils/request';

const url = {
  list: '/store/auth/activity/doubleheart',
  info: '/store/auth/storeShop/info',
  inventuserlist: '/store/auth/activity/inventuserlist',
  inventstorelist: '/store/auth/activity/inventstorelist',
  storetranslist: '/store/auth/activity/storetranslist',
  listNew: '/store/auth/newyear/projectList',
  inventuserlistNew: '/store/auth/newyear/inventuserlist'
};

export default {
  getInvitationListNew(params = {}, options = {}) {
    return post({
      url: url.inventuserlistNew,
      data: params,
      options,
    });
  },
  getListNew(params = {}, options = {}) {
    return post({
      url: url.listNew,
      data: params,
      options,
    });
  },
  getList(params = {}, options = {}) {
    return post({
      url: url.list,
      data: params,
      options,
    });
  },
  getStoreShopInfo(params = {}, options = {}) {
    return get({
      url: url.info,
      data: params,
      options,
    });
  },
  getInvitationList(params = {}, options = {}) {
    return post({
      url: url.inventuserlist,
      data: params,
      options,
    });
  },
  getInventstoreList(params = {}, options = {}) {
    return post({
      url: url.inventstorelist,
      data: params,
      options,
    });
  },
  getStoreransList(params = {}, options = {}) {
    return post({
      url: url.storetranslist,
      data: params,
      options,
    });
  },
};

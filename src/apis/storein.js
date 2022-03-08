import { post, get } from '@/utils/request';

const url = {
  details: '/cms/open/storeStory/getStoreStory',
};

export default {
  getData(params = {}, options = {}) {
    return post({
      url: url.details,
      data: params,
      options,
    });
  },
};

import { post, get } from '@/utils/request';

const url = {
  subjectActivityInfo: '/activity/open/subjectActivityInfo',
};

export default {
  getSubjectActivityInfo(params = {}, options = {}) {
    return post({
      url: url.subjectActivityInfo,
      data: params,
      options,
    });
  },
};

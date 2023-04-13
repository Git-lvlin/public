import { post } from '@/utils/request'

const url = {
  material: '/goods/option/supplier/getNewMaterial',
  captcha: '/goods/open/supplier/getCaptcha'
};

const getMaterial = (params = {}, options = {}) => {
  return post({
    url: url.material,
    data: params,
    options,
  })
}

const getCaptcha = (params = {}, options = {}) => {
  return post({
    url: url.captcha,
    data: params,
    options,
  })
}

export default { getMaterial, getCaptcha }

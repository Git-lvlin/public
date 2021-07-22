<template>
  <div class="box">
    <!-- <van-image
      class="pdf"
      width="100%"
      :src="getImgUrl(`publicMobile/agreement/user/约购平台用户服务协议1.0.pdf`)"
    /> -->
    <pdf class="pdf" :src="pdf"></pdf>
  </div>
</template>

<script>
import Vue from 'vue';
import { Image as VanImage } from 'vant';
import { getImgUrl } from '@/utils/tools';
import pdf from 'vue-pdf';
const pdfNameMap = {
  business: [
    '诚信经营承诺书-商家通用-入驻签署1.0',
    '危险物品合规承诺书-商家通用-入驻签署1.0',
    '消费者保障规则-商家通用-入驻阅读1.0',
    '约购平台保证金管理规则-商家通用1.0',
    '约购平台商家入驻服务协议1.0',
    '约购平台商品退换货规则-商家通用-入驻阅读1.0',
    '约购平台自营店发货规则1.0',
    '约购平台自营店卖家服务须知-自营店卖家后台查阅1.0',
  ],
  store: [
    '约购平台发货规则-社区店和自营店1.0',
    '约购平台集约模式规则说明1.0',
    '约购平台商品退换货规则-通用1.0',
    '约购平台社区店服务须知1.0',
  ],
  user: [
    '约购平台个人信息保护及隐私权政策1.0',
    '约购平台用户服务协议1.0',
  ],
}
Vue.use(VanImage);
export default {
  data() {
    return {
      pdf: ''
    };
  },
  components: {
    pdf
  },
  created () {
    const {
      query,
    } = this.$router.history.current;
    console.log('query', query)
    if (!query.reg) {
      return console.log('没有选中协议')
    }
    if (!query.index && query.index !== 0) {
      query.index = 0
    }
    const indexName = pdfNameMap?.[query.reg]?.[query.index]
    this.pdf = getImgUrl(`publicMobile/agreement/${query.reg}/${indexName}.pdf`)
  },
  methods: {
    getImgUrl,
  },
};
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color:#ffffff; 
}
.pdf {
  transform: scale(1.1);
}
</style>
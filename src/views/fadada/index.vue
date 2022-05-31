<template>
  <div>
    <div class="text">{{status[$route.query.type]}}</div>
    <div class="btn">
      <van-button type="danger" block @click="back">返回</van-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Button } from 'vant';
import fadadaApi from '@/apis/fadada';
Vue.use(Button);
export default {
  data() {
    return {
      status: {
        1: '认证成功',
        2: '签约成功'
      }
    }
  },
  components: {
    [Button.name]: Button,
  },
  methods: {
    back() {
      if (this.$route.query.type == 1) {
        this.goTo()
      } else {
        wx.miniProgram.navigateBack()
      }
    },
    goTo() {
      let data = localStorage.getItem('pdfData')
      console.log('goto-pdfData', data)
      fadadaApi.genCompanyContract({
        companyId: data.contractId,
        businessId: data.contractId,
        contractUrl: data.url
      }).then(res => {
        let signUrl = encodeURIComponent(res.signUrl);
        wx.miniProgram.navigateTo({
          url: `pages/webview/index?url=${signUrl}&encode=true`
        })
        // router.push({
        //   name: "webview",
        //   data: {
        //     url: encodeURIComponent(res.signUrl),
        //     encode: true
        //   }
        // });
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.text {
  text-align: center;
  margin: 20px 0;
}
.btn {
  margin: 0 auto;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}
</style>

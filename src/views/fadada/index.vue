<template>
  <div>
    <div class="text">{{ status[$route.query.type] }}</div>
    <div v-if="$route.query.type == 5">
      <van-overlay :show="show" @click="show = false">
        <div class="wrap">
          <img :src="getImgUrl('publicMobile/share/sys.png')" />
        </div>
      </van-overlay>
    </div>
    <div class="btn">
      <van-button type="danger" block @click="back">{{ $route.query.type == 1 ? '签约' : '返回' }}</van-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Button, Overlay } from 'vant';
import fadadaApi from '@/apis/fadada';
import { getImgUrl } from '@/utils/tools';

Vue.use(Button);
export default {
  data() {
    return {
      status: {
        1: '认证成功',
        2: '签约成功'
      },
      show: true,
    }
  },
  components: {
    [Button.name]: Button,
    [Overlay.name]: Overlay,
  },
  methods: {
    getImgUrl,
    back() {
      if (this.$route.query.type == 1) {
        this.goTo()
      } else {
        wx.miniProgram.navigateBack()
      }
    },
    goTo() {
      if (this.$route.query.businessId) {
        fadadaApi.genContractH5({
          ...this.$route.query
        }).then(res => {
          window.location.href = res.data.signUrl;
        })
        return;
      }

      let data = localStorage.getItem('pdfData');
      data = JSON.parse(data);
      console.log('goto-pdfData', data)
      if (!data) {
        wx.miniProgram.navigateBack()
        return
      }
      fadadaApi.genCompanyContract({
        companyId: data.contractId,
        businessId: data.contractId,
        contractUrl: data.url
      }).then(res => {
        // let signUrl = encodeURIComponent(res.data.signUrl);
        // wx.miniProgram.navigateTo({
        //   url: `pages/webview/index?url=${signUrl}&encode=true`
        // })
        console.log('res', res)
        // console.log('signUrl', signUrl)
        window.location.href = res.data.signUrl;

        localStorage.removeItem('pdfData')
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

.wrap {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    width: 95%;
  }
}
</style>

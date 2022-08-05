<template>
  <div class="make-money" :style="`background-image:url(${getImgUrl('publicMobile/make-money/bg.png')})`">
    <div class="box">
      <div class="title">四步得赏金：分享成功 得现金收益</div>
      <ul>
        <li :style="`background-image:url(${getImgUrl('publicMobile/make-money/icon.png')})`">
          <div class="title">1、邀请好友注册约购APP</div>
          <div class="btn" @click="share">立即邀请</div>
        </li>
        <li :style="`background-image:url(${getImgUrl('publicMobile/make-money/icon.png')})`">
          <div class="title">2、分享氢原子商品给好友下单并签署在线合同</div>
          <div class="btn" @click="go">查看商品</div>
        </li>
        <li :style="`background-image:url(${getImgUrl('publicMobile/make-money/icon.png')})`">
          <div class="title">3、邀请好友开通VIP店铺</div>
          <div class="sub-title">在"约购APP-我的-我的服务-店主入驻"处申请入驻</div>
        </li>
        <li :style="`background-image:url(${getImgUrl('publicMobile/make-money/icon.png')})`">
          <div class="title">4、好友下单后将获得收益，详情请咨询客服</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getImgUrl } from '@/utils/tools';
import { appBaseUrl } from "@/constant/index";
import { goToApp } from "@/utils/userInfo";

export default {
  data() {
    return {};
  },
  created() {
    // this.$bridge.callHandler('share', {
    //   contentType: 18,
    //   paramId: 19,
    //   sharePopup: false,
    // });
  },
  methods: {
    getImgUrl,
    share() {
      this.$bridge.callHandler('share', { "code": 0, "msg": "success", "data": { "contentType": 18, "paramId": 19, "shareType": 1, "sourceType": 1 } });
    },
    go() {
      const skuId = {
        dev: '218884',
        uat: '6327',
        pro: '224766',
      }
      const spuId = {
        dev: '2760',
        uat: '4490',
        pro: '26457',
      }
      if (this.$store.state.appInfo.isApp) {
        goToApp(appBaseUrl, '/shopping/detail', `?orderType=2&spuId=${spuId[process.env.VUE_APP_API_ENV]}&objectId=0&activityId=0&skuId=${skuId[process.env.VUE_APP_API_ENV]}`)
      } else {
        console.log('不是App内')
      }
    },
  },
};
</script>

<style lang="scss" scoped>

.make-money {
  min-height: 100vh;
  background-size: 100%;
  padding-top: 398px;
  padding-bottom: 26px;
  background-repeat: no-repeat;
}

.box {
  width: 334px;
  height: 389px;
  background: #FFFFFF;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.5020);
  border-radius: 10px 10px 10px 10px;
  opacity: 1;
  margin: 0 auto;
  padding-top: 14px;

  >.title {
    font-size: 18px;
    font-weight: bold;
    color: #A55300;
    line-height: 25px;
    text-align: center;
    margin-bottom: 16px;
  }
}

ul {
  padding: 0 25px;
}

li {
  background-size: 24px;
  background-repeat: no-repeat;
  padding-left: 27px;
  margin-bottom: 15px;

  .title {
    font-size: 18px;
    font-weight: 500;
    color: #FD7F00;
  }

  .sub-title {
    font-size: 12px;
    font-weight: 500;
    color: #A55300;
  }

  .btn {
    width: 110px;
    line-height: 34px;
    background: #FD7F00;
    border-radius: 17px 17px 17px 17px;
    opacity: 1;
    font-size: 14px;
    font-weight: 400;
    color: #FEFFFE;
    text-align: center;
    margin-top: 5px;
  }
}
</style>

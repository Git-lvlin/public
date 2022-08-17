<template>
  <div class="sincerely-recruiting-operators"
    :style="`background-image:url(${getImgUrl('publicMobile/sincerely-recruiting-operators/bg.png')})`">
    <div class="wrap">
      <div class="title">完成四步，立享收益</div>
      <ul>
        <li>
          <div class="title">第一步：注册约购APP</div>
          <div class="btn" @click="go" v-if="!isApp">立即注册</div>
        </li>
        <li>
          <div class="title">第二步：开通运营资质并签署运营合同</div>
          <div class="btn" @click="open" v-if="!isApp && link">立即开通</div>
        </li>
        <li>
          <div class="title">第三步：开通VIP店铺</div>
          <span>在"约购APP-我的-我的服务-店主入驻"处申请开通</span>
        </li>
        <li>
          <div class="title">第四步：等待设备到店，激活设备，<br />享受收益</div>
        </li>
      </ul>
      <div class="btn" @click="toApp" v-if="isApp">立即申请运营资质</div>
    </div>
  </div>
</template>

<script>
import { getImgUrl } from '@/utils/tools';
import { appBaseUrl } from "@/constant/index";
import { goToApp } from "@/utils/userInfo";
import api from '@/apis/make-money-share';

export default {
  data() {
    return {
      isApp: this.$store.state.appInfo.isApp,
      link: ''
    };
  },
  created() {
    if (!this.isApp) {
      api.generateurllink({ inviteCode: this.$route.query.inviteCode, pagename:'devicemanagepay' })
        .then(res => {
          this.link = res.data.devicemanagepay
        })
    }
  },
  methods: {
    getImgUrl,
    open(){
      window.location.href = this.link;
    },
    toApp() {
      goToApp(appBaseUrl, '/health/openMachinesBusiness')
    },
    go() {
      this.$router.push({ path: '/web/new-share', query: { ...this.$route.query } })
    },
  },
};
</script>

<style lang="scss" scoped>
.sincerely-recruiting-operators {
  min-height: 100vh;
  background-size: 100%;
  background-repeat: no-repeat;
  padding: 490px 50px 70px;

  .wrap {
    >.title {
      font-size: 24px;
      color: #026CBA;
    }

    >.btn {
      margin: 20px auto 0;
      font-size: 12px;
      color: #FFFFFF;
      width: 225px;
      line-height: 36px;
      background: #E5352F;
      border-radius: 18px 18px 18px 18px;
      text-align: center;
    }
  }

  ul {
    margin-top: 20px;
  }

  li {
    margin-bottom: 20px;

    .title {
      font-size: 16px;
      color: #026CBA;
      line-height: 22px;
    }

    span {
      font-size: 12px;
      font-weight: normal;
      color: #333333;
    }

    .btn {
      width: 110px;
      line-height: 34px;
      background: #FEE002;
      border-radius: 8px 8px 8px 8px;
      font-size: 14px;
      color: #026CBA;
      text-align: center;
      margin-top: 5px;
    }
  }
}
</style>

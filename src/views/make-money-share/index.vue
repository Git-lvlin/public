<template>
  <div class="make-money" :style="`background-image:url(${getImgUrl('publicMobile/make-money-share/bg.png?v=1')})`">
    <div class="box">
      <ul>
        <li>
          <div class="unit">
            <span>1</span>
            <div>注册约购APP</div>
          </div>
        </li>
        <li>
          <div class="unit">
            <span>2</span>
            <div>下单购买商品并签署在线合同</div>
          </div>
        </li>
        <li>
          <div class="unit">
            <span>3</span>
            <div>开通VIP店铺 </div>
          </div>
          <div class="sub">在"约购APP-我的-我的服务-店主入驻"处<br />申请入驻</div>
        </li>
      </ul>
      <div class="btn" @click="go">立即注册参与</div>
    </div>
  </div>
</template>

<script>
import { getImgUrl } from '@/utils/tools';

export default {
  data() {
    return {};
  },
  created() {
    this.$bridge.callHandler('share', {
      contentType: 18,
      paramId: 19,
      sharePopup: false,
    });
  },
  methods: {
    getImgUrl,
    go() {
      this.$router.push({ path: '/web/new-share', query: { ...this.$route.query}})
    },
  },
};
</script>

<style lang="scss" scoped>
.make-money {
  min-height: 110vh;
  background-size: 100%;
  padding-top: 398px;
  padding-bottom: 26px;
  background-repeat: no-repeat;
}

.box {
  position: absolute;
  top: 381px;
  width: 100%;

  ul {
    padding-left: 52px;
  }

  li {
    margin-bottom: 30px;
  }

  .unit {
    display: flex;

    span {
      width: 24px;
      line-height: 24px;
      background: #F76122;
      border-radius: 50%;
      text-align: center;
      font-size: 18px;
      font-weight: 400;
      color: #FFFFFF;
      margin-right: 14px;
    }

    div {
      font-size: 18px;
      font-weight: 400;
      color: #333333;
    }
  }

  .sub {
    padding-left: 40px;
    font-size: 12px;
    font-weight: 500;
    color: #FD7F00;
    margin-top: 5px;
  }

  .btn {
    width: 170px;
    line-height: 36px;
    background: #FF0000;
    border-radius: 4px 4px 4px 4px;
    text-align: center;
    font-size: 14px;
    font-weight: 400;
    color: #FFFFFF;
    margin: 0 auto;
  }
}
</style>

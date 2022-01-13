<template>
  <div class="rule">
    <div class="mask"></div>
    <div class="box">
      <div class="title">一、活动时间</div>
      <div class="content">2021年12月24日00:00:00-2022年2月22日23:59:59</div>
      <div class="title">二、参与条件</div>
      <div class="content">约购APP注册用户，且用户的约购APP已更新到最新版本。</div>
      <div class="title">三、参与方式</div>
      <div class="content">活动时间内用户通过约购APP首页进入约购年货节活动页面，根据页面提示参与活动</div>
      <div class="title">四、签到领红包活动细则</div>
      <div class="content">
        <div class="item">1.活动期间，用户进入签到页面完成签到，即可领取签到红包，连续签到天数越多红包越多，具体以签到页面展示为准。</div>
        <div class="item">2.签到红包仅限在年货节活动页面购买部分秒约商品以及在签到页面购买秒约商品时可用，用户使用红包须满足商品限定的使用条件方可享受优惠。</div>
        <div class="item">3.签到红包不可抵现，抵扣的部分不开发票，亦不可转赠他人。</div>
        <div class="item">4.用户领取签到红包后180天内有效，过期自动清零，用户使用时优先消耗即将过期的红包余额。</div>
        <div class="item">5.用户活动开启前签到获得的红包余额，亦可在本次活动中使用。</div>
        <div class="item">6.未尽事宜以签到页面中的规则为准。</div>
      </div>
      <div class="title">五、下单抽盲盒活动细则</div>
      <div class="content">
        <div class="item">1.活动期间用户完成每日首单消费、连续3天签到、邀请好友下载注册约购APP均可以获得盲盒开盒机会，具体如下:</div>
        <van-image
          class="rule-img"
          width="100%"
          lazy-load
          :src="getImgUrl(`publicMobile/happynewyear/rule-detail.png`)"
        />
        <div class="item">2.盲盒开盒机会仅在活动期内有效，过期失效不再补发，相关损失由用户自行承担；</div>
        <div class="item">3.用户消耗开盒机会开启盲盒，有机会获得海信电视机等奖品，具体奖品以盲盒活动页面展示为准。</div>
        <div class="item">4.用户获奖后需在7天内免费下单完成奖品领取（如获奖后未及时领取奖品，可在“盲盒首页-我的奖品”进行领取），部分奖品须支付一定运费方可完成领取。</div>
        <div class="item">5.用户超期未完成奖品领取，视为放弃奖品，不再补发。</div>
        <div class="item">6.奖品将在用户获奖并领取后的15天内以邮寄的形式发放，如遇疫情或春节假期物流停运，将延期到物流恢复正常后再行发放。</div>
        <div class="item">7.用户完成消费任务并获奖后不得退款，如有退款将取消活动奖励发放。</div>
        <div class="item">8.未尽事宜以盲盒页面中的规则为准。</div>
      </div>

      <div class="title">六、其他注意事项</div>
      <div class="content">
        <div class="item">1.在参与活动的过程中，如果用户出现违规行为（如虚假交易、作弊领取、以不正当的手段获取权益等）约购有权撤销活动奖励发放，取消用户参与活动资格，并保留进一步追责的权利。</div>
        <div class="item">2.约购可以根据本活动的实际举办情况对活动规则进行变动和调整，相关变动或调整将公布在活动页面上，公布后依法生效。</div>
        <div class="item">3.本活动与苹果公司无关。</div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Image as VanImage, Dialog, Lazyload } from 'vant';
import { getImgUrl } from '@/utils/tools';
Vue.use(VanImage);
Vue.use(Lazyload);
export default {
  data() {
    return {
    };
  },
  components: {
    [Dialog.Component.name]: Dialog.Component,
  },
  created () {
  },
  methods: {
    getImgUrl,
  },
};
</script>

<style lang="scss" scoped>
  .rule {
    text-align: justify;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color:#EDEDED;
  }
  .mask {
    width: 100%;
    height: 12px;
  }
  .box {
    padding: 12px;
    display: flex;
    flex-direction: column;
    background: #FFFFFF;
    .title {
      color: #333333;
      font-size: 16px;
      line-height: 22px;
    }
    .content {
      color: #666666;
      font-size: 14px;
      line-height: 22px;
      margin-bottom: 22px;
    }
  }
  .rule-img {
    margin-top: 8px;
  }
</style>

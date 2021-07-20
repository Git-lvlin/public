<template>
  <div class="store-in">
    <van-image
      class="banner"
      width="100%"
      height="471px"
      :src="getImgUrl('publicMobile/store/bg.png')"
    />
    <div class="title">
      <van-image
        width="17px"
        height="13px"
        :src="getImgUrl('publicMobile/store/title-l.png')"
      />
      <span class="title-text">入驻平台 四大优势</span>
      <van-image
        width="17px"
        height="13px"
        :src="getImgUrl('publicMobile/store/title-r.png')"
      />
    </div>
    <div class="item-box">
      <van-image
        class="red"
        width="37px"
        :src="getImgUrl('publicMobile/store/red-right.png')"
      />
      <van-image
        class="link-l"
        width="8px"
        :src="getImgUrl('publicMobile/store/link.png')"
      />
      <van-image
        class="link-r"
        width="8px"
        :src="getImgUrl('publicMobile/store/link.png')"
      />
      <div class="title-box">
        <van-image
          class="title-img"
          width="255px"
          :src="getImgUrl('publicMobile/store/title.png')"
        />
        <span class="span-text">优势一:专享批发价</span>
      </div>
      <div class="content">
        <van-image
          width="147px"
          height="117px"
          :src="getImgUrl('publicMobile/store/item-img1.png')"
        />
        <div class="r-box">
          <div class="li"><span class="sort">01</span>买一件也是批发价</div>
          <div class="li"><span class="sort">02</span>商品利润直接返回</div>
          <div class="li"><span class="sort">03</span>3000多个知名品牌</div>
          <div class="li"><span class="sort">04</span>限量低价抢购</div>
        </div>
      </div>
    </div>
    <div class="item-box item-box2">
      <van-image
        class="link-l"
        width="8px"
        height="61px"
        :src="getImgUrl('publicMobile/store/link.png')"
      />
      <van-image
        class="link-r"
        width="8px"
        height="61px"
        :src="getImgUrl('publicMobile/store/link.png')"
      />
      <div class="title-box">
        <van-image
          class="title-img"
          width="255px"
          :src="getImgUrl('publicMobile/store/title.png')"
        />
        <span class="span-text">优势二:特惠精品承诺</span>
      </div>
      <div class="content">
        <van-image
          width="147px"
          height="117px"
          :src="getImgUrl('publicMobile/store/item-img2.png')"
        />
        <div class="r-box">
          <div class="li"><span class="sort">01</span>约购提供众多官方精选</div>
          <div class="li"><span class="sort">02</span>厂家直供的品质好货</div>
          <div class="li"><span class="sort">03</span>对商品不满意可在规定</div>
          <div class="li"><span class="sort sort-null">04</span>时间内申请退货退款</div>
        </div>
      </div>
    </div>
    <div class="item-box item-box2">
      <van-image
        class="red-left"
        width="74.8px"
        height="103px"
        :src="getImgUrl('publicMobile/store/red-left.png')"
      />
      <van-image
        class="link-l"
        width="8px"
        height="61px"
        :src="getImgUrl('publicMobile/store/link.png')"
      />
      <van-image
        class="link-r"
        width="8px"
        height="61px"
        :src="getImgUrl('publicMobile/store/link.png')"
      />
      <div class="title-box">
        <van-image
          class="title-img"
          width="255px"
          :src="getImgUrl('publicMobile/store/title.png')"
        />
        <span class="span-text">优势三:零成本开店</span>
      </div>
      <div class="content">
        <van-image
          width="147px"
          height="117px"
          :src="getImgUrl('publicMobile/store/item-img3.png')"
        />
        <div class="r-box">
          <div class="li"><span class="sort">01</span>0成本轻松开店</div>
          <div class="li"><span class="sort">02</span>海量商品随意选择</div>
          <div class="li"><span class="sort">03</span>无需囤货一键代发</div>
          <div class="li"><span class="sort">04</span>为您提供全方位的服务</div>
        </div>
      </div>
    </div>
    <div class="item-box z-index">
      <van-image
        class="money"
        width="55.83px"
        height="61px"
        :src="getImgUrl('publicMobile/store/money.png')"
      />
      <div class="title-box">
        <van-image
          class="title-img"
          width="255px"
          :src="getImgUrl('publicMobile/store/title.png')"
        />
        <span class="span-text">优势四:大额优惠券</span>
      </div>
      <div class="content">
        <van-image
          width="147px"
          height="117px"
          :src="getImgUrl('publicMobile/store/item-img4.png')"
        />
        <div class="r-box">
          <div class="li"><span class="sort">01</span>约购会员可在品牌促销</div>
          <div class="li"><span class="sort sort-null">02</span>平台活动中领取大额优</div>
          <div class="li"><span class="sort sort-null">03</span>惠券</div>
          <div class="li"><span class="sort">02</span>物超所值,就在约购</div>
        </div>
      </div>
    </div>
    <div class="title">
      <van-image
        width="17px"
        height="13px"
        :src="getImgUrl('publicMobile/store/title-l.png')"
      />
      <span class="title-text">仅需四步成为会员店主</span>
      <van-image
        width="17px"
        height="13px"
        :src="getImgUrl('publicMobile/store/title-r.png')"
      />
    </div>
    <div class="last-box">
      <div class="stag"><span>1</span>填写申请资料</div>
      <div class="sub"><span></span>开通支付通道,填写开店申请资料。</div>
      <div class="stag"><span>2</span>平台信息审核</div>
      <div class="sub"><span></span>平台信息审核,签署协议</div>
      <div class="stag"><span>3</span>获得会员资格</div>
      <div class="sub"><span></span>获得会员资格,店铺在线装修</div>
      <div class="stag"><span>4</span>开始经营</div>
      <div class="sub"><span></span>缴纳店铺保证金,开始经营</div>
    </div>
    <div class="cushions"></div>
    <div class="button-box">
      <van-image
        @click="onToDetail"
        width="332px"
        :src="getImgUrl('publicMobile/store/button.png')"
      />
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Image as VanImage } from 'vant';
import { getImgUrl } from '@/utils/tools';
import { appBaseUrl } from "@/constant/index";
Vue.use(VanImage);
export default {
  props: {

  },
  data() {
    return {
      isShow: false,
      hasToken: false
    };
  },
  components: {
  },
  created () {
    this.$bridge.callHandler(
          'fetchToken',
          {},
          (a) => {
            if (a && a.length) {
              this.hasToken = true
            }
          }
        )
  },
  methods: {
    getImgUrl,
    onToDetail() {
      console.log(window.navigator)
      console.log("$store.state.appInfo", this.$store.state.appInfo)
      if (this.$store.state.appInfo.isApp) {
        if (!this.hasToken) {
          this.$bridge.callHandler(
            'router',
            `${appBaseUrl}/login/index`,
          )
          return
        }
        this.$bridge.callHandler(
          'router',
          `${appBaseUrl}/flutter/store/member/settled`,
        )
      } else if (this.$store.state.appInfo.isMiniprogram) {
        wx.miniProgram.navigateTo({
          url: '/pages/login/main/index'
        })
      } else {
        console.log('不是App内')
      }
    }
  },
};
</script>

<style lang="scss" scoped>
  .store-in {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: #fbe1c7;
  }
  .banner {
    margin-bottom: 17px;
  }
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    .title-text {
      margin: 0 12px;
      // width:167px;
      height:28px;
      font-family:PingFang SC;
      font-weight:600;
      color:#dd1e0c;
      font-size:20px;
      line-height:28px;
      text-align:center;
    }
  }
  .item-box {
    position: relative;
    margin: 0 auto;
    margin-top: 15.06px;
    width:351px;
    height:180px;
    background-color:#ffffff;
    border-radius:8px;
    box-shadow:0px 2px 4px rgba(226, 197, 167, 0.27),0px 0px 3px #fbe1c7 inset;
    .red {
      position: absolute;
      top: -16.34px;
      right: -12px;
    }
    .red-left {
      position: absolute;
      bottom: -84px;
      left: -12px;
      z-index: 2;
    }
    .money {
      position: absolute;
      bottom: -21px;
      right: -12px;
      z-index: 4;
    }
    .link-l {
      position: absolute;
      left: 20px;
      bottom: -48px;
      width: 8px;
      height: 61px;
      z-index: 9;
    }
    .link-r {
      position: absolute;
      right: 20px;
      bottom: -48px;
      width: 8px;
      height: 61px;
      z-index: 9;
    }
    .title-box {
      position: absolute;
      top: -6.68px;
      left: 50%;
      transform: translate(-50%);
      width: 255px;
      height: 35.3px;
      text-align: center;
      .span-text {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        line-height: 35.3px;
        text-shadow:0px 2px 4px #2d4995;
        font-family:PingFang SC;
        font-weight:600;
        color:#ffffff;
        font-size:16px;
        letter-spacing:0.89px;
      }
    }
    .content {
      padding: 44.32px 0 18.68px 0;
      display: flex;
      justify-content: center;
      .r-box {
        display: flex;
        flex-direction: column;
        width: 153px;
        height: 96px;
        margin-left: 18px;
        .li {
          margin-top: 4px;
          font-family:PingFang SC;
          font-weight:500;
          color:#1a3378;
          font-size:12.92px;
          line-height:24px;
          .sort {
            width:17.53px;
            height:17.54px;
            background-image:linear-gradient(180deg,#f47d77 0%,#da3326 100%);
            border-radius: 50%;
            line-height: 17.54px;
            text-align: center;
            font-family:PingFang SC;
            font-weight:500;
            color:#ffffff;
            font-size:12px;
            margin-right: 5.54px;
          }
          .sort-null {
            opacity: 0;
          }
        }
        .li:nth-child(1) {
          margin-top: 0;
        }
      }
    }
  }
  .item-box2 {
    margin-top: 34.32px;
  }
  .z-index {
    margin-top: 34.32px;
    z-index: 4;
    margin-bottom: 33px;
  }
  .last-box {
    margin: 0 auto;
    margin-top: 16px;
    margin-bottom: 14px;
    padding: 18px;
    width: 351px;
    height: 326px;
    background-color:#ffffff;
    border:3px solid;
    border-color:#f6c78c;
    border-radius:8px;
    box-shadow:0px 2px 4px rgba(226, 197, 167, 0.27),0px 0px 3px #845c34 inset;
    .stag {
      margin-top: 28px;
      font-family:PingFang SC;
      font-weight:600;
      color:#5a2629;
      font-size:16px;
      line-height:22px;
      span {
        display: inline-block;
        margin-right: 6px;
        width: 18px;
        height: 18px;
        background-color:#f0a03c;
        border-radius: 50%;
        text-align: center;
        line-height: 18px;
      }
    }
    .stag:nth-child(1) {
      margin-top: 0;
    }
    .sub {
      margin-top: 10px;
      font-family:PingFang SC;
      color:#5a2629;
      font-size:12px;
      letter-spacing:0.5px;
      line-height:17px;
      span {
        display: inline-block;
        margin-right: 6px;
        width:6px;
        height:6px;
        border-radius: 50%;
        background-color:#ef9f3c;
      }
    }
  }
  .cushions {
    width: 100%;
    height: 104px;
  }
  .button-box {
    position: fixed;
    bottom: 0px;
    text-align: center;
    margin: 0 auto;
    width: 100%;
    height: 104px;
    background-color:#f8d7ab;
    z-index: 11;
  }
</style>

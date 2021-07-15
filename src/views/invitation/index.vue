<template>
  <div class="store-in">
    <div class="text-box"
      :style="{
        'background-image': `url('${getImgUrl('publicMobile/invitation/text.png')}')`
      }"
    >
      用户135****7710成功邀请1位好友成为店主！
    </div>
    <van-image
      class="banner"
      width="100%"
      :src="getImgUrl('publicMobile/invitation/b.png')"
    />
    <div class="content-box">
      <van-image
        class="img-title"
        width="246px"
        height="30px"
        :src="getImgUrl('publicMobile/invitation/t.png')"
      />

    <div class="item-box">
      <van-image
        class="link-l"
        width="10px"
        :src="getImgUrl('publicMobile/invitation/border.png')"
      />
      <van-image
        class="link-r"
        width="10px"
        :src="getImgUrl('publicMobile/invitation/border.png')"
      />
      <div class="title-box">
        <van-image
          class="title-img"
          width="196px"
          height="33px"
          :src="getImgUrl('publicMobile/invitation/item-title.png')"
        />
        <span class="span-text">邀请好友奖励</span>
      </div>
      <div class="content">
        <div class="item-img-box">
          <van-image
            class="item-img"
            width="100%"
            :src="getImgUrl('publicMobile/invitation/item.png')"
          />
        </div>
      </div>
    </div>
    <div class="item-box item-box2">
      <div class="content2">
        <p class="sub-title">生成我的专属邀请海报</p>
        <div class="center">
          <span class="l-s">邀请码:9WWM5KHG</span>
          <span class="r-s">复制</span>
        </div>
        <div class="now-button">立即邀请</div>
      </div>
    </div>
    <div class="item-box item-box3">
      <div class="content3">
        <div class="center-box">
          <div class="sub-title">
            <div>我的邀请</div>
            <div class="right-top-btn-box">
              <p>查看全部</p>
              <van-image
                width="12px"
                height="12px"
                :src="getImgUrl('publicMobile/invitation/r.png')"
              />
            </div>
          </div>
          <div class="center">
            <p><span>40</span>元</p>
            <p>已邀请<span>56</span>位新用户，累计获得佣金</p>
          </div>
          <div class="now-button">邀请好友一起领取</div>
        </div>
      </div>
    </div>
    <div class="item-box item-box4">
      <div class="title-box">
        <van-image
          class="title-img"
          width="182px"
          height="33px"
          :src="getImgUrl('publicMobile/invitation/item-title.png')"
        />
        <span class="span-text">邀请步骤</span>
      </div>
      <div class="content4">
        <p>
          <span>1.</span>可以直接复制邀请码给好友下载APP注册填写。
        </p>
        <p>
          <span>2.</span>海报中的二维码已经包含您的邀请信息。
        </p>
        <p>
          <span>3.</span>好友通过您的邀请码或者邀请海报注册会员并下载APP。
        </p>
      </div>
    </div>


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
    };
  },
  components: {
  },
  created () {
  },
  methods: {
    getImgUrl,
    onToDetail() {
      const {
        good,
      } = this;
      console.log(window.navigator)
      console.log("$store.state.appInfo", this.$store.state.appInfo)
      if (this.$store.state.appInfo.isApp) {
        this.$bridge.callHandler(
          'router',
          `${appBaseUrl}/flutter/store/member/settled`,
        )
      } else if (this.$store.state.appInfo.isMiniprogram) {
        const paramStr = `?orderType=${good.orderType || 3}&spuId=${good.spuId || ''}&objectId=${good.objectId || ''}&activityId=${good.activityId || ''}&skuId=${good.skuId || ''}&wsId=${good.wsId || ''}`
        wx.miniProgram.navigateTo({
          url: `/subpages/cart/detail/index${paramStr}`
        })
      } else {
        console.log('不是App内')
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.menu)
  },
};
</script>

<style lang="scss" scoped>
  .store-in {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color:#f8d77e;
    position: relative;
    .text-box {
      position: absolute;
      top: 120px;
      left: 50%;
      width: 295px;
      height: 36px;
      transform: translateX(-50%);
      z-index: 2;
      background-size: 100% 100%;
      font-family:PingFang SC;
      font-weight:500;
      color:#ffffff;
      font-size:12px;
      line-height:36px;
      text-align:center;
    }
    .content-box {
      position: relative;
      width: 100%;
      top: -67px;
      .img-title {
        position: relative;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
  .banner {
    margin-bottom: 17px;
  }
  .item-box {
    position: relative;
    margin: 0 auto;
    margin-top: 16px;
    width:352px;
    height:444px;
    background-color:#ff7c34;
    border-radius:8px;
    box-shadow:0px 2px 4px rgba(226, 197, 167, 0.27),0px 0px 3px #fbe1c7 inset;
    .link-l {
      position: absolute;
      left: 20px;
      bottom: -38px;
      width: 8px;
      height: 61px;
      z-index: 9;
    }
    .link-r {
      position: absolute;
      right: 20px;
      bottom: -38px;
      width: 8px;
      height: 61px;
      z-index: 9;
    }
    .title-box {
      position: absolute;
      top: 0px;
      left: 50%;
      transform: translate(-50%);
      width: 196px;
      height: 33px;
      text-align: center;
      .span-text {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        font-family:PingFang SC;
        font-weight:600;
        color:#8d5328;
        font-size:16px;
        line-height:33px;
        text-align:center;
      }
    }
    .content {
      padding: 45px 0 30px 0;
      display: flex;
      justify-content: center;
      .item-img-box {
        width: 340px;
        height: 371px;
        overflow: hidden;
      }
    }
    .content2 {
      position: absolute;
      top: 34px;
      left: 50%;
      transform: translate(-50%);
      width:328px;
      height:188px;
      background-color:#ffffff;
      border-radius:4px;
      .sub-title {
        width: 100%;
        height: 52px;
        background-color:#fff8e6;
        font-family:PingFang SC;
        font-weight:500;
        color:#8d5328;
        font-size:24px;
        line-height:52px;
        text-align:center;
      }
      .center {
        padding-top: 15px;
        padding-bottom: 22px;
        display: flex;
        justify-content: space-between;
        .l-s {
          padding-left: 27px;
          font-family:PingFang SC;
          color:#a56545;
          font-size:16px;
          line-height:22px;
          text-align:center;
        }
        .r-s {
          margin-right: 18px;
          width:56px;
          height:23px;
          background-color:#ffffff;
          border:0.69px solid;
          font-family:PingFang SC;
          color:#fd1101;
          font-size:12px;
          line-height:23px;
          text-align:center;
          border-radius:14px;
        }
      }
    }
    .content3 {
      position: absolute;
      top: 18px;
      left: 50%;
      transform: translate(-50%);
      width:328px;
      height:234px;
      background-color:#ffffff;
      border-radius:4px;
    }
    .content4 {
      padding: 16px 12px;
      position: absolute;
      top: 49px;
      left: 50%;
      transform: translate(-50%);
      width:328px;
      height:132px;
      background-color:#ffffff;
      border-radius:4px;

      font-family:PingFang SC;
      color:#8d5328;
      font-size:13px;
      padding-bottom:12px;
      line-height:18px;
      p {
        margin-bottom: 14px;
      }
    }
  }
  .item-box2 {
    height:246px;
  }
  .item-box3 {
    height: 276px;
  }
  .item-box4 {
    height: 205px;
    margin-bottom: 33px;
  }
</style>

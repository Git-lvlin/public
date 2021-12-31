<template>
  <div class="create-downlaod" id="openAppBox">
    <div class="down-box">
      <!-- <div class="join-num">已有36510人参与</div> -->
      <img class="down-back" :src="getImgUrl('publicMobile/build_download/create_down_back.png?v=20211231')" />
      <div class="btn-box">
        <img class="btn-icon" @click="onOpenApp" :src="getImgUrl('publicMobile/build_download/open_btn.png')" />
        <img class="btn-icon" @click="onOpenApp" :src="getImgUrl('publicMobile/build_download/down_btn.png')" />
        <div class="btn-title">
          <span class="red_text">约购</span>APP&nbsp;约着买&nbsp;更便宜
        </div>
      </div>
    </div>
    <div class="down-desc text-center">物美价廉有温度</div>
    <div class="line" />
    <div class="info-list">
      <div class="info-item">
        <img class="info-icon" :src="getImgUrl('publicMobile/build_download/create_coupon.png')" />
        <div class="info-text">
          <div class="info-text-title">
            <span>约着买&nbsp;</span>
            <span class="red_text">更省心</span>
          </div>
          <div class="info-text-desc">品牌直供&nbsp;质量保障</div>
        </div>
      </div>
      <div class="info-item">
        <img class="info-icon" :src="getImgUrl('publicMobile/build_download/create_money.png')" />
        <div class="info-text">
          <div class="info-text-title">
            <span>轻创业&nbsp;</span>
            <span class="red_text">低成本</span>
          </div>
          <div class="info-text-desc">约购模式&nbsp;创富首选</div>
        </div>
      </div>
    </div>
    <div class="bottom-down-back">
      <div class="bottom-down">
        <img class="logo" :src="getImgUrl('publicMobile/common/logo.png')" />
        <div class="bottom-info">约购-约着买更便宜</div>
        <img class="bottom-btn" @click="onOpenApp" :src="getImgUrl('publicMobile/build_download/create_down.png')" />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Image } from 'vant';
import CallApp from 'callapp-lib';
import { getImgUrl } from '@/utils/tools';
import { DOWNLOAD_ANDROID, DOWNLOAD_IOS } from '@/constant/common';

export default {
  data() {
    return {
      listClass: {
        "join-list": true,
      }
    };
  },
  components: {
    Image,
  },
  mounted () {
    // this.onOpenApp();
  },
  methods: {
    getImgUrl,
    onOpenApp() {
      console.log("🚀 ~ this.$store.state.appInfo", this.$store.state.appInfo)
      if (this.$store.state.appInfo.isApp || this.$store.state.appInfo.isMiniprogram) {
        return;
      }
      const options = {
        scheme: {
          //URL Scheme 的 scheme 字段，要打开的 APP 的标识
          protocol: 'yeahgo'
        },
        //安卓原生谷歌浏览器必须传递 Intent 协议地址，才能唤起 APP
        intent: {
          // APP包名
          package: 'com.hznt.yeahgo',
          scheme: 'yeahgo'
        },
        timeout: '5000',
        //APP 的 App Store
        appstore: DOWNLOAD_IOS,
        //APP 的应用宝地址，
        yingyongbao: DOWNLOAD_ANDROID,
        //唤端失败后跳转的地址。
        // fallback: ""
      };
      const callLib = new CallApp(options);
      // ${appUrl}?url=
      const appUrl = 'https://www.yeahgo.com/web/index';
      let h5Url = 'https://publicmobile-dev.yeahgo.com/web/polite-invitation?couponInviteId=1';
      callLib.open({
        path: "",
        //要传递的参数
        param: {
          parameter: `${h5Url}`,
        },
      })
    },
  },
};
</script>

<style lang="scss" scoped>
  .create-downlaod {
    min-height: 100vh;
    background-color: #FFE0C1;
  }

  .down-box {
    position: relative;
    width: 100%;
  }

  .join-num {
    position: absolute;
    top: 108px;
    left: 0;
    width: 100%;
    font-size: 12px;
    color: #FFE0C1;
    text-align: center;
  }

  .down-back {
    width: 100%;
  }

  .btn-box {
    position: absolute;
    bottom: 1px;
    left: 0;
    z-index: 2;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  
  .btn-icon {
    width: 193px;
    height: 48px;
    margin-bottom: 14px;
  }

  .btn-title {
    font-size: 18px;
    font-weight: 600;
    color: #333;
    line-height: 25px;
    padding-top: 18px;
  }

  .red_text {
    color: #FF1700;
  }

  .gray_text {
    color: #8691A5;
  }

  .text-center {
    text-align: center;
  }

  .down-desc {
    font-size: 12px;
    color: #666666;
    line-height: 17px;
    margin-top: 5px;
  }

  .line {
    width: 26px;
    height: 4px;
    margin: 28px auto 24px;
    background: linear-gradient(90deg, #FA1400 0%, #FF784C 100%);
  }

  .info-list {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  
  .info-item {
    display: flex;
    align-items: center;
    padding-bottom: 24px;
  }

  .info-icon {
    width: 60px;
    height: 60rpx;
    margin-right: 22px;
  }

  .info-text-title {
    font-size: 16px;
    font-weight: 600;
    color: #000000;
    line-height: 22px;
    margin-bottom: 4px;
  }

  .info-text-desc {
    font-size: 14px;
    color: #666666;
    line-height: 20px;
  }

  .bottom-down-back {
    height: 100px;
  }
  
  .bottom-down {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 6;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100px;
    padding: 0 14px 24px;
    background-color: #fff;
  }

  .logo {
    width: 56px;
    height: 56px;
  }

  .bottom-info {
    flex: 1;
    font-size: 17px;
    font-weight: 600;
    color: #000000;
    line-height: 24px;
    margin-left: 8px;
  }

  .bottom-btn {
    width: 113px;
    height: 42px;
  }

</style>

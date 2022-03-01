<template>
  <div class="container">
    <van-image
      class="banner"
      width="100%"
      height="270px"
      :src="getImgUrl('publicMobile/fresh/banner.png')"
    />
    <div class="rule-btn" @click="lookRule">规则</div>
    <div class="title"
      :style="{
        'background-image': `url('${getImgUrl('publicMobile/fresh/title-bg.png')}')`
      }"
    >
      <div class="title-text">今日特价生鲜活动仅限自提</div>
    </div>
    <div class="list-box">
      <div class="item" v-for="(item, index) in list" :key="index">
        <van-image
          class="item-img"
          width="100%"
          :src="item.src"
        />
        <div class="name">{{item.name}}</div>
        <div class="price">
          <span class="l">¥<span class="l-index">{{item.price}}</span></span>
          <span class="r">¥{{item.price}}</span>
        </div>
        <div class="num">已售{{item.num}}</div>
      </div>
    </div>
    <div class="bottom">-没有更多商品了-</div>
    <div class="cushion"></div>
    <!-- 活动规则弹窗 -->
    <van-popup
      v-model="showPopup"
      closeable
      position="bottom"
      round
      :style="{ height: '506px' }"
    >
      <div class="rule-div">
        <div class="title">今日特价生鲜规则</div>
        <textarea class="content" readonly v-model="ruleText"></textarea>
      </div>
    </van-popup>
  </div>
</template>

<script>
import Vue from 'vue';
import { Image as VanImage, Popup } from 'vant';
import { getImgUrl } from '@/utils/tools';
import CallApp from 'callapp-lib';
import { DOWNLOAD_ANDROID, DOWNLOAD_IOS } from '@/constant/common';
import teamApi from '@/apis/newshare';
Vue.use(VanImage);
Vue.use(Popup);
export default {
  data() {
    return {
      list: [
        {
          name: '1111',
          price: '123.2',
          src: getImgUrl('publicMobile/fresh/title-bg.png'),
          num: '123'
        },
        {
          name: '1111',
          price: '123.2',
          src: getImgUrl('publicMobile/fresh/title-bg.png'),
          num: '123'
        },
        {
          name: '1111',
          price: '123.2',
          src: getImgUrl('publicMobile/fresh/title-bg.png'),
          num: '123'
        },
        {
          name: '1111',
          price: '123.2',
          src: getImgUrl('publicMobile/fresh/title-bg.png'),
          num: '123'
        },
      ],
      ruleText: null,
      showPopup: false,
      activityType: true,
    };
  },
  components: {
  },
  created () {
  },
  mounted() {
    // const {
    //   query,
    // } = this.$router.history.current;
    // this.inviteCode = query.inviteCode
    // this.url = query.url || ''
    // this.type = query.type || 0
    // const ua = window.navigator.userAgent.toLowerCase();
    // if(ua.match(/MicroMessenger/i) == 'micromessenger' || ua.match(/_SQ_/i) == '_sq_') {
    //   this.isWeixin = query.isWeixin || 0
    // }
  },
  methods: {
    lookRule() {
      this.showPopup = true
    },
    onOpenApp() {
      console.log("🚀 ~ this.$store.state.appInfo", this.$store.state.appInfo)
      if (this.$store.state.appInfo.isApp || this.$store.state.appInfo.isMiniprogram) {
        return;
      }
      console.log('DOWNLOAD_ANDROID', DOWNLOAD_ANDROID);
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
        timeout: '3000',
        //APP 的 App Store
        appstore: DOWNLOAD_IOS,
        //APP 的应用宝地址，
        yingyongbao: DOWNLOAD_ANDROID,
        fallback: DOWNLOAD_ANDROID,
      };
      const callLib = new CallApp(options);
      // const h5Url = `${meBaseUrl}/web/polite-animation?_authorizationRequired=1`;
      callLib.open({
        path: "",
        //要传递的参数
        param: {
          parameter: `${this.url || ''}`,
        }
      })
    },
    hasWx() {
      this.show = 0;
      const ua = window.navigator.userAgent.toLowerCase();
      if(ua.match(/MicroMessenger/i) == 'micromessenger' || ua.match(/_SQ_/i) == '_sq_'){
        window.location.href += `&type=${this.type}&isWeixin=${1}`
        return
      } else {
        this.onOpenApp()
      }
      // window.location.href = `https://publicmobile.yeahgo.com/web/transfer`;
    },
    getImgUrl,
  },
};
</script>

<style lang='scss' scoped>

.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #EE3912;
  position: relative;
}
.rule-btn {
  position: absolute;
  top: 12px;
  right: -2px;
  width: 38px;
  height: 18px;
  background: #FFFFFF;
  border-top-left-radius: 9px;
  border-bottom-left-radius: 9px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #EE3912;
  text-align: center;
  line-height: 18px;
}
.title {
  margin: 0 auto;
  margin-top: 8px;
  margin-bottom: 13px;
  width: 175px;
  height: 31px;
  background-size: 100% 100%;
  .title-text {
    text-align: center;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 31px;
    z-index: 2;
  }
}

.list-box {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0 12px;
  .item {
    display: flex;
    flex-direction: column;
    width: 172px;
    height: 262px;
    background: #FFFFFF;
    border-radius: 8px;
    overflow: hidden;
    .item-img {
      width: 100%;
      height: 172px;
      overflow: hidden;
    }
    .name {
      margin-top: 12px;
      margin-bottom: 8px;
      margin-left: 8px;
      width: 156px;
      height: 19px;
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #333333;
      line-height: 20px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .price {
      display: flex;
      justify-content: flex-start;
      align-items: flex-end;
      line-height: 21px;
      .l {
        display: inline-block;
        margin-left: 8px;
        color: #D7291D;
        font-size: 12px;
        font-family: DINAlternate-Bold, DINAlternate;
        font-weight: bold;
        .l-index {
          font-size: 18px;
        }
      }
      .r {
        display: inline-block;
        text-decoration: line-through;
        margin-left: 4px;
        font-size: 12px;
        font-family: DINAlternate-Bold, DINAlternate;
        font-weight: bold;
        color: #B2B2B2;
      }
    }
    .num {
      margin-left: 8px;
      height: 17px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #B2B2B2;
      line-height: 17px;
    }
  }
  .item:nth-child(odd) {
    margin-bottom: 8px;
    margin-right: 7px;
  }
  .item:nth-child(even) {
    margin-bottom: 8px;
  }
}

.bottom {
  margin-top: 30px;
  text-align: center;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #FFFFFF;
}
.cushion {
  width: 100%;
  height: 71px;
}
.rule-div {
  width: 100%;
  height: 482px;
  overflow: hidden;
  .title {
    padding-top: 24px;
    padding-bottom: 32px;
    height: 26px;
    font-size: 19px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 26px;
    text-align: center;
  }
  .content {
    width: 100%;
    height: 440px;
    border: none;
    padding: 32px 16px 50px 16px;
    text-align: justify;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #666666;
    line-height: 22px;
    overflow: hidden;
    overflow-y: auto;
  }
}
</style>

<template>
  <div class="container" :class="storeNo?'fd':''">
    <div class="rule-btn" @click="lookRule">规则</div>
    <div class="box1" v-if="storeNo">
      <van-image
        class="banner"
        width="100%"
        height="270px"
        :src="getImgUrl('publicMobile/fresh/banner.png')"
      />
      <div class="title"
        :style="{
          'background-image': `url('${getImgUrl('publicMobile/fresh/title-bg.png')}')`
        }"
      >
        <div class="title-text">今日特价生鲜活动仅限自提</div>
      </div>
      <div class="list-box">
        <div class="item" @click="toDetail(item)" v-for="(item, index) in list" :key="index">
          <van-image
            class="item-img"
            width="100%"
            :src="item.imageUrl"
          />
          <div class="item-img-mask" v-if="!item.stockNum">
            <div class="item-img-mask-text">已售罄</div>
          </div>
          <div class="name" :class="!item.stockNum?'disable-color':''">{{item.goodsName}}</div>
          <div class="price">
            <span class="l" :class="!item.stockNum?'disable-color':''">¥<span class="l-index">{{item.salePrice/100}}</span></span>
            <span class="r">¥{{item.marketPrice/100}}</span>
          </div>
          <div class="num">{{item.goodsSaleNumStr}}</div>
        </div>
      </div>
      <div class="bottom">-没有更多商品了-</div>
      <div class="cushion"></div>
    </div>

    <div class="box2" v-else>
      <van-image
        class="banner2"
        width="100%"
        height="100%"
        :src="getImgUrl('publicMobile/fresh/banner2.png')"
      />
      <!-- <van-image
        v-if="this.storeNo"
        class="over"
        width="200px"
        height="40px"
        :src="getImgUrl('publicMobile/fresh/over.png')"
      /> -->
      <!-- <van-image
        v-if="!this.storeNo"
        class="go-btn"
        width="200px"
        height="40px"
        :src="getImgUrl('publicMobile/fresh/go.png')"
        @click="outPage"
      /> -->
      <van-image
        v-if="!this.storeNo"
        class="download-btn"
        width="200px"
        height="40px"
        :src="getImgUrl('publicMobile/fresh/download.png')"
        @click="outPage"
      />
    </div>

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
import { appBaseUrl, meBaseUrl } from "@/constant/index";
import { DOWNLOAD_ANDROID, DOWNLOAD_IOS } from '@/constant/common';
import teamApi from '@/apis/fresh';
import {
  goToApp,
  setNavigationBar,
} from '@/utils/userInfo';
Vue.use(VanImage);
Vue.use(Popup);
export default {
  data() {
    return {
      list: [],
      ruleText: null,
      showPopup: false,
      activityType: 1,
      storeNo: null,
      url: null,
      config: null,
      inviteCode: '',
    };
  },
  components: {
  },
  created () {
    const rightButton = {
      type: 'share',
      object: {
        contentType: 14,
        paramId: 15,
        shareType: 3,
        sourceType: 13,
      }
    };
    const titleLabel = {
      titleLabelColor: '', // 暂时不会传
      font: '', // 暂时不会传
      text: '', // 默认documenttitle
    };
    setNavigationBar('#FFFFFF', rightButton, titleLabel);
    // await this.getUserInfo();
  },
  mounted() {
    const {
      query,
    } = this.$router.history.current;
    this.inviteCode = query.inviteCode || '';
    this.storeNo = query.storeNo
    this.url = meBaseUrl + '/web/special-offer-fresh?_immersive=0&_authorizationRequired=1'
    console.log('url', this.url)
    this.getListData()
  },
  methods: {
    download() {
      const u = window.navigator.userAgent;
      console.log('u', u)
      const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
      const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
        //这个是安卓操作系统
        window.location.href = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.hznt.yeahgo';
      }
      if (isIOS) {
    　　//这个是ios操作系统
        window.location.href = 'itms-apps://itunes.apple.com/app/id1556552939?action=write-review';
      }
    },
    outPage() {
      this.$router.push({
        path: '/web/new-share',
        query: {
          inviteCode: this.inviteCode
        },
      });
    },
    toDetail(item) {
      if (item.stockNum<1) {
        return
      }
      const { skuId, spuId, orderType, activityId, objectId } = item;
      const param = `?skuId=${skuId}&spuId=${spuId}&orderType=${orderType}&activityId=${activityId}&objectId=${objectId}`;
      goToApp(appBaseUrl, '/shopping/detail', param)
    },
    getListData() {
      const param = {
        storeNo: this.storeNo,
        page: 1,
        size: 99,
      }
      teamApi.getList(param).then((res) => {
        this.list = res.data.records
        this.config = res.data.config
        this.ruleText = this.config.ruleText
        this.activityType = this.config.activityStatus
      })
    },
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
.fd {
  background-color: #FD773E;
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
  z-index: 3;
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
  justify-content: flex-start;
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
    position: relative;
    .item-img {
      width: 100%;
      height: 172px;
      overflow: hidden;
    }
    .item-img-mask {
      position: absolute;
      top: 0;
      width: 100%;
      height: 172px;
      overflow: hidden;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .item-img-mask-text {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      line-height: 100px;
      background: rgba(0, 0, 0, 0.5);
      font-size: 20px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #FFFFFF;
      text-align: center;
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
    .disable-color {
      color: #999999 !important;
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

.box2 {
  position: relative;
  .over {
    position: absolute;
    top: 489px;
    left: 50%;
    transform: translate(-50%);
  }
  .go-btn {
    position: absolute;
    top: 460px;
    left: 50%;
    transform: translate(-50%);
  }
  .download-btn {
    position: absolute;
    top: 524px;
    left: 50%;
    transform: translate(-50%);
  }
}

</style>

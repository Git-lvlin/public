<template>
  <div class="container">
    <div class="rule-btn" @click="lookRule">规则</div>
    <div class="box1" v-if="storeNo">
      <van-image
        class="banner"
        width="100%"
        height="274px"
        :src="getImgUrl('publicMobile/fresh/banner-green.png')"
      />
      <div class="list-box" v-if="list.length">
        <div class="item" @click="toDetail(item)" v-for="(item, index) in list" :key="index">
          <div class="img-box">
            <van-image
              class="item-img"
              width="100%"
              :src="item.imageUrl"
            />
            <div class="item-img-mask" v-if="!item.stockNum">
              <div class="item-img-mask-text">已售罄</div>
            </div>
          </div>
          <div class="right-box">
            <div class="name van-multi-ellipsis--l2" :class="!item.stockNum?'disable-color':''">{{item.goodsName}}</div>
            <div class="num">{{item.goodsSaleNumStr}}</div>
            <div class="price">
              <span class="l" :class="!item.stockNum?'disable-color':''">¥<span class="l-index">{{item.salePrice/100}}</span></span>
              <span class="r">¥{{item.marketPrice/100}}</span>
            </div>
          </div>
          <div class="btn" v-if="!item.stockNum">立即抢购</div>
        </div>
      </div>
      <div class="bottom" v-if="list.length">-没有更多商品了-</div>
      <div class="cushion" v-if="list.length"></div>

      <div class="null" v-if="!list.length">
        <van-image
          class="null-icon"
          width="288px"
          height="239px"
          :src="getImgUrl('publicMobile/fresh/null.png')"
        />
        <div class="null-text">商品已抢光啦，下次早点来喔～</div>
      </div>
    </div>

    <div class="box2" v-else>
      <van-image
        class="banner2"
        width="100%"
        height="100%"
        :src="getImgUrl('publicMobile/fresh/banner2-green.png')"
      />
      <!-- <van-image
        v-if="this.storeNo"
        class="over"
        width="200px"
        height="40px"
        :src="getImgUrl('publicMobile/fresh/over.png')"
      /> -->
      <van-image
        class="go-btn"
        width="200px"
        height="40px"
        :src="getImgUrl('publicMobile/fresh/go-green.png')"
        @click="outPage"
      />
      <van-image
        class="download-btn"
        width="200px"
        height="40px"
        :src="getImgUrl('publicMobile/fresh/download-green.png')"
        @click="download"
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
        <div class="title">活动规则</div>
        <textarea class="content" readonly v-model="ruleText"></textarea>
      </div>
    </van-popup>
  </div>
</template>

<script>
import Vue from 'vue';
import { Image as VanImage, Popup } from 'vant';
import { getImgUrl } from '@/utils/tools';
// import CallApp from 'callapp-lib';
import { appBaseUrl, meBaseUrl } from "@/constant/index";
// import { DOWNLOAD_ANDROID, DOWNLOAD_IOS } from '@/constant/common';
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
        contentType: 15,
        paramId: 16,
        shareType: 3,
        sourceType: 14,
      }
    };
    const titleLabel = {
      titleLabelColor: '', // 暂时不会传
      font: '', // 暂时不会传
      text: '', // 默认documenttitle
    };
    setNavigationBar('#FFFFFF', rightButton, titleLabel);
  },
  mounted() {
    const {
      query,
    } = this.$router.history.current;
    this.inviteCode = query.inviteCode || '';
    this.storeNo = query.storeNo;
    this.url = meBaseUrl + '/web/one?_immersive=0&_authorizationRequired=1';
    this.getListData()
  },
  methods: {
    download() {
      const u = window.navigator.userAgent;
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
      if (item.stockNum==0) {
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
      teamApi.getOneList(param).then((res) => {
        this.list = res.data.records
        this.config = res.data.config
        this.ruleText = this.config.ruleText
      })
    },
    lookRule() {
      this.showPopup = true
    },
    // onOpenApp() {
    //   console.log("🚀 ~ this.$store.state.appInfo", this.$store.state.appInfo)
    //   if (this.$store.state.appInfo.isApp || this.$store.state.appInfo.isMiniprogram) {
    //     return;
    //   }
    //   console.log('DOWNLOAD_ANDROID', DOWNLOAD_ANDROID);
    //   const options = {
    //     scheme: {
    //       //URL Scheme 的 scheme 字段，要打开的 APP 的标识
    //       protocol: 'yeahgo'
    //     },
    //     //安卓原生谷歌浏览器必须传递 Intent 协议地址，才能唤起 APP
    //     intent: {
    //       // APP包名
    //       package: 'com.hznt.yeahgo',
    //       scheme: 'yeahgo'
    //     },
    //     timeout: '3000',
    //     //APP 的 App Store
    //     appstore: DOWNLOAD_IOS,
    //     //APP 的应用宝地址，
    //     yingyongbao: DOWNLOAD_ANDROID,
    //     fallback: DOWNLOAD_ANDROID,
    //   };
    //   const callLib = new CallApp(options);
    //   // const h5Url = `${meBaseUrl}/web/polite-animation?_authorizationRequired=1`;
    //   callLib.open({
    //     path: "",
    //     //要传递的参数
    //     param: {
    //       parameter: `${this.url || ''}`,
    //     }
    //   })
    // },
    getImgUrl,
  },
};
</script>

<style lang='scss' scoped>

.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #2F9200;
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
  color: #2F9200;
  text-align: center;
  line-height: 18px;
  z-index: 3;
  border: 1px solid #2F9200;
}
.title {
  margin: 0 auto;
  margin-top: 16px;
  margin-bottom: 16px;
  width: 120px;
  height: 28px;
  line-height: 28px;
  border-radius: 14px;
  border: 1px solid #FFFFFF;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #FFFFFF;
  text-align: center;
}

.list-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 9px;
  .item {
    position: relative;
    margin-bottom: 12px;
    padding: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 351px;
    height: 114px;
    background: #FFFFFF;
    border-radius: 12px;
    overflow: hidden;
    .btn {
      position: absolute;
      bottom: 16px;
      right: 12px;
      width: 80px;
      height: 24px;
      background: linear-gradient(270deg, #FF3333 0%, #FF6161 100%);
      border-radius: 12px;
      font-size: 13px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #FFFFFF;
      line-height: 24px;
      text-align: center;
    }
    .img-box {
      position: relative;
      width: 90px;
      height: 90px;
      border-radius: 4px;
      overflow: hidden;
      .item-img {
        width: 100%;
        height: 100%;
      }
      .item-img-mask {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .item-img-mask-text {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        line-height: 60px;
        background: rgba(0, 0, 0, 0.5);
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        text-align: center;
      }
    }
    .right-box {
      margin-left: 12px;
      display: flex;
      flex-direction: column;
      width: 229px;
    }
    .name {
      margin-bottom: 12px;
      width: 229px;
      height: 40px;
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #333333;
      line-height: 20px;
    }

    .price {
      display: flex;
      justify-content: flex-start;
      align-items: flex-end;
      line-height: 21px;
      .l {
        display: inline-block;
        height: 21px;
        line-height: 21px;
        color: #E5352F;
        font-size: 10px;
        font-family: DINAlternate-Bold, DINAlternate;
        font-weight: bold;
        .l-index {
          font-size: 16px;
        }
      }
      .r {
        display: inline-block;
        text-decoration: line-through;
        height: 21px;
        line-height: 21px;
        margin-left: 8px;
        font-size: 12px;
        font-family: DINAlternate-Bold, DINAlternate;
        font-weight: bold;
        color: #999999;
      }
    }
    .disable-color {
      color: #999999 !important;
    }
    .num {
      height: 16px;
      font-size: 11px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 16px;
    }
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

.null {
  margin: 0 auto;
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 351px;
  height: 361px;
  background: #FFFFFF;
  border-radius: 12px;
  .null-text {
    font-size: 13px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 19px;
  }
}
</style>

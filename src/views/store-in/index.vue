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
          <div class="li"><span class="sort">01</span>集中采购</div>
          <div class="li"><span class="sort">02</span>利润直返</div>
          <div class="li"><span class="sort">03</span>众多知名品牌</div>
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
          <div class="li"><span class="sort">01</span>品牌厂家</div>
          <div class="li"><span class="sort">02</span>直供好货</div>
          <div class="li"><span class="sort">03</span>品质保证</div>
          <div class="li"><span class="sort">04</span>买得放心</div>
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
        <span class="span-text">优势三:低成本 赚更多</span>
      </div>
      <div class="content">
        <van-image
          width="147px"
          height="117px"
          :src="getImgUrl('publicMobile/store/item-img3.png')"
        />
        <div class="r-box">
          <div class="li"><span class="sort">01</span>低成本 囤货少 低风险</div>
          <div class="li"><span class="sort">02</span>高提成 高补贴 高收入</div>
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
        <span class="span-text">优势四:有温度 超服务</span>
      </div>
      <div class="content">
        <van-image
          width="147px"
          height="117px"
          :src="getImgUrl('publicMobile/store/item-img4.png')"
        />
        <div class="r-box">
          <div class="li"><span class="sort">01</span>社区集约 免费加盟</div>
          <div class="li"><span class="sort">02</span>专业服务 无忧入驻</div>
          <div class="li"><span class="sort">03</span>秒建超级群 最高2000人</div>
        </div>
      </div>
    </div>
    <div class="title" v-if="res">
      <van-image
        width="17px"
        height="13px"
        :src="getImgUrl('publicMobile/store/title-l.png')"
      />
      <span class="title-text">店主故事</span>
      <van-image
        width="17px"
        height="13px"
        :src="getImgUrl('publicMobile/store/title-r.png')"
      />
    </div>
    <div class="shopkeeper-box" v-if="res">
      <div class="shopkeeper-div" >
        <div class="shopkeeper-top">
          <van-image
            class="logo"
            width="74px"
            height="74px"
            :src="res.logo"
          />
          <div class="logo-right">
            <div class="shopkeeper-title">{{res.storeUserName}}</div>
            <div class="shopkeeper-name"><span></span>{{res.storeName}}</div>
          </div>
        </div>
        <div class="shopkeeper-border"></div>
        <div class="shopkeeper-bottom">{{res.storeStory}}</div>
      </div>
    </div>

    <div class="title">
      <van-image
        width="17px"
        height="13px"
        :src="getImgUrl('publicMobile/store/title-l.png')"
      />
      <span class="title-text">仅需四步成为社区店主</span>
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
      <div class="stag"><span>3</span>获得社区店主资格</div>
      <div class="sub"><span></span>获得社区店主资格,店铺在线装修</div>
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
import Vue from "vue";
import { Image as VanImage } from "vant";
import { getImgUrl } from "@/utils/tools";
import { appBaseUrl, meBaseUrl } from "@/constant/index";
import { goToApp, judgeVersionIsNew } from "@/utils/userInfo";
import api from '@/apis/storein';
Vue.use(VanImage);
export default {
  props: {},
  data() {
    return {
      isShow: false,
      hasToken: false,
      isNewVersion: false,
      newShare: 0,
      res: null,
    };
  },
  components: {},
  created() {
    console.log("created", this.$store.state.appInfo);
    this.isNewVersion = judgeVersionIsNew(this.$store.state.appInfo.appVersion);
    console.log("isNewVersion", this.isNewVersion);
    if (this.isNewVersion) {
      return;
    } else {
      console.log("老版本");
      this.$bridge.callHandler("fetchToken", {}, (a) => {
        if (a && a.length) {
          this.hasToken = true;
        }
      });
    }
  },
  mounted() {
    const {
      query
    } = this.$router.history.current;
    if(query.newShare) {
      // 5星店主活动
      this.newShare = 1
    }
    this.getInitData()
  },
  methods: {
    getImgUrl,
    getInitData() {
      api.getData().then((res) => {
        console.log('res', res)
        this.res = res.data
      })
    },
    getUserInfo() {
      return new Promise((resolve) => {
        this.$bridge.callHandler("getUserInfo", {}, (res) => {
          const d = JSON.parse(res);
          this.hasToken = d.data.accessToken ? true : false;
          resolve();
        });
      });
    },
    async onToDetail() {
      if (this.newShare) {
        // 5星店主活动特殊跳转
        goToApp(meBaseUrl, '/web/new-share', '', this.$bridge)
        return
      }
      console.log("onToDetail");
      if (this.isNewVersion) {
        await this.getUserInfo();
        const router = this.hasToken
          ? "/flutter/store/member/settled"
          : "/login/index";
        goToApp(appBaseUrl, router, "", this.$bridge);
        return;
      }
      console.log(window.navigator);
      console.log("$store.state.appInfo", this.$store.state.appInfo);
      if (this.$store.state.appInfo.isApp) {
        if (!this.hasToken) {
          this.$bridge.callHandler("router", `${appBaseUrl}/login/index`);
          return;
        }
        this.$bridge.callHandler(
          "router",
          `${appBaseUrl}/flutter/store/member/settled`
        );
      } else if (this.$store.state.appInfo.isMiniprogram) {
        wx.miniProgram.navigateTo({
          url: "/pages/login/main/index",
        });
      } else {
        console.log("不是App内");
      }
    },
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
    height: 28px;
    font-family: PingFang SC;
    font-weight: 600;
    color: #dd1e0c;
    font-size: 20px;
    line-height: 28px;
    text-align: center;
  }
}
.item-box {
  position: relative;
  margin: 0 auto;
  margin-top: 15.06px;
  width: 351px;
  height: 180px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(226, 197, 167, 0.27), 0px 0px 3px #fbe1c7 inset;
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
    height: 36px;
    text-align: center;
    .span-text {
      position: absolute;
      top: 0;
      left: 4px;
      width: 100%;
      height: 100%;
      line-height: 35.3px;
      text-shadow: 0px 2px 4px #2d4995;
      font-family: PingFang SC;
      font-weight: 600;
      color: #ffffff;
      font-size: 15px;
      letter-spacing: 0.89px;
      text-align: center;
    }
  }
  .content {
    padding: 44.32px 0 18.68px 0;
    display: flex;
    justify-content: center;
    .r-box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 160px;
      height: 96px;
      margin-left: 18px;
      .li {
        margin-top: 4px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #1a3378;
        font-size: 12.92px;
        line-height: 24px;
        .sort {
          width: 17.53px;
          height: 17.54px;
          background-image: linear-gradient(180deg, #f47d77 0%, #da3326 100%);
          border-radius: 50%;
          line-height: 17.54px;
          text-align: center;
          font-family: PingFang SC;
          font-weight: 500;
          color: #ffffff;
          font-size: 12px;
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
  margin-bottom: 48px;
}
.shopkeeper-box {
  margin-bottom: 36px;
}
.shopkeeper-div {
  display: flex;
  flex-direction: column;
  padding: 15px;
  margin: 0 auto;
  margin-top: 16px;
  margin-bottom: 12px;
  width: 351px;
  background-color: #ffffff;
  border: 3px solid;
  border-color: #f6c78c;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(226, 197, 167, 0.27), 0px 0px 3px #845c34 inset;
  .shopkeeper-top {
    display: flex;
    justify-content: center;
    align-items: center;
    .logo {
      margin-right: 28px;
      width: 74px;
      height: 74px;
      border-radius: 8px;
      overflow: hidden;
    }
    .logo-right {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .shopkeeper-title {
        margin-bottom: 5px;
        font-size: 24px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #5A2629;
        line-height: 33px;
      }
      .shopkeeper-name {
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #5A2629;
        line-height: 20px;
        span {
          position: relative;
          top: -2px;
          display: inline-block;
          margin-right: 6px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #ef9f3c;
          line-height: 20px;
        }
      }
    }
  }
  .shopkeeper-border {
    margin: 12px 0;
    width: 299px;
    height: 1px;
    background: rgba(241, 155, 56, 0.19);
  }
  .shopkeeper-bottom {
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #5A2629;
    line-height: 17px;
    text-indent: 2em;
  }
}
.last-box {
  margin: 0 auto;
  margin-top: 16px;
  margin-bottom: 14px;
  padding: 18px;
  width: 351px;
  height: 326px;
  background-color: #ffffff;
  border: 3px solid;
  border-color: #f6c78c;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(226, 197, 167, 0.27), 0px 0px 3px #845c34 inset;
  .stag {
    margin-top: 28px;
    font-family: PingFang SC;
    font-weight: 600;
    color: #5a2629;
    font-size: 16px;
    line-height: 22px;
    span {
      display: inline-block;
      margin-right: 6px;
      width: 18px;
      height: 18px;
      background-color: #f0a03c;
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
    font-family: PingFang SC;
    color: #5a2629;
    font-size: 12px;
    letter-spacing: 0.5px;
    line-height: 17px;
    span {
      display: inline-block;
      margin-right: 6px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: #ef9f3c;
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
  background-color: #f8d7ab;
  z-index: 11;
}
</style>

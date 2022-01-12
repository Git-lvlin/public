<template>
  <div class="five-star">
    <div class="banner-box">
      <van-image
        class="banner-img"
        width="100%"
        height="440px"
        lazy-load
        :src="bgType?edImg:initImg"
      />
      <van-image
        v-if="!bgType"
        class="btn-img"
        width="290"
        height="123px"
        lazy-load
        :src="getImgUrl('publicMobile/fivestar/five-star-btn.png')"
        @click="intoView"
      />
      <div class="tips" @click="showPopupQa">活动规则</div>
    </div>
    <div class="content-box" id="anchor" v-if="!bgType">
      <div class="item" v-for="(item, index) in content" v-bind:key="index">
        <div class="title">
          <van-image
            width="27px"
            height="12px"
            lazy-load
            :src="getImgUrl('publicMobile/fivestar/starl.png')"
          />
          <div class="title-text">{{item.topTitle}}</div>
          <van-image
            width="27px"
            height="12px"
            lazy-load
            :src="getImgUrl('publicMobile/fivestar/starr.png')"
          />
        </div>
        <div class="content">
          <div class="p1">{{item.title}}</div>
          <div class="p2" v-if="!item.type">{{item.subtitle}}</div>
          <div class="p3" v-else>已完成</div>
          <div class="btn-box">
            <van-image
              class="btn-left"
              width="90px"
              height="30px"
              lazy-load
              :src="item.btnLeft"
              @click="leftBtn(index)"
            />
            <van-image
              class="btn-right"
              width="90px"
              height="30px"
              lazy-load
              :src="item.btnRight"
              @click="rightBtn(index)"
            />
          </div>
          <van-image
            class="item-img"
            width="139px"
            height="110px"
            lazy-load
            :src="item.img"
          />
        </div>
      </div>
    </div>
    <div class="logo" :class="bgType?'logo-null':''">
      <van-image
        class="logo-img"
        width="190px"
        height="22px"
        lazy-load
        :src="getImgUrl('publicMobile/fivestar/logo.png')"
      />
    </div>
    <!-- 活动规则弹窗 -->
    <van-popup
      v-model="show"
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
import { Image as VanImage, Dialog, Swipe, SwipeItem, Lazyload, Popup, Toast } from 'vant';
import { getImgUrl } from '@/utils/tools';
import { appBaseUrl, meBaseUrl } from "@/constant/index";
import teamApi from '@/apis/fivestar';
import teamApis from '@/apis/appointment';
import {
  goToApp,
} from '@/utils/userInfo';

Vue.use(VanImage);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Lazyload);
Vue.use(Popup);
Vue.use(Toast);
export default {
  data() {
    return {
      storeAccount: null,
      gradeLevel: null,
      storeInSrc: null,
      newShareSrc: null,
      initData: null, 
      ruleText: '一、活动时间：\n2022年1月15日10\n二、活动对象：\n1至4星社区店主均可参与。\n三、活动内容：\n活动期间，邀请50名新用户注册约购且该用户登录签到1次，即可升为5星店主，尊享5星店主权益。\n四、活动升星规则仅限于本次活动期内有效，活动结束以后恢复原升星规则。\n五、本活动解释权归深圳前海汇能科技产业有限公司所有。',
      show: false,
      token: null,
      bgType: 0,
      initImg: getImgUrl('publicMobile/fivestar/five-star-bg.png'),
      edImg: getImgUrl('publicMobile/fivestar/five-star-bg-end.png'),
      endImg: getImgUrl('publicMobile/fivestar/five-star-bg-end.png'),
      content: [
        {
          topTitle: '我的邀请战绩',
          title: '成功邀请50名新用户注册约购并签到',
          subtitle: '未完成（0/50）',
          btnLeft: getImgUrl('publicMobile/fivestar/btn-yq.png'),
          btnRight: getImgUrl('publicMobile/fivestar/btn-yqjl.png'),
          img: getImgUrl('publicMobile/fivestar/item-img3.png'),
        },
        // {
        //   topTitle: '任务二',
        //   title: '邀约3名用户成功开店',
        //   subtitle: '未完成（0/3）',
        //   btnLeft: getImgUrl('publicMobile/fivestar/btn-yq.png'),
        //   btnRight: getImgUrl('publicMobile/fivestar/btn-kdjl.png'),
        //   img: getImgUrl('publicMobile/fivestar/item-img2.png'),
        // },
        // {
        //   topTitle: '任务三',
        //   title: '参与集约下单3次',
        //   subtitle: '未完成（0/3）',
        //   btnLeft: getImgUrl('publicMobile/fivestar/btn-cy.png'),
        //   btnRight: getImgUrl('publicMobile/fivestar/btn-cyjl.png'),
        //   img: getImgUrl('publicMobile/fivestar/item-img3.png'),
        // }
      ]
    };
  },
  components: {
    [Dialog.Component.name]: Dialog.Component,
  },
  async mounted() {
    await this.getUserInfo()
    await this.getInfo()
    this.getData()
  },
  methods: {
    getImg(id) {
      return new Promise((reject) => {
        teamApis.getShareImg({paramId: id,sourceType: 5}, {token: this.token}).then((res) => {
          if (res && res.code === 0 && res.data) {
            if (id == 4) {
              this.newShareSrc = res.data.appDownLoadUrl
            } else {
              this.storeInSrc = res.data.appDownLoadUrl
            }
            reject()
          }
        })
      })

    },
    async leftBtn(index) {
      switch(index) {
        case 0:
          // 分享注册页面 new-share
          await this.getImg(4)
          this.goto(this.newShareSrc)
          break
        case 1:
          // 分享社区店入驻页面 store-in
          await this.getImg(5)
          this.goto(this.storeInSrc)
          break
        case 2:
          goToApp(appBaseUrl, '/flutter/store/member/index', '', this.$bridge)
          // 参与集约下单-跳转集约页面
          break
      }
    },
    goto(src) {
      const data = {
        code: 0,
        msg: 'success',
        data: {
          imgSrc: `${src}`,
        }
      }
      const zero = JSON.stringify(data);
      this.$bridge.callHandler(
        'inviteFriend',
        zero,
      )
    },
    rightBtn() {
      goToApp(meBaseUrl, '/web/invitation-list?isNew=1')
    },
    intoView() {
      document.getElementById("anchor").scrollIntoView()
    },
    getData() {
      if (this.bgType) {
        return
      }
      teamApi.getListNew({}, {token: this.token}).then((res) => {
        if (res && res.data) {
          this.setText(res.data)
        }
      })
    },
    getImgUrl,
    getUserInfo() {
      return new Promise((resolve) => {
        this.$bridge.callHandler('getUserInfo',{},(res) => {
          const d = JSON.parse(res)
          this.token = d.data.accessToken
          resolve()
        })
      })
    },
    getInfo() {
      return new Promise((resolve) => {
        teamApi.getStoreShopInfo({}, {showError: false,token: this.token})
          .then((res) => {
            if (res&&res.code == 0) {
              if (res.data&&res.data.storeAccount) {
                this.storeAccount = res.data.storeAccount
              } else {
                Toast('本活动仅限店主参与, 请先开店成为店主后参与')
              }
              this.gradeLevel = res.data?.memberShop?.level?.gradeLevel
              if (this.gradeLevel == 5) {
                this.bgType = 1
                Toast('您已是五星店主')
              }
            }
            resolve()
          })
      })
    },
    setText(data) {
      const { inventUser } = data;
      this.content[0].title = `成功邀约${inventUser.confNum}名新用户注册约购并签到`;
      this.content[0].subtitle = `未完成（${inventUser.activeNum}/${inventUser.confNum}）`
      this.content[0].type = inventUser.status;

      // this.content[1].title = `邀约${openStore.confNum}名用户成功开店`;
      // this.content[1].subtitle = `未完成（${openStore.activeNum}/${openStore.confNum}）`
      // this.content[1].type = openStore.status;

      // this.content[2].title = `参与集约下单${storeTrans.confNum}次`;
      // this.content[2].subtitle = `未完成（${storeTrans.activeNum}/${storeTrans.confNum}）`
      // this.content[2].type = storeTrans.status;
      // if (inventUser.status&&openStore.status&&storeTrans.status) {
      //   this.bgType = 1
      // }
    },
    showPopupQa() {
      this.show = true
    },
  },
};
</script>

<style lang="scss" scoped>
  .five-star {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color:#DA0011;
    position: relative;
  }
  .banner-box {
    position: relative;
    width: 100%;
    height: 440px;
    .banner-img {
      width: 100%;
      height: 100%;
      z-index: 1;
    }
    .btn-img {
      position: absolute;
      left: 50%;
      top: 370px;
      transform: translate(-50%);
      width: 290px;
      height: 123px;
      z-index: 2;
    }
    .tips {
      padding-left: 17px;
      position: absolute;
      top: 9px;
      right: 12px;
      width: 73px;
      height: 19px;
      line-height: 19px;
      background-color: #FFEED4;
      box-shadow: 0px 2px 4px 0px #E42216, 0px 2px 4px 0px rgba(0, 0, 0, 0.05);
      border-radius: 12px;
      font-size: 12px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #E72C25;
      z-index: 2;
    }
    .tips::after {
      content: "";
      position: absolute;
      top: 8px;
      left: 8px;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: #E42216;
    }
  }

  .content-box {
    padding: 32px 12px 0 12px;
    display: flex;
    flex-direction: column;
    .item {
      position: relative;
      margin-bottom: 24px;
      .title {
        margin-bottom: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        .title-text {
          margin: 0 12px;
          font-size: 18px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #FEFDE5;
          letter-spacing: 2px;
          text-shadow: 0px 2px 1px rgba(0, 0, 0, 0.25);
        }
      }
      .content {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        width: 351px;
        height: 200px;
        background: linear-gradient(137deg, #FEF9F3 0%, #FAD2D0 100%);
        box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.06);
        border-radius: 8px;
        border: 3px solid #E9706E;
        .p1 {
          margin: 24px 0 16px 16px;
          height: 22px;
          font-size: 16px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #772E17;
          line-height: 22px;
          letter-spacing: 1px;
        }
        .p2 {
          margin: 0 0 64px 16px;
          height: 20px;
          font-size: 14px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #88685C;
          line-height: 20px;
        }
        .p3 {
          margin: 0 0 64px 16px;
          height: 20px;
          font-size: 14px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #FD1601;
          line-height: 20px;
        }
      }
      .btn-box {
        margin-left: 20px;
        .btn-left {
          width: 90px;
          height: 30px;
          margin-right: 13px;
        }
        .btn-right {
          width: 90px;
          height: 30px;
        }
      }
      .item-img {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 139px;
        height: 110px;
      }
    }
  }

  .logo {
    padding: 8px 0 34px 0;
    display: flex;
    justify-content: center;
  }
  .logo-null {
    padding: 0;
    margin: 0;
    position: fixed;
    bottom: 38px;
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .element::-webkit-scrollbar {display:none}
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

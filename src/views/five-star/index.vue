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
        class="btn-img"
        width="290"
        height="123px"
        lazy-load
        :src="getImgUrl('publicMobile/fivestar/five-star-btn.png')"
      />
      <div class="tips">活动规则</div>
    </div>
    <div class="content-box">
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
          <div class="p2">{{item.subtitle}}</div>
          <div class="btn-box">
            <van-image
              class="btn-left"
              width="90px"
              height="30px"
              lazy-load
              :src="item.btnLeft"
            />
            <van-image
              class="btn-right"
              width="90px"
              height="30px"
              lazy-load
              :src="item.btnRight"
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
    <div class="logo">
      <van-image
        class="logo-img"
        width="190px"
        height="22px"
        lazy-load
        :src="getImgUrl('publicMobile/fivestar/logo.png')"
      />
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Image as VanImage, Dialog, Swipe, SwipeItem, Lazyload } from 'vant';
import { getImgUrl } from '@/utils/tools';
import { appBaseUrl } from "@/constant/index";
import teamApi from '@/apis/appointment';
import {
  judgeVersionIsNew,
  judgeVersionIsNewShare,
  goToApp,
  savePicShare,
  setNavigationBarRightContent
} from '@/utils/userInfo';

Vue.use(VanImage);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Lazyload);
export default {
  data() {
    return {
      token: null,
      bgType: 0,
      initImg: getImgUrl('publicMobile/fivestar/five-star-bg.png'),
      edImg: getImgUrl('publicMobile/fivestar/five-star-bg.png'),
      content: [
        {
          topTitle: '任务一',
          title: '成功邀约20名新用户并登录签到',
          subtitle: '未完成（0/20）',
          btnLeft: getImgUrl('publicMobile/fivestar/btn-yq.png'),
          btnRight: getImgUrl('publicMobile/fivestar/btn-yqjl.png'),
          img: getImgUrl('publicMobile/fivestar/item-img1.png'),
        },
        {
          topTitle: '任务二',
          title: '邀约3名用户成功开店',
          subtitle: '未完成（0/3）',
          btnLeft: getImgUrl('publicMobile/fivestar/btn-yq.png'),
          btnRight: getImgUrl('publicMobile/fivestar/btn-kdjl.png'),
          img: getImgUrl('publicMobile/fivestar/item-img2.png'),
        },
        {
          topTitle: '任务三',
          title: '参与集约下单3次',
          subtitle: '未完成（0/3）',
          btnLeft: getImgUrl('publicMobile/fivestar/btn-cy.png'),
          btnRight: getImgUrl('publicMobile/fivestar/btn-cyjl.png'),
          img: getImgUrl('publicMobile/fivestar/item-img3.png'),
        }
      ]
    };
  },
  components: {
    [Dialog.Component.name]: Dialog.Component,
  },
  async created () {
  },
  methods: {
    getImgUrl,
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
      bottom: -45px;
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
    padding: 24px 12px 0;
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
</style>

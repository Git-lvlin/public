<template>
  <div class="store-in">
    <div class="text-box"
      :style="{
        'background-image': `url('${getImgUrl('publicMobile/invitation/text.png')}')`
      }"
    >
      <van-swipe class="my-swipe" :autoplay="2000" style="height: 36px;" :show-indicators="false" indicator-color="white" vertical>
        <van-swipe-item>用户135****7710成功邀请1位好友成为店主！</van-swipe-item>
        <van-swipe-item>用户136****5443成功邀请1位好友成为店主！</van-swipe-item>
        <van-swipe-item>用户133****7234成功邀请1位好友成为店主！</van-swipe-item>
        <van-swipe-item>用户136****8192成功邀请1位好友成为店主！</van-swipe-item>
      </van-swipe>
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
            lazy-load
            :src="getImgUrl('publicMobile/invitation/item.png')"
          />
        </div>
      </div>
    </div>
    <div class="item-box item-box3">
      <div class="content3">
        <div class="center-box">
          <div class="sub-title">
            <div class="left-text">我的邀请</div>
            <div class="right-top-btn-box" @click="onToDetail('all')">
              <p>查看全部</p>
              <van-image
                class="right-img"
                width="12px"
                height="12px"
                :src="getImgUrl('publicMobile/invitation/r.png')"
              />
            </div>
          </div>
          <p class="price"><span class="span">{{totalCommission?totalCommission/100:0}}</span>元</p>
          <p class="num">已邀请<span>{{inviteNum || 0}}</span>位新用户，累计获得佣金</p>
          <div class="now-button" @click="onToDetail">邀请好友一起领取</div>
        </div>
      </div>
    </div>
    </div>

  </div>
</template>

<script>
import Vue from 'vue';
import { Image as VanImage, Dialog, Swipe, SwipeItem, Lazyload } from 'vant';
import { getImgUrl } from '@/utils/tools';
import { appBaseUrl } from "@/constant/index";
import teamApi from '@/apis/appointment';
import { judgeVersionIsNew, goToApp } from '@/utils/userInfo';

Vue.use(VanImage);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Lazyload);
export default {
  data() {
    return {
      totalCommission: false,
      inviteNum: false,
      inviteCode: null,
      token: null,
      isNewVersion: null
    };
  },
  components: {
    [Dialog.Component.name]: Dialog.Component,
  },
  async created () {
    if (this.$store.state.appInfo.isApp) {
      this.isNewVersion = judgeVersionIsNew(this.$store.state.appInfo.appVersion)
      if (this.isNewVersion) {
        await this.getUserInfo();
        this.getInviteInfo()
        return
      }
      console.log('兼容低版本逻辑')
      this.getInfo()
    } else {
      console.log('不是App内')
    }
  },
  methods: {
    getImgUrl,
    getInfo() {
      this.$bridge.callHandler('fetchToken', {}, (a) => {
          teamApi.apiGetInviteInfo({}, {token: a}).then((res) => {
            if (res && res.code === 0 && res.data) {
              this.totalCommission = res.data.totalCommission
              this.inviteNum = res.data.inviteNum
            }
          })
        }
      )
    },
    getUserInfo() {
      return new Promise((resolve) => {
        this.$bridge.callHandler('getUserInfo',{},(res) => {
          const d = JSON.parse(res)
          this.token = d.data.accessToken
          // this.isNew = d.data.isNew
          resolve()
        })
      })
    },
    getInviteInfo() {
      console.log('this.token', this.token)
      teamApi.apiGetInviteInfo({}, {token: this.token}).then((res) => {
        if (res && res.code === 0 && res.data) {
          this.totalCommission = res.data.totalCommission
          this.inviteNum = res.data.inviteNum
        }
      })
    },
    onToDetail(type) {
      const {
        good,
      } = this;
      if (this.$store.state.appInfo.isApp) {
        if (this.isNewVersion) {
          if (type === 'all') {
            goToApp(appBaseUrl, '/flutter/mine/member_list/page', '', this.$bridge)
            return
          }
          this.$bridge.callHandler(
            'inviteFriend',
          )
          return
        }

        // 老版本
        if (type === 'all') {
          this.$bridge.callHandler(
            'router',
            `${appBaseUrl}/flutter/mine/member_list/page`,
          )
          return
        }
        this.$bridge.callHandler(
          'inviteFriend',
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
      overflow: hidden;
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
      overflow: hidden;
      .now-button {
        width:280px;
        height:52px;
        background-image:linear-gradient(90deg,#fd0a01 0%,#fe7300 100%);
        border-radius:26px;
        margin: 0 auto;
        font-family:PingFang SC;
        font-weight:500;
        color:#ffffff;
        font-size:20px;
        line-height:52px;
        text-align:center;
      }
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
          border:1px solid;
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
      overflow: hidden;
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
    overflow: hidden;
    .content3 {
      .center-box {
        .sub-title {
          width: 100%;
          height: 36px;
          line-height: 36px;
          display: flex;
          justify-content: space-between;
          background-color:#fff7db;
          .left-text {
            margin-left: 16px;
            font-family:PingFang SC;
            font-weight:500;
            color:#843f29;
            font-size:16px;
            text-align:center;
          }
          .right-top-btn-box {
            margin-right: 11px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family:PingFang SC;
            color:#843f29;
            font-size: 12px;
            line-height: 17px;
            .right-img {
              margin-left: 4px;
            }
          }
        }
        .price {
          margin-top: 21px;
          font-family:PingFang SC;
          font-weight:500;
          color:#f93a30;
          font-size:12px;
          line-height:17px;
          text-align:center;
          .span {
            font-family:DINPro;
            font-weight:700;
            color:#f93a30;
            font-size:48px;
            line-height:48px;
            text-align:center;
          }
        }
        .num {
          margin-top: 4px;
          height: 28px;
          line-height: 28px;
          font-family:PingFang SC;
          color:#a56545;
          font-size:14px;
          line-height:20px;
          text-align:center;
        }
        .now-button {
          width:280px;
          height:52px;
          background-image:linear-gradient(90deg,#fd0a01 0%,#fe7300 100%);
          border-radius:30px;
          font-family:PingFang SC;
          font-weight:600;
          color:#ffffff;
          font-size:20px;
          line-height:52px;
          text-align:center;
          margin: 0 auto;
          margin-top: 21px;
        }
      }
    }
  }
  .item-box4 {
    height: 205px;
    margin-bottom: 33px;
  }
  .my-swipe .van-swipe-item {
    font-size: 12px;
    line-height: 36px;
    text-align: center;
  }
</style>

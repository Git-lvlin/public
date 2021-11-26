<template>
  <div class="container">
    <van-image
      class="border"
      width="100%"
      :src="getImgUrl('publicMobile/limit/invitation-bg.png')"
    />
    <div class="content">
      <div class="record" v-if="time" @click="lookRecord">邀请记录</div>
      <div class="time" v-if="time">活动时间:{{time}}</div>
      <div class="top-title">仅在当前活动页面分享邀请成功的用户才算有效用户!</div>
      <div class="title" v-if="info">
        <van-image class="left-icon" width="27px" height="12px" :src="getImgUrl('publicMobile/limit/star-left.png')" />
        <div class="title-text">推荐人奖励</div>
        <van-image class="right-icon" width="27px" height="12px" :src="getImgUrl('publicMobile/limit/star-right.png')" />
      </div>
      <div class="subtitle" v-if="info">邀请好友越多，推荐人奖励翻倍</div>
      <div class="box-one" v-if="info">
        <div class="one-item">
          <van-image
            class="star-text"
            width="14px"
            height="12px"
            :src="getImgUrl('publicMobile/limit/text-star.png')"
          />
          <div class="right-box">累计推荐1-3人，每成功推荐1人奖励<span class="price">{{info.firstAmount/100}}</span>元红包。</div>
        </div>
        <div class="one-item">
          <van-image
            class="star-text"
            width="14px"
            height="12px"
            :src="getImgUrl('publicMobile/limit/text-star.png')"
          />
          <div class="right-box">累计推荐4-9人，每成功推荐1人奖励<span class="price">{{info.secondAmount/100}}</span>元红包。</div>
        </div>
        <div class="one-item">
           <van-image
            class="star-text"
            width="14px"
            height="12px"
            :src="getImgUrl('publicMobile/limit/text-star.png')"
          />
          <div class="right-box">累计推荐10人以上，每成功推荐1人奖励<span class="price">{{info.thirdAmount/100}}</span>元红包。</div>
        </div>
        <div class="detail">
          当前活动已累计邀请<span class="red">{{info.inviteNum}}</span>人,共获得红包<span class="red">{{info.inviteCouponAmount/100}}</span>元，红包可在下方 “好货推荐”列表的商品中使用。
        </div>
        <van-image
          class="top-btn"
          width="280px"
          height="52px"
          Lazyload
          :src="getImgUrl('publicMobile/limit/top-btn.png')"
          @click="btn"
        />
      </div>
      <div class="title">
        <van-image
          class="star-img"
          width="27px"
          height="12px"
          Lazyload
          :src="getImgUrl('publicMobile/limit/star-left.png')"
        />
        <div class="title-text">邀人攻略</div>
        <van-image
          class="star-img"
          width="27px"
          height="12px"
          Lazyload
          :src="getImgUrl('publicMobile/limit/star-right.png')"
        />
      </div>
      <div class="box-two">
        <div class="box-title">第一步</div>
        <div class="sub-title">分享「约购」APP注册链接给好友。</div>
        <div class="box-title">第二步</div>
        <div class="sub-title">让好友注册「约购」APP账号并下载APP。</div>
        <div class="box-title">第三步</div>
        <div class="sub-title">好友打开「约购」APP并登陆成功即可推荐成功。</div>
      </div>
      <div class="title" v-if="goodsList">
        <van-image
          class="star-img"
          width="27px"
          height="12px"
          Lazyload
          :src="getImgUrl('publicMobile/limit/star-left.png')"
        />
        <div class="title-text">好货推荐</div>
        <van-image
          class="star-img"
          width="27px"
          height="12px"
          Lazyload
          :src="getImgUrl('publicMobile/limit/star-right.png')"
        />
      </div>
      <div class="box-three" v-if="goodsList.length">
        <div class="goods-item" v-for="(item, index) in goodsList" :key="index">
          <van-image
            class="goods-img"
            width="100px"
            height="100px"
            lazy-load
            :src="item.image"
          />
          <div class="goods-right-box">
            <div class="goods-title van-multi-ellipsis--l2">{{item.goodsName}}</div>
            <div class="goods-tag" v-for="(tagItem,tagIndex) in item.couponList" :key="tagIndex">
              {{tagItem.couponDesc}}
            </div>
            <div class="goods-price">到手价<span class="to-get">¥</span> <span class="pr">{{item.finalPrice/100}}</span></div>
            <div class="goods-sale">销售价：¥{{item.salePrice/100}}</div>
          </div>
          <div class="goods-btn" @click="toShop(item.actionUrl)">抢购</div>
        </div>
      </div>
      <div class="tail" v-if="goodsList.length">
        <van-image
          class="tail-left"
          width="34px"
          height="1px"
          Lazyload
          :src="getImgUrl('publicMobile/limit/tail-left.png')"
        />
        <div class="tail-text">没有更多商品</div>
        <van-image
          class="tail-right"
          width="34px"
          height="1px"
          Lazyload
          :src="getImgUrl('publicMobile/limit/tail-right.png')"
        />
      </div>

      <div class="null" v-if="!goodsList.length">
        <van-image
          class="null-img"
          width="160px"
          height="160px"
          Lazyload
          :src="getImgUrl('publicMobile/limit/null.png')"
        />
        <div class="null-text">暂无相关商品~</div>
      </div>

      <div class="bottom-btn">
        <van-image
          class="btn-img"
          width="320px"
          height="92px"
          Lazyload
          :src="getImgUrl('publicMobile/limit/bottom-btn.png')"
          @click="btn"
        />
      </div>
    </div>

    <van-popup
      v-model="show"
      :style="{ width:'100%', background: 'none'}"
      v-if="popupData"
    >
      <div class="popup-box"
        :style="{
          'background-image': `url('${getImgUrl('publicMobile/limit/popup-bg.png')}')`
        }"
      >
        <div class="popup-content">
          <div class="popup-title">推荐有礼</div>
          <div class="popup-sub-title">恭喜您成功邀请{{popupData.inviteNum}}位新用户,获得{{popupData.inviteAmount/100}}元红包奖励,邀请人数越多,奖励翻倍哦~</div>
          <div class="popup-price">
            <span class="span1">{{popupData.inviteAmount/100}}</span>
            <span class="span2">元</span>
          </div>
          <div class="popup-btn-box">
            <van-image
              class="popup-btn-img"
              width="200px"
              height="50px"
              Lazyload
              :src="getImgUrl('publicMobile/limit/popup-btn.png')"
            />
            <div class="popup-btn-text" @click="close">查看活动</div>
          </div>

        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import Vue from 'vue';
import { Image as VanImage, Popup, Dialog, Lazyload } from 'vant';
import { getImgUrl } from '@/utils/tools';
import { appBaseUrl, meBaseUrl } from "@/constant/index";
import { goToApp, share } from '@/utils/userInfo';
import teamApi from '@/apis/limit';
Vue.use(VanImage);
Vue.use(Popup);
Vue.use(Lazyload);
export default {
  data() {
    return {
      goodsList: [],
      records: null,
      popupData: null,
      info: null,
      token: null,
      couponInviteId: 15,
      show: 0,
      time: null,
      inviteCode: null,
    };
  },
  components: {
    [Dialog.Component.name]: Dialog.Component,
  },
  created () {
    
  },
  async mounted() {
    await this.getUserInfo();
    const {
      query,
    } = this.$router.history.current;
    console.log('query', query)
    this.inviteCode = query.inviteCode;
    this.couponInviteId = query.couponInviteId;
    console.log('couponInviteId', this.couponInviteId)
    this.getInfo();
    this.getPopup();
    this.getGoodsList();
  },
  methods: {
    getImgUrl,
    close() {
      this.show = 0
    },
    getUserInfo() {
      return new Promise((resolve) => {
        this.$bridge.callHandler('getUserInfo',{},(res) => {
          const d = JSON.parse(res)
          this.token = d.data.accessToken
          resolve()
        })
      })
    },
    btn() {
      if (!this.token) {
        this.$router.push({
          path: '/web/new-share',
          query: {
            inviteCode: this.inviteCode
          },
        });
        return
      }
      if (this.info.activityStatus == 4) {
        Dialog({ message: '活动已结束，谢谢您的参与。' });
        return
      }
      if (this.info.activityStatus == 5) {
        Dialog({ message: '活动已终止，谢谢您的参与。' });
        return
      }
      if (this.info.activityStatus == 3) {
        Dialog({ title: `活动未开始`,message: `活动时间：${actStartTime}` });
        return
      }
      // 邀请好友
      share({
        shareObjectNo: 15,
        contentType: 10,
        paramId: 12,
        shareType: 3,
        sourceType: 10,
      })
    },
    // 邀请列表
    lookRecord() {
      goToApp(meBaseUrl, `/web/limit-list?couponInviteId=${this.couponInviteId}&_immersive=0`, '');
    },
    toShop(url) {
      goToApp(url);
    },
    timestampToTime(timestamp, type) {
      var date = new Date(timestamp*1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '.';
      var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '.';
      var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
      var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
      var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes());
      if (type) {
        return Y+M+D+h+m
      } else {
        return Y+M+D;
      }
    },
    getInfo() {
      teamApi.getInfo({couponInviteId: this.couponInviteId}, {token: this.token}).then(res => {
        this.info = res.data
        const start = this.timestampToTime(this.info.activityStartTime);
        const end = this.timestampToTime(this.info.activityEndTime);
        const actStartTime = this.timestampToTime(this.info.activityStartTime, 1);
        this.time =  start + '-' + end;
        if (this.info.activityStatus == 4) {
          Dialog({ message: '活动已结束，谢谢您的参与。' });
        }
        if (this.info.activityStatus == 5) {
          Dialog({ message: '活动已终止，谢谢您的参与。' });
        }
        if (this.info.activityStatus == 3) {
          Dialog({ title: `活动未开始`,message: `活动时间：${actStartTime}` });
        }
      })
    },
    getGoodsList() {
      teamApi.getGoodsList({couponInviteId: this.couponInviteId}, {token: this.token}).then(res => {
        this.goodsList = res.data.goodsList
      })
    },
    // 获取弹窗信息
    getPopup() {
      teamApi.getPopup({couponInviteId: this.couponInviteId}, {token: this.token}).then(res => {
        this.popupData = res.data;
        this.show = res.data.isShow;
        if (this.show) {
          this.isPopupEd()
        }
      })
    },
    // 弹过马上记录
    isPopupEd() {
      teamApi.isPopupEd({couponInviteId: this.couponInviteId}, {token: this.token})
    },

  },
};
</script>

<style lang='scss' scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #EC4E37;
  box-sizing: border-box;
}
.content {
  position: relative;
  top: -150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  .title-text {
    margin: 0 12px;
    height: 25px;
    font-size: 18px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #FEFDE5;
    line-height: 25px;
    text-shadow: 0px 2px 1px rgba(0, 0, 0, 0.25);
  }
}
.subtitle {
  margin-top: 4px;
  margin-bottom: 12px;
  height: 17px;
  font-size: 12px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #FEFDE5;
  line-height: 17px;
  text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25);
}
.time {
  margin-bottom: 3px;
  height: 17px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #F9F0D5;
  line-height: 17px;
  text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25);
}
.top-title {
  margin-bottom: 4px;
  height: 17px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #FEFDE5;
  line-height: 17px;
  text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25);
}
.record {
  padding: 0 6px 0 6px;
  position: absolute;
  top: 44px;
  right: 19px;
  height: 19px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #FFFFFF;
  line-height: 19px;
  text-align: center;
  border-radius: 10px;
  border: 1px solid #FFFFFF;
}

.box-one {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 351px;
  padding: 24px;
  background: #FFFFFF;
  box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.04), 0px 1px 8px 0px rgba(0, 0, 0, 0.06);
  border-radius: 11px;
  border: 3px solid #E9706E;
  margin-bottom: 24px;
  .detail {
    margin-bottom: 24px;
    height: 39px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #8D5328;
    line-height: 17px;
  }
  .one-item {
    display: flex;
    margin-bottom: 12px;
    .star-text {
      position: relative;
      top: 4px;
      width: 14px;
      height: 12px;
      margin-right: 7px;
    }
    .right-box {
      width: 282px;
      height: 48px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #8D5328;
      line-height: 20px;
      .price {
        font-size: 20px;
        color: #F93A30;
      }
    }
  }
}

.box-two {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  width: 351px;
  padding: 24px;
  background: #FFFFFF;
  box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.04), 0px 1px 8px 0px rgba(0, 0, 0, 0.06);
  border-radius: 11px;
  border: 3px solid #E9706E;
  margin-bottom: 24px;
  .box-title {
    width: 100%;
    margin-bottom: 4px;
    height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #EE7D30;
    line-height: 20px;
  }
  .sub-title {
    width: 100%;
    margin-bottom: 12px;
    height: 18px;
    font-size: 13px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #8D5328;
    line-height: 18px;
  }
  .sub-title:last-child {
    margin-bottom: 0;
  }
}

.box-three {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .goods-item {
    margin-top: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 351px;
    height: 124px;
    background: #FFFFFF;
    box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.04), 0px 1px 8px 0px rgba(0, 0, 0, 0.06);
    border-radius: 8px;
    border: 3px solid #E9706E;
    .goods-img {
      margin-right: 4px;
      width: 100px;
      height: 100px;
      border-radius: 8px;
      overflow: hidden;
    }
    .goods-right-box {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 223px;
      overflow: hidden;
      .goods-title {
        width: 223px;
        height: 36px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        line-height: 18px;
      }
      .goods-tag {
        margin-top: 5px;
        padding: 0 4px;
        height: 13px;
        font-size: 10px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #EB483F;
        line-height: 13px;
        background: rgba(235, 72, 63, 0.1);
        border-radius: 2px;
      }
      .goods-price {
        margin-top: 6px;
        height: 20px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #E7532C;
        line-height: 20px;
        .to-get {
          font-size: 12px;
        }
        .pr {
          font-size: 18px;
        }
      }
      .goods-sale {
        margin-top: 3px;
        height: 14px;
        font-size: 10px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #B2B2B2;
        line-height: 14px;
      }
    }
    .goods-btn {
      position: absolute;
      right: 12px;
      bottom: 15px;
      width: 80px;
      height: 34px;
      line-height: 34px;
      background: linear-gradient(270deg, #FE7000 0%, #FD0E01 100%);
      box-shadow: 1px 1px 2px 0px rgba(228, 45, 59, 0.3);
      border-radius: 17px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #FFFFFF;
      text-align: center;
    }
  }
}

.tail {
  margin-top: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  .tail-text {
    margin: 0 12px;
    height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.59);
    line-height: 20px;
  }
}

.red {
  color: #F93A30;
  font-size: 16px;
}

@keyframes breathe {
  0%{transform: scale(1)}
  50%{transform: scale(1.18)}
  100%{transform: scale(1)}
}

.bottom-btn {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #FFF3EA;
  box-shadow: 0px -3px 11px 0px #DE1C00;
  display: flex;
  align-items: center;
  justify-content: center;
  .btn-img {
    animation: breathe 1.1s infinite;
  }
}

.popup-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 316px;
  height: 376px;
  position: relative;
  left: 50%;
  transform: translate(-50%);
  background-size: 316px 376px;
  background-repeat: no-repeat;
  .popup-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .popup-title {
      margin-top: 110px;
      margin-bottom: 9px;
      height: 24px;
      font-size: 20px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #FFE7B2;
      line-height: 24px;
    }
    .popup-sub-title {
      // margin-bottom: 16px;
      width: 200px;
      height: 60px;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #FFE7B2;
      line-height: 20px;
      text-align: justify;
    }
    .popup-price {
      // margin-top: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      .span1 {
        font-size: 48px;
        font-family: DINPro-Bold, DINPro;
        font-weight: bold;
        color: #FFE7B2;
      }
      .span2 {
        margin-left: 5px;
        font-size: 18px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #FFE7B2;
      }
    }
    .popup-btn-box {
      position: relative;
      width: 200px;
      height: 50px;
      .popup-btn-img {
        position: absolute;
        top: 0;
        width: 200px;
        height: 50px;
      }
      .popup-btn-text {
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        font-size: 16px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #FB3200;
        line-height: 50px;
      }
    }
  }

}
.null {
  margin-top: 24px;
  width: 351px;
  height: 352px;
  background: #FFFFFF;
  box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.04), 0px 1px 8px 0px rgba(0, 0, 0, 0.06);
  border-radius: 8px;
  border: 3px solid #E9706E;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.null-img {
  width: 160px;
  height: 160px;
}
.null-text {
  margin-top: 8px;
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  line-height: 20px;
}
</style>

<template>
  <div class="main">
    <van-loading class="load" v-if="load" />
    <div class="winning-list" v-if="prizeWinMsg">
      <van-swipe class="my-swipe" :autoplay="2000" style="height: 26px;" :show-indicators="false" indicator-color="white" vertical>
        <van-swipe-item v-for="(item,index) in prizeWinMsg" :key="index">
          <img class="user-pic" width="12px" height="12px" :src="item.icon" />
          <span class="user-span">{{item.msg}}</span>
        </van-swipe-item>
      </van-swipe>
    </div>
    <van-image
      class="banner"
      width="100%"
      :src="bgImgUrl"
    />

    <div class="lead-box">
      <box 
        v-for="item in boxData"
        :key="item.id"
        :good="item"
        :random="random"
        v-on:selectBox="selectBox"
      />
    </div>

    <div class="tab tab1" @click="showPopupQa">
      <van-image width="19px" height="24px" :src="getImgUrl('publicMobile/bindbox/rule-icon.png')" />
      <p>
        <span class="p1">活动</span>
        <span class="p2">规则</span>
      </p>
    </div>
    <div class="tab tab2" @click="goMyPrize">
      <van-image width="21px" height="20px" :src="getImgUrl('publicMobile/bindbox/prize-icon.png')" />
      <p>
        <span class="p1">我的</span>
        <span class="p2">奖品</span>
      </p>
    </div>

    <div class="title-one">开盲盒</div>
    <div class="title-two">赢超级大奖</div>
    <div class="subtitle">拼手气 玩大的 惊喜盲盒等你来开</div>

    <div class="num">
      <p>剩余次数：<span class="chance">{{unuseNum}}</span>次</p>
    </div>

    <div class="look" @click="getInfo(1)">查看明细</div>

    <div class="open" @click="open"></div>

    <div class="goods-list">
      <div class="title-box">
        <van-image class="left-icon" width="45px" height="16px" :src="getImgUrl('publicMobile/bindbox/title-icon.png')" />
        <van-image class="star-left" width="27px" height="12px" :src="getImgUrl('publicMobile/bindbox/star-left.png')" />
        <div class="title">盲盒里可能会有</div>
        <van-image class="star-right" width="27px" height="12px" :src="getImgUrl('publicMobile/bindbox/star-right.png')" />
        <van-image class="right-icon" width="45px" height="16px" :src="getImgUrl('publicMobile/bindbox/title-icon.png')" />
      </div>
      <div class="list-box">
        <div class="list-box-index">
          <list
            v-for="item in prizeNotice"
            :key="item.id"
            :good="item"
          />
        </div>
      </div>
    </div>

    <div class="task-box" id="anchor">
      <div class="title-box">
        <van-image class="left-icon" width="45px" height="16px" :src="getImgUrl('publicMobile/bindbox/title-icon.png')" />
        <div class="title">
          <span>做任务 赢</span>
          <span class="text-more">更多开盒机会</span>
        </div>
        <van-image class="right-icon" width="45px" height="16px" :src="getImgUrl('publicMobile/bindbox/title-icon.png')" />
      </div>
      <div class="item box-one" v-if="inviteFriends.inviteIsShow">
        <div class="task-title">
          <van-image width="27px" height="12px" :src="getImgUrl('publicMobile/bindbox/star-left.png')" />
          <div class="task-title-text">
            <span class="text-more">任务一：</span>
            <span>邀请好友</span>
          </div>
          <van-image width="27px" height="12px" :src="getImgUrl('publicMobile/bindbox/star-right.png')" />
        </div>
        <div class="task-content">
          <div class="task-flex">
            <p>每成功邀请<span class="span">{{inviteFriends.inviteNum}}</span>位新用户注册约购APP，获得<span class="span">{{inviteFriends.chanceNum}}</span>次开盲盒机会，每天前{{inviteFriends.dayMemberNum}}人有效。</p>
            <p v-if="!inviteFriends.inviteIsFinish">本次已邀请<span class="span">{{inviteFriends.inviteFinishNum}}</span>人，还差<span class="span">{{inviteFriends.inviteUnNum}}</span>人。</p>
            <p v-else>今天已经圆满完成任务，明天再继续努力吧~</p>
          </div>
        </div>
        <div class="btn-yellow">
          <van-image width="225px" height="41px" :src="getImgUrl('publicMobile/bindbox/btn-yellow.png')" />
          <span class="text" @click="go('invitaion')">立即邀请</span>
        </div>
      </div>

      <div class="item box-two" v-if="signIn.signInIsShow">
        <div class="task-title">
          <van-image width="27px" height="12px" :src="getImgUrl('publicMobile/bindbox/star-left.png')" />
          <div class="task-title-text">
            <span class="text-more">任务二：</span>
            <span>签到任务</span>
          </div>
          <van-image width="27px" height="12px" :src="getImgUrl('publicMobile/bindbox/star-right.png')" />
        </div>
        <div class="task-content">
          <p>每连续签到<span class="span">{{signIn.signInNum}}</span>天，获得<span class="span">{{signIn.signInChanceNum}}</span>次开盲盒机会。</p>
          <p class="border-days">
            <span class="index">1天</span>
            <span class="index">2天</span>
            <span class="index">3天</span>
          </p>
          <p v-if="!signIn.signInIsFinish">本次已连签<span class="span">{{signIn.signInFinishNum}}</span>天，还差<span class="span">{{signIn.signInUnNum}}</span>天。</p>
          <p v-else>已完成全部签到任务 棒~</p>
        </div>
        <div class="btn-yellow" v-if="!hasSgin">
          <van-image width="225px" height="41px" :src="getImgUrl('publicMobile/bindbox/btn-yellow.png')" />
          <span class="text" @click="go('sign-in')">立即签到</span>
        </div>
        <div class="btn-disable" v-else>
          <span class="text-sgin">今日已签到</span>
        </div>
      </div>

      <div class="item box-three" v-if="orderConsume.consumeIsShow">
        <div class="task-title">
          <van-image width="27px" height="12px" :src="getImgUrl('publicMobile/bindbox/star-left.png')" />
          <div class="task-title-text">
            <span class="text-more">任务三：</span>
            <span>订单消费</span>
          </div>
          <van-image width="27px" height="12px" :src="getImgUrl('publicMobile/bindbox/star-right.png')" />
        </div>
        <div class="task-content">
          <p>每日首次消费<span class="span">{{orderConsume.consumeNum}}</span>笔订单，获得<span class="span">{{orderConsume.consumeChanceNum}}</span>次开盲盒机会。</p>
          <p class="border-orders">
            <span class="index">1单</span>
            <span class="index">2单</span>
          </p>
          <p v-if="!orderConsume.consumeIsFinish">今日已消费<span class="span">{{orderConsume.consumeFinishNum}}</span>笔订单，还差<span class="span">{{orderConsume.consumeUnNum}}</span>笔。</p>
          <p v-else>今天已获取1次开盲盒机会了，明天继续努力吧~</p>
        </div>
        <div class="btn-yellow">
          <van-image width="225px" height="41px" :src="getImgUrl('publicMobile/bindbox/btn-yellow.png')" />
          <span class="text" @click="go('home')">去首页逛逛</span>
        </div>
      </div>
      <div class="tail">
        <van-image class="l" width="34px" height="2px" :src="getImgUrl('publicMobile/bindbox/logo-left-border.png')" />
        <div class="tail-text">约着买更便宜</div>
        <van-image class="r" width="34px" height="2px" :src="getImgUrl('publicMobile/bindbox/logo-right-border.png')" />
      </div>
    </div>

    <div class="bubble"
      @click="onBubble"
      v-show="bubbleShow&&validTimeMsg"
      :style="{
        'background-image': `url('${getImgUrl('publicMobile/bindbox/bubble.png')}')`
      }"
    >
      <van-swipe class="bubble-swipe" :autoplay="1000" style="height: 33px;" :show-indicators="false" indicator-color="white">
        <van-swipe-item>
          <span class="msg"> {{validTimeMsg}} </span>
          <span> {{validTimeMsg}} </span>
          <span> {{validTimeMsg}} </span>
        </van-swipe-item>
      </van-swipe>
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
        <div class="content" v-html="ruleText"></div>
      </div>
    </van-popup>

    <!-- 盲盒次数明细 -->
    <van-popup
      v-model="info"
      closeable
      position="bottom"
      round
      :style="{ height: '469px' }"
    >
      <div class="info-div">
        <div class="title">开盲盒明细</div>
        <div class="tips" v-if="bindBoxInfo.validTimeMsg">{{bindBoxInfo.validTimeMsg}}</div>
        <div class="tab-box">
          <div v-if="infoType!==1" class='tab-button' @click="getInfo(1)">全部明细</div>
          <div v-else class='info-act' @click="getInfo(1)">全部明细</div>
          <div v-if="infoType!==2" class='tab-button' @click="getInfo(2)">仅看获得</div>
          <div v-else class='info-act' @click="getInfo(2)">仅看获得</div>
          <div v-if="infoType!==3" class='tab-button' @click="getInfo(3)">仅看使用</div>
          <div v-else class='info-act' @click="getInfo(3)">仅看使用</div>
        </div>
        <div class="tab-list-box" v-if="bindBoxInfo.records">
          <div class="info-item" v-for="(item,index) in bindBoxInfo.records" :key="index">
            <div class="left">
              <p class="info-title">{{item.title}}</p>
              <p class="info-time">{{item.createTime}}</p>
            </div>
            <div class="right">{{item.transferType===1?'+'+item.num:'-'+item.num}}</div>
          </div>
        </div>
      </div>
    </van-popup>

    <!-- 拆盲盒结果弹窗 -->
    <van-popup :style="{ width:'100%', background: 'none',overflow: 'hidden'}" v-model="openResult">
      <!-- 默认开盒动画 -->
      <van-image width="100%" id="uno" class="unopened" :src="getImgUrl('publicMobile/bindbox/unopened.png')" />
      <van-image width="100%" id="oed" class="opened" :src="getImgUrl('publicMobile/bindbox/opened.png')" />
      <!-- 中奖光 -->
      <van-image id="light" class="light" :src="getImgUrl('publicMobile/bindbox/light.png')" />
      <!-- 结果 -->
      <div class="popup-content" id="last-popup">
        <div class="img-bg-box">
          <van-image v-if="popupType===1" width="358px" height="432px" :src="getImgUrl('publicMobile/bindbox/no-chance-bg.png')" />
          <van-image v-else-if="popupType===2" width="358px" height="432px" :src="getImgUrl('publicMobile/bindbox/sorry-bg.png')" />
          <van-image v-else-if="popupType===3" width="358px" height="432px" :src="getImgUrl('publicMobile/bindbox/prize-bg.png')" />
          <div class="popup-prize-box" v-if="popupType===3">
            <div class="popup-title">{{openData.goodsName}}</div>
            <van-image class="popup-img" width="30%" :src="openData.imageUrl" />
            <div class="popup-price">¥{{openData.salePrice/100}}</div>
          </div>
        </div>

        <div class="popup-btn"
          :style="{
            'background-image': `url('${getImgUrl('publicMobile/bindbox/btn-red.png')}')`
          }"
          @click="onPopup"
        >
          <span v-if="popupType===1">查看任务</span>
          <span v-else-if="popupType===2">知道了</span>
          <span v-else-if="popupType===3">免费收下</span>
        </div>
        <!-- 关闭按钮 -->
        <div class="popup-x" v-if="animationEnd" @click="closePopup">
          <van-image width="36px" height="36px" :src="getImgUrl('publicMobile/bindbox/popup-x.png')" />
        </div>
      </div>

    </van-popup>


  </div>
</template>

<script>
import Vue from 'vue';
import { Image as VanImage, Dialog, Swipe, SwipeItem, Lazyload, Popup, Loading } from 'vant';
import { getImgUrl } from '@/utils/tools';
import { appBaseUrl, meBaseUrl } from "@/constant/index";
import list from './components/list';
import box from './components/box';
import teamApi from '@/apis/bindbox';
import {
  goToApp,
} from '@/utils/userInfo';

Vue.use(Loading);
Vue.use(VanImage);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Lazyload);
Vue.use(Popup);
export default {
  data() {
    return {
      boxData: [
        {
          id: 1,
          in: 0,
          out: 0,
        },
        {
          id: 2,
          in: 0,
          out: 0,
        },
        {
          id: 3,
          in: 0,
          out: 0,
        },
        {
          id: 4,
          in: 0,
          out: 0,
        },
        {
          id: 5,
          in: 0,
          out: 1,
        },
        {
          id: 6,
          in: 0,
          out: 0,
        },
        {
          id: 7,
          in: 0,
          out: 0,
        },
        {
          id: 8,
          in: 0,
          out: 0,
        },
        {
          id: 9,
          in: 0,
          out: 0,
        }
      ],
      token: null,
      phone: null,
      isNewVersionShare: null,
      prizeNotice: [],
      show: false,
      info: false,
      prizeWinMsg: null,
      ruleText: null,
      bubbleShow: true,
      bindBoxInfo: false,
      infoType: 1,
      unuseNum: 0,
      inviteFriends: {},
      signIn: {},
      orderConsume: {},
      validTimeMsg: '',
      random: 5,
      intv: null,
      openFlag: true,
      selectFlag: true,
      openResult: false,
      popupType: 2, // 1-没机会 2-没中奖 3-中奖
      openData: {},
      hasSgin: false,
      win: false,
      animationEnd: false,
      opened: false,
      bgImgUrl: getImgUrl('publicMobile/bindbox/head-bg.png'),
      load: true,
    };
  },
  components: {
    [Dialog.Component.name]: Dialog.Component,
    list,
    box,
  },
  async created () {
    await this.getUserInfo();
    this.init();
    this.sameDayHasSgin();
  },
  async mounted() {
    await this.loadImg()
    this.interval();
  },
  methods: {
    getImgUrl,
    loadImg() {
      return new Promise((resolve, reject) => {
        let bgImg = new Image();
        bgImg.src = this.bgImgUrl; // 获取背景图片的url
        bgImg.onerror = () => {
          console.log('img onerror')
          reject()
        }
        bgImg.onload = () => { // 等背景图片加载成功后 去除loading
          setTimeout(() => {
            this.load = false
            resolve()
          }, 1000)
        }
      })
    },
    monitorUno() {
      let a = document.getElementById('uno');
      let b = document.getElementById('oed');
      let light = document.getElementById('light');
      let last = document.getElementById('last-popup');
      a.addEventListener('webkitAnimationEnd', () => {
        // 抖动结束
        a.style.display = 'none'
        b.style.display = 'block'
      });
      b.addEventListener('webkitAnimationEnd', () => {
        // 开盒结束
        b.style.display = 'none'
        if (this.popupType === 3) {
          light.style.opacity = 1
        }
        last.style.display = 'flex'
        this.animationEnd = true
      });
    },
    closePopup(type) {
      this.interval();
      if (type) {
        this.init()
      }
      this.openResult = false
    },
    onPopup() {
      switch(this.popupType) {
        case 1:
          // 滚动条拉到底
          this.closePopup()
          this.intoView()
          break
        case 2:
          // 初始化开盒流程后关闭弹窗
          this.closePopup(1)
          break
        case 3:
          // 跳转到商品详情页面
          const {  skuId, spuId, orderId, chanceId, memberId, orderType, activityId, objectId } = this.openData;
          const param = `?skuId=${skuId}&spuId=${spuId}&orderId=${orderId}&chanceId=${chanceId}&memberId=${memberId}&orderType=${orderType}&activityId=${activityId}&objectId=${objectId}`;
          console.log('param', param);
          goToApp(appBaseUrl, '/shopping/detail', param, this.$bridge)
          break
      }
    },
    intoView() {
      document.getElementById("anchor").scrollIntoView()
    },
    interval(stop) {
      clearInterval(this.intv)
      if (stop === 'stop') {
        return
      }
      this.intv = setInterval(() => {
        let r = Math.ceil(Math.random()*1000000000%9)
        if (this.random === r) {
          if (this.random === 9) {
            this.random -= 1
          } else {
            this.random += 1
          }
        } else {
          this.random = r
        }
      }, 1000);
    },
    sameDayHasSgin() {
      teamApi.sameDayHasSgin({}, {token: this.token}).then((res) => {
        if (res.data.todaySigned) {
          this.hasSgin = true
        }
      })
    },
    selectBox(id) {
      this.selectFlag = false
      if (id) {
        this.random = 0
        this.interval('stop')
      }
    },
    onBubble() {
      this.bubbleShow = false
    },
    goMyPrize() {
      console.log('goMyPrize-start')
      goToApp(meBaseUrl, '/web/my-prize', '', this.$bridge)
    },
    showPopupQa() {
      this.show = true
    },
    init() {
      teamApi.getTaskInfo({},{token: this.token}).then((res) => {
        if (res.code === 0) {
          const { prizeNotice, inviteFriends, signIn, orderConsume, prizeWinMsg, ruleText, validTimeMsg, unuseNum } = res.data;
          this.prizeNotice = prizeNotice
          this.prizeWinMsg = prizeWinMsg
          this.ruleText = ruleText
          this.validTimeMsg = validTimeMsg
          this.unuseNum = unuseNum
          this.inviteFriends= inviteFriends
          this.signIn = signIn
          this.orderConsume = orderConsume
          if (!unuseNum) {
            this.popupType = 1
          }
        }
      })
    },
    getInfo(type) {
      this.info = true
      this.infoType = type
      const param = {
        size: 100,
        next: 0,
      }
      if (type) {
        param.transferType = type
      }
      teamApi.getDetailList(param, {token: this.token}).then((res) => {
        if (res.code === 0) {
          this.bindBoxInfo = res.data
        }
      })
    },
    getUserInfo() {
      return new Promise((resolve) => {
        this.$bridge.callHandler('getUserInfo',{},(res) => {
          const d = JSON.parse(res)
          this.phone = d.data.phoneNumber
          this.token = d.data.accessToken
          resolve()
        })
      })
    },
    go(type) {
      switch(type) {
        case 'home':
          goToApp(appBaseUrl, '/tab/index?index=0', '', this.$bridge)
          break
        case 'sign-in':
          goToApp(appBaseUrl, '/flutter/mine/sign_in/detail', '', this.$bridge)
          break
        case 'invitaion':
          console.log('meBaseUrl', meBaseUrl)
          goToApp(meBaseUrl, '/web/invitation', '', this.$bridge)
          break
      }
    },
    open() {
      if (this.openFlag&&!this.selectFlag) {
        this.openFlag = false
        teamApi.openBox({phone: this.phone}, {token: this.token}).then((res) => {
          if (res.code === 0) {
            this.openData = res.data
            // 盲盒动画
            this.openResult = true
            if (res.data.goodsName) {
              this.popupType = 3
            }
            setTimeout(() => {
              this.monitorUno();
            }, 0)
          }
        })
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.load {
  position: fixed;
  width: 100%;
  min-height: 100vh;
  background-color: #d93d33;
  margin: auto;
  text-align: center;
  z-index: 99999;
}
  .main {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color:#f8d77e;
    position: relative;
  }
@keyframes rowup {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-140px);
  }
}
  .bubble {
    position: absolute;
    top: 670px;
    left: 4px;
    width: 140px;
    height: 33px;
    background-size: 100% 100%;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #D64D38;
    line-height: 33px;
    overflow: hidden;
    z-index: 9;
    .bubble-swipe {
      width: 280px;
      position: relative;
      top: 3px;
      left: 6px;
      .van-swipe-item{
        position: absolute;
        animation: 14s rowup linear infinite normal;
      }
      .msg {
        // position: absolute;
        // animation: 10s rowup linear infinite normal;
      }
    }
  }



  .lead-box {
    position: absolute;
    top: 339px;
    left: 50%;
    transform: translateX(-50%);
    width: 286px;
    height: 286px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  .num {
    position: absolute;
    top: 650px;
    left: 42px;
    height: 25px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 20px;
    z-index: 9;
    .chance {
      font-size: 18;
      text-decoration: underline;
    }
  }
  .my-swipe .van-swipe-item {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 12px;
    line-height: 26px;
    text-align: center;
    color: #FBE5C4;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .user-pic {
    margin-left: 2px;
    margin-right: 2px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }
  .user-span {
    width: 170px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .look {
    position: absolute;
    top: 650px;
    right: 44px;
    text-decoration: underline;
    height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 20px;
    z-index: 9;
  }
  .open {
    position: absolute;
    top: 682px;
    left: 87px;
    width: 202px;
    height: 90px;
    z-index: 9;
  }
  .tab {
    position: absolute;
    right: 0;
    width: 63px;
    height: 35px;
    background: #64A7E9;
    box-shadow: 2px 3px 5px 0px rgba(62, 129, 228, 0.46);
    border-radius: 107px 0px 0px 107px;
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      margin-left: 4px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 23px;
      height: 23px;
      font-size: 11px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 12px;
      .p1 {
        margin-bottom: 2px;
        width: 24px;
        height: 50%;
      }
      .p2 {
        width: 24px;
        height: 50%;
      }
    }
  }
  .tab1 {
    top: 95px;
  }
  .tab2 {
    top: 139px;
  }
  .winning-list {
    position: absolute;
    top: 286px;
    left: 50%;
    transform: translateX(-50%);
    width: 180px;
    height: 26px;
    border-radius: 6px;
    line-height: 26px;
    z-index: 9;
    background-color: #c3331d;
    overflow: hidden;
  }
  .title-one {
    position: absolute;
    top: 60px;
    width: 100%;
    height: 20px;
    font-size: 40px;
    font-family: Tensentype-RuiHeiJ-W4, Tensentype-RuiHeiJ;
    font-weight: normal;
    color: #FFFFFF;
    line-height: 20px;
    text-shadow: -1px 3px 5px #2160DD;
    text-align: center;
  }
  .title-two {
    position: absolute;
    top: 116px;
    width: 100%;
    height: 20px;
    font-size: 48px;
    font-family: Tensentype-RuiHeiJ-W4, Tensentype-RuiHeiJ;
    font-weight: normal;
    color: #FFFFFF;
    line-height: 20px;
    letter-spacing: 1px;
    text-shadow: -1px 3px 5px #2160DD;
    text-align: center;
  }
  .subtitle {
    position: absolute;
    top: 157px;
    width: 100%;
    height: 22px;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
    line-height: 22px;
    text-shadow: 0px 2px 2px #6F9BE5;
    text-align: center;
  }
  .goods-list {
    width: 100%;
    background-color: #EA5737;
    border-bottom: 8px solid #B64030;
    .list-box {
      padding: 19px 0 27px 16px;
      overflow: hidden;
      white-space: nowrap;
      overflow-x: auto;
      .list-box-index {
        position: relative;
        height: 71px;
      }
    }
  }
  .title-box {
    padding: 0 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left-icon {
      width: 45px;
    }
    .star-left {
      width: 27px;
    }
    .title {
      height: 25px;
      font-size: 18px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #FEFDE5;
      line-height: 25px;
      text-shadow: 0px 2px 1px rgba(0, 0, 0, 0.25);
    }
    .star-right {
      width: 27px;
    }
    .right-icon {
      width: 45px;
    }
  }
  .text-more {
    color: #F7FD95;
  }
  .task-box {
    padding-top: 11px;
    padding-bottom: 12px;
    background-color: #EA5737;
    .item {
      position: relative;
      margin: 0 auto;
      margin-bottom: 18px;
      width: 345px;
      height: 199px;
      background: linear-gradient(180deg, #D63C24 0%, #C3331D 100%);
      border-radius: 8px;
    }
    .task-title {
      padding-top: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .task-title-text {
      margin: 0 7px;
      height: 21px;
      font-size: 15px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #FEFDE5;
      line-height: 21px;
    }
    .box-one {
      margin-top: 12px;
    }
    .box-two {
      margin-top: 18px;
    }
    .box-three {
      margin-top: 18px;
    }
    .task-content {
      margin: 13px auto;
      width: 306px;
      height: 85px;
      color: #FBE5C4;
      font-size: 14px;
      line-height: 19px;
      .span {
        color: #F7FD95;
        font-size: 18px;
      }
      .task-flex {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
    }
    .btn-yellow {
      margin: 0 auto;
      text-align: center;
      position: relative;
      .text {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: 0 auto;
        height: 100%;
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #AD2420;
        line-height: 41px;
        z-index: 9;
      }
    }
  }
  .border-orders {
    margin-top: 16px;
    padding-top: 10px;
    padding-bottom: 6px;
    position: relative;
    width: 116px;
    display: flex;
    justify-content: space-around;
    .index {
      position: relative;
      font-size: 13px;
      font-family: HelveticaNeue;
      color: #FFFFFF;
      line-height: 15px;
    }
    .index::after {
      content: '';
      position: absolute;
      top: -15px;
      left: 6px;
      width: 3px;
      height: 3px;
      background: #CC3720;
      z-index: 11;
    }
  }
  .border-orders::after {
    content: '';
    position: absolute;
    top: -7px;
    left: 0;
    width: 100%;
    height: 7px;
    background: #FFEBCD;
    border-radius: 4px;
  }
  .border-days {
    margin-top: 16px;
    padding-top: 10px;
    padding-bottom: 6px;
    position: relative;
    width: 165px;
    display: flex;
    justify-content: space-around;
    .index {
      position: relative;
      font-size: 13px;
      font-family: HelveticaNeue;
      color: #FFFFFF;
      line-height: 15px;
    }
    .index::after {
      content: '';
      position: absolute;
      top: -15px;
      left: 6px;
      width: 3px;
      height: 3px;
      background: #CC3720;
      z-index: 11;
    }
  }
  .border-days::after {
    content: '';
    position: absolute;
    left: 0;
    top: -7px;
    width: 100%;
    height: 7px;
    background: #FFEBCD;
    border-radius: 4px;
  }
  .tail {
    padding-top: 11px;
    padding-bottom: 29px;
    display: flex;
    justify-content: center;
    align-items: center;
    .tail-text {
      padding: 0 7px;
      height: 22px;
      font-size: 18px;
      font-family: Tensentype-RuiHeiJ-W4, Tensentype-RuiHeiJ;
      font-weight: normal;
      color: rgb(255, 255, 255, .48);
      line-height: 22px;
    }
  }
  .element::-webkit-scrollbar {display:none}
  .rule-div {
    width: 100%;
    height: 482px;
    overflow: hidden;
    overflow-y: auto;
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
      padding: 32px 16px 50px 16px;
      text-align: justify;
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #666666;
      line-height: 22px;
    }
  }
  .info-div {
    .tab-list-box {
      padding: 12px;
      margin: 0 auto;
      width: 343px;
      height: 274px;
      background: #FAFAFA;
      border-radius: 4px;
      overflow: hidden;
      .info-item {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #EEEEEE;
        .left {
          display: flex;
          flex-direction: column;
          align-items: center;
          .info-title {
            margin-bottom: 2px;
            height: 20px;
            font-size: 14px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #333333;
            line-height: 20px;
          }
          .info-time {
            height: 14px;
            font-size: 10px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #999999;
            line-height: 14px;
          }
        }
        .right {
          height: 21px;
          font-size: 15px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #E5352F;
          line-height: 21px;
        }
      }
    }
    .title {
      height: 61px;
      font-size: 18px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
      line-height: 61px;
      text-align: center;
    }
    .tips {
      margin-bottom: 24px;
      width: 100%;
      height: 33px;
      line-height: 33px;
      text-align: center;
      background: #FCEAEA;
      box-shadow: 1px 0px 4px 0px rgba(0, 0, 0, 0.02);
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #E5352F;
    }
    .tab-box {
      margin-bottom: 4px;
      height: 40px;
      padding-left: 16px;
      display: flex;
      justify-content: flex-start;
      .tab-button {
        margin-right: 6px;
        width: 85px;
        height: 40px;
        line-height: 40px;
        background: #F5F5F5;
        border-radius: 4px;
        text-align: center;
        font-size: 11px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #666666;
      }
      .info-act {
        margin-right: 6px;
        width: 85px;
        height: 40px;
        line-height: 40px;
        border-radius: 4px;
        text-align: center;
        font-size: 11px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        background: #FCEAEA;
        border: 1px solid #E5352F;
        color: #E5352F;
      }
    }
  }
  @keyframes rotate {
    0%{-webkit-transform:rotate(0deg);}
    25%{-webkit-transform:rotate(90deg);}
    50%{-webkit-transform:rotate(180deg);}
    75%{-webkit-transform:rotate(270deg);}
    100%{-webkit-transform:rotate(360deg);}
  }
  @keyframes bindbox {
    0%{
      -webkit-transform: translateX(0) translateY(0) scale(1);
    }
    10%{
      -webkit-transform: translateX(20px) translateY(-20px) scale(.9);
    }
    20%{
      -webkit-transform: translateX(-20px) translateY(20px) scale(.88);
    }
    30%{
      -webkit-transform: translateX(-20px) translateY(-20px) scale(.86);
    }
    40%{
      -webkit-transform: translateX(20px)  translateY(20px) scale(.84);
    }
    50%{
      -webkit-transform: translateX(-20px)  translateY(20px) scale(.82);
    }
    60%{
      -webkit-transform: translateX(20px)  translateY(-20px) scale(.8);
    }
    70%{
      -webkit-transform: translateX(-20px) translateY(-20px) scale(.78);
    }
    80%{
      -webkit-transform: translateX(-20px)  translateY(20px) scale(.76);
    }
    90%{
      -webkit-transform: translateX(20px)  translateY(-20px) scale(.74);
    }
    100%{
      -webkit-transform: translateX(-20px) translateY(-20px) scale(.72);
    }
  }
  @keyframes openbox {
    0%{
      opacity: 1;
      -webkit-transform: translateY(0) scale(1);
    }
    100%{
      opacity: 0;
      -webkit-transform: translateY(200px) scale(.6);
    }
  }
  .unopened {
    position: relative;
    top: -100px;
    animation: bindbox 1s ease-in-out 1 normal;
  }
  .opened {
    display: none;
    position: relative;
    top: -100px;
    animation: openbox .4s ease-in 1 normal;
  }
  .light {
    position: relative;
    width: 200%;
    top: -50px;
    left: -50%;
    opacity: 0;
    animation:rotate 4s linear infinite;
  }
  @keyframes last {
    0%{
      opacity: 0;
      -webkit-transform: scale(.2);
    }
    20% {
      opacity: 1;
      -webkit-transform: scale(1.1);
    }
    40%{
      opacity: 1;
      -webkit-transform: scale(.9);
    }
    60%{
      opacity: 1;
      -webkit-transform: scale(1.05);
    }
    80%{
      opacity: 1;
      -webkit-transform: scale(.95);
    }
    100%{
      opacity: 1;
      -webkit-transform: scale(1);
    }
  }
  .popup-content {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    width: 100%;
    height: 100%;
    z-index: 11;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    display: none;
    animation: last 1s ease-in-out 1 normal;
    .img-bg-box {
      position: relative;
      margin-bottom: 28px;
      .popup-prize-box {
        position: absolute;
        top: 152px;
        display: flex;
        width: 100%;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        .popup-title {
          font-size: 18px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #333333;
          line-height: 25px;
        }
        .popup-img {
          width: 100%;
          margin: 12px 0 21px 0;
        }
        .popup-price {
          font-size: 16px;
          font-family: Avenir-Medium, Avenir;
          font-weight: 500;
          color: #333333;
          line-height: 22px;
        }
      }
    }
  }
  .popup-btn {
    position: relative;
    margin: 0 auto;
    width: 235px;
    height: 53px;
    line-height: 53px;
    text-align: center;
    margin-bottom: 31px;
    background-size: 100% 100%;
    font-size: 26px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
  }
  .popup-x {
    text-align: center;
    height: 36px;
  }
.btn-disable {
  text-align: center;
  .text-sgin {
    margin: 0 auto;
    display: block;
    width: 225px;
    height: 41px;
    background-color: #BDBDBD;
    border-radius: 22px;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
    line-height: 41px;
    z-index: 9;
  }
}
</style>

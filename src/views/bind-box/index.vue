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
    <div class="subtitle">华为mate40手机、海信电视机等你来开</div>

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
    <div class="list-box-text" v-if="appTips">
      <div class="list_content_box">
        <div class="text_index">{{appTips}}</div>
      </div>
    </div>
    <div class="list-box-bottom-border"></div>
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
            <!-- <span class="text-more">任务一：</span> -->
            <span>邀请好友</span>
          </div>
          <van-image width="27px" height="12px" :src="getImgUrl('publicMobile/bindbox/star-right.png')" />
        </div>
        <div class="task-content">
          <div class="task-flex">
            <p>每成功邀请<span class="span">{{inviteFriends.inviteNum}}</span>位新用户注册约购APP，获得<span class="span">{{inviteFriends.chanceNum}}</span>次开盲盒机会，每天最多获得{{inviteFriends.inviteDayMaxNum}}次开盒机会。</p>
            <p v-if="!inviteFriends.inviteIsFinish">本次已邀请<span class="span">{{blindboxStatus?inviteFriends.inviteFinishNum:'x'}}</span>人，还差<span class="span">{{blindboxStatus?inviteFriends.inviteUnNum:'x'}}</span>人。(已获取{{inviteFriends.inviteActivityChanceNum}}次机会)</p>
            <p v-else>今天已经圆满完成任务，明天再继续努力吧~</p>
            <p class="new-p">邀请新用户仅限当前页面的分享邀请有效。</p>
          </div>
        </div>
        <div class="btn-yellow">
          <van-image width="225px" height="41px" :src="getImgUrl('publicMobile/bindbox/btn-yellow.png')" />
          <span class="text" @click="go('invitaion')">{{inviteFriends.inviteIsTaskFinish?'立即邀请':'领取任务'}}</span>
        </div>
      </div>

      <div class="item box-two" v-if="signIn.signInIsShow">
        <div class="task-title">
          <van-image width="27px" height="12px" :src="getImgUrl('publicMobile/bindbox/star-left.png')" />
          <div class="task-title-text">
            <!-- <span class="text-more">任务二：</span> -->
            <span>签到任务</span>
          </div>
          <van-image width="27px" height="12px" :src="getImgUrl('publicMobile/bindbox/star-right.png')" />
        </div>
        <div class="task-content">
          <p>每连续签到<span class="span">{{signIn.signInNum}}</span>天，获得<span class="span">{{signIn.signInChanceNum}}</span>次开盲盒机会。</p>
          <p class="border-days" v-if="signIn.arr">
            <span :class="(signIn.signInFinishNum===0&&signIn.signInNum===1)||index+1<=signIn.signInFinishNum?'ed':'index'" v-for="(item,index) in signIn.arr" :key="index">
              <span v-if="signIn.signInFinishNum==0">{{index+1}}天</span>
              <span v-else-if="index+1<=signIn.signInFinishNum" class="finish">已完成</span>
              <span v-else>{{index+1}}天</span>
            </span>
          </p>
          <p v-if="!signIn.signInIsFinish">本次已连签<span class="span">{{blindboxStatus?signIn.signInFinishNum:'x'}}</span>天，还差<span class="span">{{blindboxStatus?signIn.signInUnNum:'x'}}</span>天。(已获取{{signIn.signInActivityChanceNum}}次机会)</p>
          <p v-else>已完成全部签到任务 棒~</p>
        </div>
        <div class="btn-yellow" v-if="!hasSgin">
          <van-image width="225px" height="41px" :src="getImgUrl('publicMobile/bindbox/btn-yellow.png')" />
          <span class="text" @click="go('sign-in')">{{signIn.signInIsTaskFinish?'立即签到':'领取任务'}}</span>
        </div>
        <div class="btn-disable" v-else>
          <span class="text-sgin">今日已签到</span>
        </div>
      </div>

      <div class="item box-three" v-if="orderConsume.consumeIsShow">
        <div class="task-title">
          <van-image width="27px" height="12px" :src="getImgUrl('publicMobile/bindbox/star-left.png')" />
          <div class="task-title-text">
            <!-- <span class="text-more">任务三：</span> -->
            <span>每日首单消费</span>
          </div>
          <van-image width="27px" height="12px" :src="getImgUrl('publicMobile/bindbox/star-right.png')" />
        </div>
        <div class="task-content">
          <p>每日首次消费<span class="span">{{orderConsume.consumeNum}}</span>笔订单，获得<span class="span">{{orderConsume.consumeChanceNum}}</span>次开盲盒机会。</p>
          <p class="border-orders" v-if="orderConsume.arr">
            <span :class="(orderConsume.consumeFinishNum===0&&orderConsume.consumeNum==1)||index+1<=orderConsume.consumeFinishNum?'ed':'index'" class="index" v-for="(item,index) in orderConsume.arr" :key="index">
              <span v-if="orderConsume.consumeFinishNum==0">{{index+1}}单</span>
              <span v-else-if="index+1<=orderConsume.consumeFinishNum" class="finish">已完成</span>
              <span v-else>{{index+1}}单</span>
            </span>
          </p>
          <p v-if="!orderConsume.consumeIsFinish">今日已消费<span class="span">{{blindboxStatus?orderConsume.consumeFinishNum:'x'}}</span>笔订单，还差<span class="span">{{blindboxStatus?orderConsume.consumeUnNum:'x'}}</span>笔。</p>
          <p v-if="!orderConsume.consumeIsFinish">(已获取{{orderConsume.consumeActivityChanceNum}}次机会)</p>
          <p v-else>今天已获取1次开盲盒机会了，明天继续努力吧~</p>
          <p class="new-p">完成消费任务后退款，将取消盲盒活动奖品发放。</p>
        </div>
        <div class="btn-yellow">
          <van-image width="225px" height="41px" :src="getImgUrl('publicMobile/bindbox/btn-yellow.png')" />
          <span class="text" @click="go('home')">{{orderConsume.consumeIsTaskFinish?'去首页逛逛':'领取任务'}}</span>
        </div>
      </div>

      <div class="item box-f" v-if="storeConsume&&storeConsume!=={}&&storeConsume.storeConsumeIsShow">
        <div class="task-title">
          <van-image width="27px" height="12px" :src="getImgUrl('publicMobile/bindbox/star-left.png')" />
          <div class="task-title-text">
            <span>采购订单</span>
          </div>
          <van-image width="27px" height="12px" :src="getImgUrl('publicMobile/bindbox/star-right.png')" />
        </div>
        <div class="task-content">
          <div class="task-flex">
            <p>每日采购<span class="span">{{storeConsume.storeConsumeNum}}</span>笔≥<span class="span">{{storeConsume.storeConsumePrice/100}}</span>元的集约订单，获得{{storeConsume.storeConsumeChanceNum}}次开盲盒机会，每天封顶获得{{storeConsume.storeConsumeDayMaxNum}}次开盲盒机会。</p>
            <p v-if="!storeConsume.storeConsumeIsFinish">本次已消费<span class="span">{{blindboxStatus?storeConsume.storeConsumeFinishNum:'x'}}</span>笔订单，还差<span class="span">{{blindboxStatus?storeConsume.storeConsumeUnNum:'x'}}</span>笔。(已获取{{storeConsume.storeConsumeActivityChanceNum}}次机会)</p>
            <p v-else>今天已经圆满完成任务，明天再继续努力吧~</p>
            <p class="new-p">完成消费任务后退款，将取消盲盒活动奖品发放。</p>
          </div>
        </div>
        <div class="btn-yellow">
          <van-image width="225px" height="41px" :src="getImgUrl('publicMobile/bindbox/btn-yellow.png')" />
          <span class="text" @click="go('index')">{{storeConsume.storeConsumeIsTaskFinish?'立即参与':'领取任务'}}</span>
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
        <textarea class="content" readonly v-model="ruleText"></textarea>
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
              <p class="info-title van-ellipsis">{{item.title}}</p>
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
            <div class="popup-title van-ellipsis">{{openData.goodsName}}</div>
            <van-image class="popup-img" width="30%" :src="openData.imageUrl" />
            <div class="popup-price"><div class="text">价值</div>¥{{openData.salePrice/100}}</div>
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
          <span v-else-if="popupType===3">免费兑换</span>
        </div>
        <!-- 关闭按钮 -->
        <div class="popup-x" v-if="animationEnd" @click="closePopup(1)">
          <van-image width="36px" height="36px" :src="getImgUrl('publicMobile/bindbox/popup-x.png')" />
        </div>
      </div>

    </van-popup>


  </div>
</template>

<script>
import Vue from 'vue';
import { Image as VanImage, Dialog, Swipe, SwipeItem, Lazyload, Popup, Loading, Field, Toast } from 'vant';
import { getImgUrl } from '@/utils/tools';
import { appBaseUrl, meBaseUrl } from "@/constant/index";
import list from './components/list';
import box from './components/box';
import teamApi from '@/apis/bindbox';
import {
  goToApp,
  setNavigationBar,
  share,
} from '@/utils/userInfo';
Vue.use(Toast);
Vue.use(Field);
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
      infoType: 0,
      unuseNum: 0,
      blindboxStatus: 0,
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
      shareData: null,
      inviteCode: null,
      couponInviteId: null,
      clicked:false,
      storeNo: null,
    };
  },
  components: {
    [Dialog.Component.name]: Dialog.Component,
    list,
    box,
  },
  async created () {

  },
  async mounted() {
    const {
      query,
    } = this.$router.history.current;
    this.inviteCode = query.inviteCode;
    this.couponInviteId = query.couponInviteId;

    const rightButton = {
      type: 'share',
      object: {
        contentType: 3,
        paramId: 7,
        shareType: 3,
        sourceType: 3,
      }
    };
    const titleLabel = {
      titleLabelColor: '', // 暂时不会传
      font: '', // 暂时不会传
      text: '', // 默认documenttitle
    };
    if (this.couponInviteId) {
      rightButton.object.shareObjectNo = this.couponInviteId
    } 
    setNavigationBar('#FFFFFF', rightButton, titleLabel);
    await this.loadImg()
    this.interval();
    await this.getUserInfo();
    this.getTask(1);
    this.getTask(2);
    this.getTask(3);
    this.getTask(4);
    this.init();
    this.sameDayHasSgin();
  },
  methods: {
    getImgUrl,
    getTask(num) {
      // if (this.clicked) {
      //   return
      // }
      // this.clicked = true
      const param = {
        type: num,
      }
      if (this.couponInviteId) {
        param.configId = this.couponInviteId
      }
      teamApi.getTask(param, {token: this.token}).then(() => {
        // this.clicked = false
        // this.init();
        // Toast('领取成功');
      })
    },
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
          }, 200)
        }
      })
    },
    // 开盒动画
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
      // 初始化选中
      this.selectFlag = true
      // 关闭弹窗
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
          this.closePopup(1)
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
      if (!this.token) {
        this.$router.push({
          path: '/web/new-share',
          query: {
            inviteCode: this.inviteCode
          },
        });
        return
      }
      goToApp(meBaseUrl, '/web/my-prize?_immersive=0', '', this.$bridge)
    },
    showPopupQa() {
      if (!this.token) {
        this.$router.push({
          path: '/web/new-share',
          query: {
            inviteCode: this.inviteCode
          },
        });
        return
      }
      this.show = true
    },
    timestampToTime(timestamp) {
      var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '.';
      var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '.';
      var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
      var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
      var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes());
      return Y+M+D+h+m;
    },
    init() {
      const param = {
        storeNo: this.storeNo
      }
      if (this.couponInviteId) {
        param.configId = this.couponInviteId
      }
      teamApi.getTaskInfo(param, {token: this.token}).then((res) => {
        if (res.code === 0) {
          const { prizeNotice, configId, appTips, inviteFriends, storeConsume, signIn, orderConsume, prizeWinMsg, ruleText, validTimeMsg, unuseNum, blindboxStatus, activityStartTime, activityEndTime } = res.data;
          this.prizeNotice = prizeNotice
          this.couponInviteId = configId
          this.prizeWinMsg = prizeWinMsg
          this.ruleText = ruleText
          this.validTimeMsg = validTimeMsg
          this.unuseNum = unuseNum
          this.inviteFriends= inviteFriends
          this.appTips = appTips
          this.storeConsume = storeConsume
          this.signIn = signIn
          this.blindboxStatus = blindboxStatus
          this.activityStartTime = this.timestampToTime(activityStartTime)
          this.activityEndTime = this.timestampToTime(activityEndTime)
          this.signIn.arr = []
          for(let i=0;i<signIn.signInNum;i++) {
            this.signIn.arr.push({id:i})
          }
          this.orderConsume = orderConsume
          this.orderConsume.arr = []
          for(let z=0;z<orderConsume.consumeNum;z++) {
            this.orderConsume.arr.push({id:z})
          }
          if (!unuseNum) {
            this.popupType = 1
          }
          if (!blindboxStatus) {
            Dialog({ message: '活动已结束，谢谢您的参与。' });
          }
          if (blindboxStatus == 2) {
            Dialog({ title: `活动未开始`,message: `活动时间：${this.activityStartTime}-${this.activityEndTime}` });
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
      if (this.couponInviteId) {
        param.configId = this.couponInviteId
      }
      if (type !== 1) {
        param.transferType = type - 1
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
          this.storeNo = d.data.storeNo
          resolve()
        })
      })
    },
    go(type) {
      if (!this.blindboxStatus) {
        Dialog({ message: '活动已结束，谢谢您的参与。' });
        return
      }
      if (this.blindboxStatus == 2) {
        Dialog({ title: `活动未开始`,message: `活动时间：${this.activityStartTime}-${this.activityEndTime}` });
        return
      }
      switch(type) {
        case 'index':
          if (this.storeConsume.storeConsumeIsTaskFinish) {
            goToApp(appBaseUrl, '/flutter/store/member/index', '', this.$bridge)
          } else {
            this.getTask(4)
          }
          break
        case 'home':
          if (this.orderConsume.consumeIsTaskFinish) {
            goToApp(appBaseUrl, '/tab/index?index=0', '', this.$bridge)
          } else {
            this.getTask(3)
          }
          break
        case 'sign-in':
          if (this.signIn.signInIsTaskFinish) {
            goToApp(appBaseUrl, '/flutter/mine/sign_in/detail', '', this.$bridge)
          } else {
            this.getTask(1)
          }
          break
        case 'invitaion':
          if (this.inviteFriends.inviteIsTaskFinish) {
            share({
              contentType: 3,
              paramId: 7,
              shareType: 3,
              sourceType: 3,
            })
          } else {
            this.getTask(2)
          }
          break
      }
    },
    open() {
      if (!this.token) {
        this.$router.push({
          path: '/web/new-share',
          query: {
            inviteCode: this.inviteCode
          },
        });
        return
      }
      if (!this.blindboxStatus) {
        Dialog({ message: '活动已结束，谢谢您的参与。' });
        return
      }
      if (this.blindboxStatus == 2) {
        Dialog({ title: `活动未开始`,message: `活动时间：${this.activityStartTime}-${this.activityEndTime}` });
        return
      }
      if (!this.unuseNum) {
        this.openResult = true
        this.popupType = 1
        setTimeout(() => {
          this.monitorUno();
        }, 0)
        return
      }
      if (this.openFlag&&!this.selectFlag) {
        this.openFlag = false
        teamApi.openBox({phone: this.phone}, {token: this.token}).then((res) => {
          if (res.code === 0) {
            this.openData = res.data
            // 盲盒动画
            this.openResult = true
            if (res.data.goodsName) {
              this.popupType = 3
            } else {
              this.popupType = 2
            }
            this.openFlag = true
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
  padding-top: 200px;
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
    transform: translateX(-375px);
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
    z-index: 9;
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
    top: 159px;
    width: 100%;
    height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
    line-height: 20px;
    text-shadow: 0px 2px 2px #6F9BE5;
    text-align: center;
  }
  .goods-list {
    width: 100%;
    background-color: #EA5737;
    .list-box {
      padding: 19px 0 0 16px;
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

  .list-box-text {
    width: 100%;
    height: 14px;
    background-color: #EA5737;
    font-size: 10px;
    font-weight: 400;
    color: #FBF0BB;
    line-height: 14px;
    .list_content_box {
      margin: 0 auto;
      width: 351px;
      height: 100%;
      overflow: hidden;
      .text_index {
        width: 750px;
        height: 100%;
        text-align: left;
        display: flex;
        flex-wrap: nowrap;
        animation: rowup 10s linear infinite;
        transition: all 1s;
      }
    }
  }

  .list-box-bottom-border {
    width: 100%;
    height: 8px;
    background-color: #B64030;
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
      height: 199px;
      .task-content {
        height: 85px;
      }
    }
    .box-two {
      margin-top: 18px;
      height: 199px;
      .task-content {
        height: 85px;
      }
    }
    .box-three {
      margin-top: 18px;
      height: 226px;
      .task-content {
        height: 150px;
      }
      .btn-yellow {
        top: -34px;
      }
    }
    .box-f {
      margin-top: 18px;
      height: 200px;
      .task-content {
        height: 85px;
      }
    }
    .task-content {
      margin: 13px auto;
      width: 306px;
      height: 130px;
      color: #FBE5C4;
      font-size: 14px;
      line-height: 19px;
      .new-p {
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #F2CB33;
      }
      .span {
        color: #F7FD95;
        font-size: 18px;
      }
      .task-flex {
        height: 100%;
        display: flex;
        flex-direction: column;
        // justify-content: space-between;
        .new-p {
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #F2CB33;
        }
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
      .finish {
        height: 16px;
        font-size: 11px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #F2CB33;
        line-height: 16px;
      }
    }
    .ed {
      position: relative;
      font-size: 13px;
      font-family: HelveticaNeue;
      color: #FFFFFF;
      line-height: 15px;
      .finish {
        height: 16px;
        font-size: 11px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #F2CB33;
        line-height: 16px;
      }
    }
    .ed::after {
      content: '';
      position: absolute;
      top: -15px;
      left: 6px;
      width: 3px;
      height: 3px;
      background: #CC3720;
      z-index: 11;
    }
    .index::after {
      content: '';
      position: absolute;
      top: -15px;
      left: 6px;
      width: 3px;
      height: 3px;
      background: rgba(234, 87, 55, 0.51);
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
      .finish {
        height: 16px;
        font-size: 11px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #F2CB33;
        line-height: 16px;
      }
    }
    .ed {
      position: relative;
      font-size: 13px;
      font-family: HelveticaNeue;
      color: #FFFFFF;
      line-height: 15px;
      .finish {
        height: 16px;
        font-size: 11px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #F2CB33;
        line-height: 16px;
      }
    }
    .ed::after {
      content: '';
      position: absolute;
      top: -15px;
      left: 6px;
      width: 3px;
      height: 3px;
      background: #CC3720;
      z-index: 11;
    }
    .index::after {
      content: '';
      position: absolute;
      top: -15px;
      left: 6px;
      width: 3px;
      height: 3px;
      background: rgba(234, 87, 55, 0.51);
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
  .info-div {
    .tab-list-box {
      padding: 12px;
      margin: 0 auto;
      width: 343px;
      height: 274px;
      background: #FAFAFA;
      border-radius: 4px;
      overflow: hidden;
      overflow-y: auto;
      .info-item {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #EEEEEE;
        .left {
          width: 140px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          .info-title {
            margin-bottom: 2px;
            width: 100%;
            height: 20px;
            font-size: 14px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #333333;
            line-height: 20px;
          }
          .info-time {
            width: 100%;
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
          width: 200px;
          height: 25px;
          font-size: 18px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #333333;
          line-height: 25px;
          overflow: hidden;
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
          .text {
            display: inline-block;
            font-size: 14px;
            margin-right: 4px;
          }
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

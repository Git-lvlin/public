<template>
  <div class="game">
    <van-loading class="load" v-if="load" />
    <!-- <van-image
      class="banner"
      width="100%"
      height="812px"
      lazy-load
      :src="bgImgUrl"
    /> -->
    <!-- 游戏未开始 -->
    <div class="init" v-if="!star">
      <div class="top-right-box">
        <van-image
          class="share"
          width="32px"
          height="32px"
          :src="getImgUrl('publicMobile/game/share.png')"
          @click="goTo('share')"
        />
        <van-image
          class="skill"
          width="32px"
          height="32px"
          :src="getImgUrl('publicMobile/game/skill.png')"
          @click="goTo('skill')"
        />
        <van-image
          class="opp"
          width="32px"
          height="32px"
          :src="getImgUrl('publicMobile/game/opp.png')"
          @click="goTo('opp')"
        />
        <van-image
          class="rank"
          width="32px"
          height="32px"
          :src="getImgUrl('publicMobile/game/rank.png')"
          @click="goTo('rank')"
        />
        <van-image
          class="red-box"
          width="40px"
          height="44px"
          :src="getImgUrl('publicMobile/game/red-box.png')"
          @click="goTo('red')"
        />
      </div>

      <div class="join-control">
        <div class="index-swiper">
          <JoinUser :prizeWinMsg="prizeWinMsg" />
        </div>
      </div>
      <van-image
        class="banner"
        width="100%"
        height="812px"
        lazy-load
        :src="bgImgUrl"
      />
      <van-image
        class="title"
        width="207px"
        height="49px"
        lazy-load
        :src="getImgUrl('publicMobile/game/title.png')"
      />
      <div class="sub-title" v-if="!end">已有{{joinNum}}人参与，您今天还有{{chanceNum}}次参与机会</div>
      <div class="sub-title" v-else>已有{{joinNum}}人参与</div>
      <van-image
        class="main"
        width="309px"
        height="450px"
        lazy-load
        :src="getImgUrl('publicMobile/game/main.png')"
      />
      <div class="btn-box" v-if="demo">
        <van-image
          class="star"
          width="193px"
          height="48px"
          lazy-load
          @click="go"
          :src="getImgUrl('publicMobile/game/star.png')"
        />
        <van-image
          class="demo"
          width="193px"
          height="48px"
          lazy-load
          @click="goDemo"
          :src="getImgUrl('publicMobile/game/demo.png')"
        />
        <div class="demo-text">试玩游戏不消耗机会</div>
        <div class="time">活动时间：{{actTime}}</div>
      </div>
      <div class="btn-box-no" v-if="!demo&&!end">
        <van-image
          class="star"
          width="193px"
          height="48px"
          lazy-load
          @click="go"
          :src="getImgUrl('publicMobile/game/star.png')"
        />
        <div class="time">活动时间：{{actTime}}</div>
      </div>
      <div class="btn-box-end" v-if="end">
        <van-image
          class="star"
          width="193px"
          height="54px"
          lazy-load
          :src="getImgUrl('publicMobile/game/end.png')"
        />
        <van-image
          class="tip"
          width="311px"
          height="124px"
          lazy-load
          :src="getImgUrl('publicMobile/game/tip.png')"
        />
        <div class="time padding-b">活动时间：{{actTime}}</div>
      </div>
    </div>


    <!-- 游戏时 -->
    <div class="in-game" v-if="star" @click="click">
      <div class="top-right-box">
        <van-image
          class="share"
          width="32px"
          height="32px"
          :src="getImgUrl('publicMobile/game/share.png')"
          @click="goTo('share')"
        />
        <van-image
          class="skill"
          width="32px"
          height="32px"
          :src="getImgUrl('publicMobile/game/skill.png')"
          @click="goTo('skill')"
        />
        <div @click="onMusic">
          <MusicPlay ref='music' />
        </div>
      </div>
      <van-image
        class="banner"
        width="100%"
        height="812px"
        lazy-load
        :src="bgImgUrl"
      />
      <!-- 游戏顶部固定区域 -->
      <div class="game-title">参与游戏赢大奖</div>
      <div class="user-box">
        <div class="user-pic">
          <van-image
            width="64px"
            height="64px"
            :src="getImgUrl('publicMobile/game/floor1.png')"
          />
        </div>
        <div class="data">{{currentFloor}}层</div>
      </div>

      <!-- 游戏活动区域 -->
      <div id="border" v-show="currentFloor"></div>
      <div id="beat" v-if="show">
        <van-image
          width="100%"
          height="100%"
          :src="indexImg"
        />
      </div>
      <div id="floor-box">
        <div id="floor0">
          <van-image
            class="one"
            width="274px"
            height="139px"
            :src="getImgUrl('publicMobile/game/floor1.png')"
          />
          <van-image
            class="base"
            width="100%"
            height="68px"
            :src="getImgUrl('publicMobile/game/base.png')"
          />
        </div>
      </div>
    </div>

    <!-- 试玩结束弹窗 -->
    <van-popup :style="{ width:'100%', background: 'none',overflow: 'hidden'}" v-model="demoPopup">
      <div class="popup-box">
        <div class="demo-popup-content">
          <van-image
            class="demo-bg"
            width="100%"
            height="100%"
            :src="getImgUrl('publicMobile/game/demo-bg.png')"
          />
          <div class="demo-title">挑战{{currentFloor}}层</div>
          <div class="demo-subtitle">试玩体验超好玩，开始你的游戏吧</div>
          <van-image
            class="demo-star-btn"
            width="134px"
            height="42px"
            :src="getImgUrl('publicMobile/game/demo-star-btn.png')"
            @click="demoGo"
          />
        </div>

        <van-image
          class="demo-close"
          width="28px"
          height="28px"
          :src="getImgUrl('publicMobile/game/demo-close.png')"
          @click="demoClose"
        />
      </div>
    </van-popup>

    <!-- 游戏失败弹窗 -->
    <van-popup :style="{ width:'100%', background: 'none',overflow: 'hidden'}" v-model="failPopup">
      <div class="popup-box">
        <div class="fail-popup-content">
          <van-image
            class="fail-bg"
            width="100%"
            height="100%"
            :src="getImgUrl('publicMobile/game/fail-bg.png')"
          />
          <div class="fail-title">你的成绩为{{currentFloor - 1}}层</div>
          <van-image
            class="play-again"
            width="126px"
            height="37px"
            :src="getImgUrl('publicMobile/game/play-again.png')"
            @click="go"
          />
        </div>
        <div class="fail-btn-box">
          <van-image
            class="rank-btn"
            width="136px"
            height="48px"
            :src="getImgUrl('publicMobile/game/rank-btn.png')"
            @click="goTo('rank')"
          />
          <van-image
            class="back-home"
            width="136px"
            height="48px"
            :src="getImgUrl('publicMobile/game/back-home.png')"
            @click="gameInit('fail')"
          />
        </div>
      </div>
    </van-popup>
  
    <!-- 游戏成功弹窗 -->
    <van-popup :style="{ width:'100%', background: 'none',overflow: 'hidden'}" v-model="successPopup">
      <div class="popup-box">
        <div class="success-popup-content">
          <van-image
            class="success-bg"
            width="100%"
            height="100%"
            :src="getImgUrl('publicMobile/game/success-bg.png')"
          />
          <div class="success-title">你的成绩为{{currentFloor - 1}}层</div>
          <div class="success-btn-box">
            <van-image
              class="success-btn"
              width="100%"
              height="100%"
              :src="getImgUrl('publicMobile/game/success-btn.png')"
            />
            <div class="success-btn-text">抽奖中 {{reciprocal}}S</div>
          </div>
        </div>
      </div>
    </van-popup>

    <!-- 中奖弹窗 -->
    <van-popup :style="{ width:'100%', background: 'none',overflow: 'hidden'}" v-model="resultPopup">
      <div class="popup-box">
        <div class="result-popup-content">
          <van-image
            class="result-bg"
            width="100%"
            height="100%"
            :src="getImgUrl('publicMobile/game/result-bg.png')"
          />
          <div class="result-center">
            <div class="money">¥<span class="money-index">{{prize/100}}</span></div>
            <van-image
              class="get-money"
              width="70px"
              height="25px"
              :src="getImgUrl('publicMobile/game/get-money.png')"
              @click="goTo('red')"
            />
          </div>
        </div>
        <div class="result-btn-floor1">
          <van-image
            class="rank-btn"
            width="136px"
            height="48px"
            :src="getImgUrl('publicMobile/game/rank-btn2.png')"
            @click="goTo('rank')"
          />
          <van-image
            class="back-home"
            width="136px"
            height="48px"
            :src="getImgUrl('publicMobile/game/back-home2.png')"
            @click="gameInit('fail')"
          />
        </div>
        <div class="result-btn-floor2">
          <van-image
            class="share-data"
            width="291px"
            height="48px"
            :src="getImgUrl('publicMobile/game/share-data-btn.png')"
            @click="goTo('share')"
          />
        </div>
      </div>
    </van-popup>

    <!-- 未中奖弹窗 -->
    <van-popup :style="{ width:'100%', background: 'none',overflow: 'hidden'}" v-model="nullPopup">
      <div class="popup-box">
        <div class="null-popup-content">
          <van-image
            class="null-bg"
            width="100%"
            height="100%"
            :src="getImgUrl('publicMobile/game/null-bg.png')"
          />
          <div class="null-title">本次活动您没抽中奖品， 请再接再厉！</div>
        </div>
        <div class="null-btn-box">
          <van-image
            class="rank-btn"
            width="136px"
            height="48px"
            :src="getImgUrl('publicMobile/game/rank-btn.png')"
            @click="goTo('rank')"
          />
          <van-image
            class="back-home"
            width="136px"
            height="48px"
            :src="getImgUrl('publicMobile/game/back-home.png')"
            @click="gameInit('fail')"
          />
        </div>
      </div>
    </van-popup>
    <div class="none" v-for="(item, index) in imgs" :key="index">
      <img :src="getImgUrl(item)" alt="1">
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Image as VanImage, Dialog, Lazyload, Popup, Loading, Toast } from 'vant';
import { getImgUrl } from '@/utils/tools';
import teamApi from '@/apis/game';
import JoinUser from './components/join-user/index';
import MusicPlay from './components/music/index';
import { meBaseUrl } from "@/constant/index";
import {
  goToApp,
  share,
} from '@/utils/userInfo';
Vue.use(VanImage);
Vue.use(Popup);
Vue.use(Loading);
Vue.use(Lazyload);
Vue.use(Toast);
export default {
  data() {
    return {
      currentFloor: 0, // 当前楼层
      show: true,
      star: false,
      demo: false, // 是否有试玩机会
      end: false,
      imgs: [
        'publicMobile/game/random1.png',
        'publicMobile/game/random2.png',
        'publicMobile/game/random3.png',
      ],
      bgImgUrl: getImgUrl('publicMobile/game/bg.png'),
      inviteCode: null,
      indexImg: null,
      lastTime: null,
      showBorder: false,
      over: false,
      token: null,
      configId: null, // 不传默认取进行中的活动
      chanceNum: null, // 机会
      joinNum: null, // 参与人数
      prizeWinMsg: null, // 中奖信息
      ruleText: null, // 活动规则
      activityStatus: null, // 活动规则 0-结束 1-进行中 2-未开始
      activityStartTime: null,
      activityEndTime: null,
      actTime: null, // 活动时间段
      couponInviteId: null, // 活动id 同configId、activityId
      demoPopup: false,
      isDemoStar: false,
      successPopup: false,
      failPopup: false,
      reciprocal: 3,
      resultPopup: false,
      nullPopup: false,
      prize: null,
      duration: null,
      starTime: null,
      buildingGameId: null,
      load: true,
    };
  },
  components: {
    MusicPlay,
    JoinUser,
    [Dialog.Component.name]: Dialog.Component,
  },
  created () {
  },
  async mounted() {
    const {
      query,
    } = this.$router.history.current;
    if (query.inviteCode) {
      this.inviteCode = query.inviteCode;
    }
    if (query.couponInviteId) {
      this.couponInviteId = query.couponInviteId;
      this.configId = query.couponInviteId;
    }
    await this.loadImg()
    await this.getUserInfo()
    this.getGame()
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
          }, 200)
        }
      })
    },
    onMusic(e) {
      e.stopPropagation();
      this.$refs.music.onPlayOrPaused();
    },
    demoClose() {
      this.demoPopup = false
      this.gameInit()
    },
    demoGo() {
      this.gameInit()
      this.demoPopup = false
      this.starTime = Date.parse(new Date());
      this.setRandom()
      this.star = true
      this.onMusic()
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      this.getUseBuilding()
    },
    goTo(router) {
      if (!this.token) {
        this.$router.push({
          path: '/web/new-share',
          query: {
            inviteCode: this.inviteCode
          },
        });
        return
      }
      switch(router) {
        case 'share':
          this.goShare()
          break
        case 'skill':
          goToApp(meBaseUrl, `/web/game-build-rule?_immersive=0&type=1&at=${this.token}&bid=${this.configId}`)
          break
        case 'opp':
          goToApp(meBaseUrl, `/web/game-join-history?_immersive=0&type=1&at=${this.token}&bid=${this.configId}`)
          break
        case 'rank':
          goToApp(meBaseUrl, `/web/game-build-pk?_immersive=0&type=1&at=${this.token}&bid=${this.configId}`)
          break
        case 'red':
          goToApp(meBaseUrl, `/web/game-join-history?_immersive=0&type=2&at=${this.token}&bid=${this.configId}`)
          break
      }
    },
    goShare() {
      let param = {
        contentType: 12,
        paramId: 14,
        shareType: 3,
        sourceType: 12,
      }
      if (this.couponInviteId || this.configId) {
        param.shareObjectNo = this.couponInviteId || this.configId
      }
      if (this.resultPopup) {
        param.contentType = 13
        param.ext = {
          gameLevel: 13
        }
      }
      share(param)
    },
    timestampToTime(timestamp) {
      var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '.';
      var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '.';
      var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
      return Y+M+D
    },
    gameInit(type) {
      // location.reload();
      for(let i=1;i<this.currentFloor;i++) {
        let f = 'floor' + i 
        let dom = document.getElementById(f)
        dom.remove()
      }
      this.star = false;
      this.currentFloor = 0;
      if (type === 'fail') {
        this.failPopup = false
      }
      this.getGame();
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
    //  获取游戏详情
    getGame() {
      let param = {}
      if (this.couponInviteId) {
        param.configId = this.couponInviteId
      }
      teamApi.getGameInfo(param, {token: this.token}).then((res) => {
        const { configId, chanceNum, joinNum, isTestPlay, prizeWinMsg, ruleText, activityStatus, activityStartTime, activityEndTime } = res.data
        this.configId = configId
        this.chanceNum = chanceNum
        if (!chanceNum) {
          Toast({ message: '你还有0次参与活动机会，请做任务获得机会' });
        }
        this.joinNum = joinNum
        this.demo = isTestPlay
        this.prizeWinMsg = prizeWinMsg
        this.ruleText = ruleText
        this.activityStatus = activityStatus
        this.activityStartTime = activityStartTime
        this.activityEndTime = activityEndTime
        this.actTime = this.timestampToTime(activityStartTime) + '-' + this.timestampToTime(activityEndTime)
      })
    },
    // 抽奖
    getLuckDraw() {
      const param = {
        activityId: this.configId,
        gameId: this.gameRecordId,
        chanceId: this.chanceId,
      }
      teamApi.getPrize(param, {token: this.token}).then((res) => {
        if (res.data.result) {
          this.resultPopup = true
          this.prize = res.data.prize
        } else {
          this.nullPopup = true
        }
      })
    },
    // 添加游戏记录
    getPushRecord() {
      this.duration = this.endTime - this.starTime
      const param = {
        chanceId: this.chanceId,
        activityId: this.configId,
        floor: this.currentFloor - 1,
        gameTime: this.duration,
      }
      teamApi.getAddRecord(param, {token: this.token}).then((res) => {
        this.gameRecordId = res.data.gameId;
      })
    },
    // 使用试玩机会
    getConsumeUsageTimes() {
      const param = {
        configId: this.configId
      }
      teamApi.getConsume(param, {token: this.token})
    },
    // 使用盖楼机会
    getUseBuilding() {
      const param = {
        configId: this.configId
      }
      teamApi.getUseBuildingNum(param, {token: this.token}).then((res) => {
        const { id, configId, memberId } = res.data;
        this.chanceId = id;
      })
    },
    randomNum(minNum,maxNum){
      const num = parseInt(Math.random()*(maxNum-minNum+1)+minNum,10)
      if (this.lastTime && this.lastTime === num) {
        switch(num) {
          case 1:
            return 2;
          case 2:
            return 3;
          case 3:
            return 1;
        }
      } else {
        this.lastTime = num
        return num
      }
    },
    goDemo() {
      this.star = true
      this.isDemoStar = true
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      this.setRandom()
      this.onMusic()
      this.getConsumeUsageTimes()
    },
    go() {
      if (!this.token) {
        this.$router.push({
          path: '/web/new-share',
          query: {
            inviteCode: this.inviteCode
          },
        });
        return
      }     
      if (this.chanceNum == 0) {
        return Toast({ message: '还有0次参与机会，请做任务获得机会' });
      }
      this.starTime = Date.parse(new Date());
      this.setRandom()
      this.star = true
      this.onMusic()
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      this.getUseBuilding()
    },
    setRandom() {
      const img = this.randomNum(1, 3);
      const url = getImgUrl(`publicMobile/game/random${img}.png`)
      this.indexImg = url
    },
    sink() {
      const box = document.getElementById('floor-box');
      const dom = document.getElementById(`floor${this.currentFloor}`);
      let sinkHeight = parseInt(dom.getBoundingClientRect().height);
      if (this.currentFloor > 2) {
        sinkHeight = parseInt(dom.getBoundingClientRect().height) + parseInt(box.style.top)
      }
      box.removeEventListener("transitionend", this.isShow)
      dom.addEventListener("transitionend", (e) => {
        e.stopPropagation()
        box.style.top = sinkHeight + 'px';
        box.addEventListener("transitionend", this.isShow)
      })
    },
    isShow(e) {
      if (!this.over) {
        e&&e.stopPropagation()
        this.setRandom()
        this.show = true
      }
    },
    down() {
      const border = document.getElementById(`border`);
      const dom = document.getElementById(`floor${this.currentFloor}`);
      const beforeDom = document.getElementById(`floor${this.currentFloor-1}`);
      const box = document.getElementById('floor-box');
      const domWidth = parseInt(dom.getBoundingClientRect().width);
      const beforeWidth = parseInt(beforeDom.getBoundingClientRect().width);
      let h = parseInt(beforeDom.getBoundingClientRect().y) - parseInt(dom.getBoundingClientRect().height);
      if (this.currentFloor > 2) {
        h = h - parseInt(box.style.top);
      }
      dom.style.top = h + 'px';
      // game over
      if (domWidth>beforeWidth) {
        border.style.width = beforeWidth + 'px';
        border.style.top = h + 'px';
        this.over = true
        this.onMusic()
        // 试玩结束专用弹窗
        if (this.isDemoStar) {
          this.demoPopup = true
          return
        }
        this.endTime = Date.parse(new Date());
        this.getPushRecord()
        if (this.currentFloor < 4) {
          this.failPopup = true
          return
        } else {
          this.successPopup = true
          let s = setInterval(() => {
            if (this.reciprocal === 0) {
              clearInterval(s)
              this.successPopup = false
              this.reciprocal = 3
              // 抽奖
              this.getLuckDraw()
              return
            }
            this.reciprocal -= 1
          }, 1000)
          return
        }
      }
      border.style.width = domWidth + 'px'
      if (this.currentFloor > 1) {
        // 第二层开始下沉
        this.sink()
        return 
      } else {
        dom.addEventListener("transitionend", (e) => {
          e.stopPropagation()
          this.isShow()
        })
      }
    },
    click() {
      if (!this.show) {
        return
      }
      this.show = false;
      this.currentFloor += 1;
      let a = document.getElementById('beat');
      let b = parseInt(a.getBoundingClientRect().width);
      let c = parseInt(a.getBoundingClientRect().height);
      const box = document.getElementById('floor-box');
      let indexBox = document.createElement('div');
      indexBox.id = `floor${this.currentFloor}`
      let style = `z-index:2;position: absolute;top:188px;left:50%;transform:translate(-50%);width:${b}px;height:${c}px;background:url(${this.indexImg}) 0 0 no-repeat;background-size:100%;transition: all 2s linear;`
      if (this.currentFloor > 2) {
        const top = parseInt(box.style.top) - 188;
        style = `z-index:2;position: absolute;top:${-top}px;left:50%;transform:translate(-50%);width:${b}px;height:${c}px;background:url(${this.indexImg}) 0 0 no-repeat;background-size:100%;transition: all 2s linear;`
      }
      indexBox.setAttribute("style", style); //为元素设置新的属性
      let currentDiv = document.getElementById("floor-box");
      currentDiv.appendChild(indexBox);
      this.down()
    },
  },
};
</script>

<style lang="scss" scoped>
.none {
  display: none;
}
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
  .top-right-box {
    position: absolute;
    top: 84px;
    right: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 3;
    .share {
      margin-bottom: 12px;
    }
    .opp {
      margin-top: 12px;
    }
    .rank {
      margin-top: 12px;
      margin-bottom: 10px;
    }

  }
  .join-control {
    position: absolute;
    top: 157px;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    .index-swiper {
      width: 310px;
      height: 23px;
    }
  }
  // .music-play {
  //   position: fixed;
  //   top: 36px;
  //   right: 10px;
  //   z-index: 5;
  //   width: 36px;
  //   height: 36px;
  // }
  @keyframes fade {
    from {
      opacity: 1;
    }
    50% {
      opacity: .4;
    }
    to {
      opacity: 1;
    }
  }
  #border {
    position: absolute;
    top: 188px;
    width: 200px;
    height: 117px;
    border: 1px dashed #FFFFFF;
    border-top: none;
    border-bottom: none;
    z-index: 99;
    animation: fade 600ms infinite;
  }
  .game {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(180deg, #CB0030 0%, #F4032F 11%, #FFA496 58%, #FFE0C1 100%);
    position: relative;
  }
  @keyframes scaleDraw {
    0% {transform: scale(1, 1);  /*开始为原始大小*/}
    25% {transform: scale(4.2, 4.2);  /*开始为原始大小*/}
    50% {transform: scale(1, 1);  /*开始为原始大小*/}
    75% {transform: scale(4.2, 4.2);  /*开始为原始大小*/}
  }
  #beat {
    position: absolute;
    top: 188px;
    width: 60px;
    height: 24.5px;
    transform-origin: center top 0;
    animation: scaleDraw 5s ease-in-out infinite;
    -webkit-animation: scaleDraw 5s ease-in-out infinite;
    z-index: 3;
  }
  #floor-box {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100vh;
    // overflow: hidden;
    transition: all 1s linear;
    background-color: #FFE0C1;
  }
  #floor0 {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    bottom: 34px;
    width: 100%;
    height: 265px;
    overflow: hidden;
  }
  .one {
    z-index: 3;
  }
  .base {
    position: relative;
    top: -16px;
    z-index: 2;
  }

  .in-game {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    .banner {
      position: absolute;
      top: 0;
      z-index: 2;
    }
  }
  .game-title {
    margin-top: 53px;
    margin-bottom: 22px;
    text-align: center;
    width: 100%;
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
    line-height: 25px;
    z-index: 2;
  }
  .user-box {
    width: 100%;
    display: flex;
    align-items: center;
    z-index: 2;
    .user-pic {
      margin-left: 24px;
      margin-right: 14px;
      width: 64px;
      height: 64px;
      border-radius: 50%;
      overflow: hidden;
    }
    .data {
      font-size: 20px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 28px;
    }
  }

  .init {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 0;
    width: 100%;
    min-height: 100vh;
    background-color: #FFE0C1;
    z-index: 1;
    .banner {
      position: absolute;
      top: 0;
    }
  }
  .title {
    margin-top: 80px;
  }
  .sub-title {
    z-index: 2;
    height: 17px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFD1BE;
    line-height: 17px;
  }
  .main {
    margin-top: 59px;
  }
  .btn-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    top: -24px;
  }
  .btn-box-no {
    margin-top: 11px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .star {
      margin-bottom: 24px;
    }
    .time {
      z-index: 2;
    }
  }
  .btn-box-end {
    margin-top: 17px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .time {
      margin-top: 7px;
    }
  }
  .star {
    margin-bottom: 8px;
  }
  .demo {
    margin-bottom: 8px;
  }
  .demo-text {
    margin-bottom: 8px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FF3036;
    line-height: 17px;
  }
  .time {
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FF3036;
    line-height: 17px;
  }
  .padding-b {
    padding-bottom: 58px;
  }

  .popup-box {
    display: flex;
    align-items: center;
    flex-direction: column;
    .null-popup-content {
      position: relative;
      width: 100%;
      height: 437px;
      .null-bg {
        position: absolute;
        top: 0;
      }
      .null-title {
        position: absolute;
        top: 215px;
        left: 50%;
        transform: translate(-50%);
        width: 220px;
        height: 56px;
        text-align: center;
        font-size: 20px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #F61E0A;
      }
    }
    .null-btn-box {
      .rank-btn {
        margin-right: 19px;
      }
    }
    .result-btn-floor1 {
      margin-bottom: 12px;
      .rank-btn {
        margin-right: 19px;
      }
    }
    .result-popup-content {
      position: relative;
      width: 100%;
      height: 437px;
      .result-bg {
        position: absolute;
        top: 0;
      }
      .result-center {
        position: absolute;
        top: 208px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .get-money {
          position: relative;
          top: 2px;
        }
        .money {
          margin-right: 4px;
          font-size: 20px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #F61E0A;
          .money-index {
            font-size: 32px;
          }
        }
      }
    }
    .success-popup-content {
      position: relative;
      width: 100%;
      height: 560px;
      .success-bg {
        position: absolute;
        top: 0;
      }
      .success-title {
        position: absolute;
        top: 186px;
        width: 100%;
        text-align: center;
        font-size: 28px;
        color: #FFFFFF;
      }
      .success-btn-box {
        position: absolute;
        bottom: 64px;
        left: 50%;
        transform: translate(-50%);
        width: 134px;
        height: 46px;
        overflow: hidden;
        .success-btn {
          width: 100%;
          height: 100%;
        }
        .success-btn-text {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translate(-50%);
          width: 100%;
          height: 100%;
          text-align: center;
          line-height: 41px;
          font-size: 18px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #CD3F42;
          z-index: 3;
        }
      }
    }
    .fail-btn-box {
      margin-top: 16px;
      .rank-btn {
        margin-right: 19px;
      }
    }
    .fail-popup-content {
      position: relative;
      width: 100%;
      height: 371px;
      .fail-bg {
        position: absolute;
        top: 0;
      }
      .fail-title {
        position: absolute;
        top: 42px;
        width: 100%;
        text-align: center;
        font-size: 28px;
        color: #FFFFFF;
      }
      .play-again {
        position: absolute;
        bottom: 30px;
        left: 50%;
        transform: translate(-50%);
      }
    }
    .demo-popup-content {
      width: 100%;
      height: 441px;
      position: relative;
      .demo-bg {
        position: absolute;
        top: 0;
      }
      .demo-title {
        position: absolute;
        top: 139px;
        width: 100%;
        text-align: center;
        font-size: 20px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #76281A;
      }
      .demo-subtitle {
        position: absolute;
        top: 168px;
        width: 100%;
        text-align: center;
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #AC786A;
      }
      .demo-star-btn {
        position: absolute;
        bottom: 40px;
        left: 50%;
        transform: translate(-50%);
      }
    }
    .demo-close {
      margin-top: 25px;
    }
  }
</style>

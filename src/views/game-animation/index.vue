<template>
  <div class="game">
    <!-- <van-image
      class="banner"
      width="100%"
      height="812px"
      lazy-load
      :src="getImgUrl('publicMobile/game/bg.png')"
    /> -->
    <!-- 游戏未开始 -->
    <div class="init" v-if="!star">
      <van-image
        class="banner"
        width="100%"
        height="812px"
        lazy-load
        :src="getImgUrl('publicMobile/game/bg.png')"
      />
      <van-image
        class="title"
        width="207px"
        height="49px"
        lazy-load
        :src="getImgUrl('publicMobile/game/title.png')"
      />
      <div class="sub-title" v-if="!end">已有3660人参与，您今天还有3次参与机</div>
      <div class="sub-title" v-else>已有3660人参与</div>
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
        <div class="time">活动时间：2022.01.01-2022</div>
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
        <div class="time">活动时间：2022.01.01-2022</div>
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
        <div class="time padding-b">活动时间：2022.01.01-2022</div>
      </div>
    </div>


    <!-- 游戏时 -->
    <div class="in-game" v-if="star" @click="click">
      <van-image
        class="banner"
        width="100%"
        height="812px"
        lazy-load
        :src="getImgUrl('publicMobile/game/bg.png')"
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

  </div>
</template>

<script>
import Vue from 'vue';
import { Image as VanImage, Dialog, Lazyload } from 'vant';
import { getImgUrl } from '@/utils/tools';
Vue.use(VanImage);
Vue.use(Lazyload);
export default {
  data() {
    return {
      currentFloor: 0,
      show: true,
      star: false,
      demo: false,
      end: false,
      imgs: [
        'publicMobile/game/random1.png',
        'publicMobile/game/random2.png',
        'publicMobile/game/random3.png',
      ],
      indexImg: null,
      lastTime: null,
      showBorder: false,
      over: false,
    };
  },
  components: {
    [Dialog.Component.name]: Dialog.Component,
  },
  created () {
    if (this.star) {
      this.setRandom()
    }
  },
  methods: {
    getImgUrl,
    randomNum(minNum,maxNum){
      const num = parseInt(Math.random()*(maxNum-minNum+1)+minNum,10)
      if (this.lastTime && this.lastTime === num) {
        switch(num) {
          case 1:
            return 2;
            break
          case 2:
            return 3;
            break
          case 3:
            return 1;
            break
        }
      } else {
        this.lastTime = num
        return num
      }
    },
    goDemo() {
      this.star = true
    },
    go() {
      this.setRandom()
      this.star = true
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
        return Dialog({ message: 'game over' });
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
</style>

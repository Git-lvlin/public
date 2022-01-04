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
      <!-- 游戏顶部固定区域 -->
      <div class="game-title">参与游戏赢大奖</div>
      <div class="user-box">
        <div class="user-pic">
          <van-image
            width="64px"
            height="64px"
            lazy-load
            :src="getImgUrl('publicMobile/game/floor1.png')"
          />
        </div>
        <div class="data">1层</div>
      </div>

      <!-- 游戏活动区域 -->
      <div id="beat" v-if="show">
        <van-image
          width="100%"
          height="100%"
          lazy-load
          :src="getImgUrl('publicMobile/game/random2.png')"
        />
      </div>
      <div id="floor-box">
        <div id="floor0">
          <van-image
            class="one"
            width="274px"
            height="139px"
            lazy-load
            :src="getImgUrl('publicMobile/game/floor1.png')"
          />
          <van-image
            class="base"
            width="100%"
            height="68px"
            lazy-load
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
    };
  },
  components: {
    [Dialog.Component.name]: Dialog.Component,
  },
  created () {
  },
  methods: {
    getImgUrl,
    goDemo() {
      this.star = true
    },
    go() {
      this.star = true
    },
    sink() {
      const box = document.getElementById('floor-box');
      const dom = document.getElementById(`floor${this.currentFloor}`);
      let sinkHeight = parseInt(dom.getBoundingClientRect().height);
      if (this.currentFloor > 3) {
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
      e.stopPropagation()
      this.show = true
    },
    down() {
      const dom = document.getElementById(`floor${this.currentFloor}`);
      const beforeDom = document.getElementById(`floor${this.currentFloor-1}`);
      const box = document.getElementById('floor-box');
      const domWidth = parseInt(dom.getBoundingClientRect().width);
      const beforeWidth = parseInt(beforeDom.getBoundingClientRect().width)
      let h = parseInt(beforeDom.getBoundingClientRect().y) - parseInt(dom.getBoundingClientRect().height);
      if (this.currentFloor > 3) {
        h = h - parseInt(box.style.top);
      }
      dom.style.top = h + 'px';

      // game over
      if (domWidth>beforeWidth) {
        Dialog({ message: 'game over' });
        return
      }
      if (this.currentFloor > 2) {
        // 第三层开始下沉
        this.sink()
        return 
      } else {
        dom.addEventListener("transitionend", (e) => {
          e.stopPropagation()
          this.show=true
        })
      }
    },
    click() {
      if (!this.show) {
        return
      }
      console.log(1);
      this.show = false;
      this.currentFloor += 1;
      let a = document.getElementById('beat');
      let b = parseInt(a.getBoundingClientRect().width);
      let c = parseInt(a.getBoundingClientRect().height);
      const box = document.getElementById('floor-box');
      let indexBox = document.createElement('div');
      indexBox.id = `floor${this.currentFloor}`
      let style = `position: absolute;top:0;left:50%;transform:translate(-50%);width:${b}px;height:${c}px;background:url(${getImgUrl('publicMobile/game/random1.png')}) 0 0 no-repeat;background-size:100%;transition: all 2s linear;`
      if (this.currentFloor > 3) {
        const top = parseInt(box.style.top);
        style = `position: absolute;top:${-top}px;left:50%;transform:translate(-50%);width:${b}px;height:${c}px;background:url(${getImgUrl('publicMobile/game/random2.png')}) 0 0 no-repeat;background-size:100%;transition: all 2s linear;`
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
    25% {transform: scale(4.8, 4.8);  /*开始为原始大小*/}
    50% {transform: scale(1, 1);  /*开始为原始大小*/}
    75% {transform: scale(4.8, 4.8);  /*开始为原始大小*/}
  }
  #beat {
    position: absolute;
    top: 0;
    width: 60px;
    height: 24.5px;
    transform-origin: center top 0;
    animation: scaleDraw 5s ease-in-out infinite;
    -webkit-animation: scaleDraw 5s ease-in-out infinite;
  }
  #floor-box {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100vh;
    // overflow: hidden;
    transition: all 1s linear;
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
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
  }
  .game-title {
    margin-bottom: 22px;
    text-align: center;
    width: 100%;
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
    line-height: 25px;
  }
  .user-box {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .user-pic {
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

<template>
  <div class="game" @click="click">
    <div class="join-control">
      <JoinUser />
    </div>
    <div class="music-play" @click="onMusic">
      <MusicPlay ref='music' />
    </div>

    <div class="beat-box">
      <div id="bt" class="beat" v-show="show"></div>
      <div class="border"></div>
    </div>
    <div id="bottom" class="building-box">
      <!-- <div id="beat-box"></div> -->
      <div id="move0"></div>
    </div>

  </div>
</template>

<script>
import Vue from 'vue';
import { Image as VanImage, Dialog, Lazyload } from 'vant';
import { getImgUrl } from '@/utils/tools';
import JoinUser from './components/join-user/index'
import MusicPlay from './components/music/index'

Vue.use(VanImage);
Vue.use(Lazyload);
export default {
  data() {
    return {
      arr: [],
      currentFloor: 0,
      show: true,
      lastTime: 0,
    };
  },
  components: {
    MusicPlay,
    JoinUser,
    [Dialog.Component.name]: Dialog.Component,
  },
  created () {
  },
  methods: {
    getImgUrl,
    hide() {
      let that = this
      var dom = document.getElementById(`move${this.currentFloor}`);
      // var beforeDom = document.getElementById(`move${this.currentFloor-1}`);
      // 楼层容器
      let b = document.getElementById('bottom');
      // let hh = this.arr[this.currentFloor-1].height;
      // let height = parseInt(hh);
      let pos = 0;
      if (this.currentFloor > 3) {
        pos = this.lastTime;
      }
      let height = this.lastTime + dom.getBoundingClientRect().height;
      console.log('容器下移距离', height)
      let s = setInterval(frame, 5);
      function frame() {
        if (pos == height) {
          that.lastTime = pos
          clearInterval(s);
        } else {
          pos++;
          b.style.paddingTop = pos + "px";
        }
      }
    },
    myMove() {
      let that = this
      var dom = document.getElementById(`move${this.currentFloor}`);
      var beforeDom = document.getElementById(`move${this.currentFloor-1}`);
      let h = parseInt(beforeDom.getBoundingClientRect().y) - parseInt(dom.getBoundingClientRect().height);
      if (this.currentFloor>3) {
        h = h + parseInt(this.lastTime);
        console.log('下移距离', h)
      }
      console.log('上一个元素页面位置', beforeDom.getBoundingClientRect().y)
      console.log('当前元素高', dom.getBoundingClientRect().height)
      var pos = 0;
      var id = setInterval(frame, 5);
      function frame() {
        if (pos == h) {
          that.show = true
          clearInterval(id);
          // 第二层开始需要同步移动楼层容器
          if (that.currentFloor>2) {
            that.hide()
          }
        } else {
          pos++;
          dom.style.top = pos + "px"; 
        }
      }
    },
    click() {
      let a = document.getElementById('bt')
      const b = document.defaultView.getComputedStyle(a, null);
      console.log('b', b)
    },
    onMusic() {
      this.$refs.music.onPlayOrPaused();
    },
  },
};
</script>

<style lang="scss" scoped>
  .game {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color:#FFFFFF;
    position: relative;
  }
  .join-control {
    width: 100%;
  }
  .music-play {
    position: fixed;
    top: 36px;
    right: 10px;
    z-index: 5;
    width: 36px;
    height: 36px;
  }
  .beat-box {
    position: absolute;
    top: 0;
    width: 100%;
  }
  @keyframes scaleDraw {
    0% {transform: scale(1, 1);  /*开始为原始大小*/}
    25% {transform: scale(4.8, 4.8);  /*开始为原始大小*/}
    50% {transform: scale(1, 1);  /*开始为原始大小*/}
    75% {transform: scale(4.8, 4.8);  /*开始为原始大小*/}
  }
  // @keyframes moveDown {
  //   0% {top: 0}
  //   100% {top: 200px}
  // }
  .beat {
    margin: auto;
    width: 60px;
    height: 30px;
    background-color: green;
    transform-origin: center top 0;
    animation: scaleDraw 5s ease-in-out infinite;
    -webkit-animation: scaleDraw 5s ease-in-out infinite;
  }
  .border {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%);
    width: 300px;
    height: 100px;
    border-left: black 6px dashed;
    border-right: black 6px dashed;
  }
  .building-box {
    position: absolute;
    top: 0;
    // display: flex;
    // flex-direction: column;
    // align-items: center;
    width: 100%;
    height: 100%;
    // min-height: 100vh;
  }
  #move0 {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100px;
    background-color: red;
  }
</style>

<template>
  <div class="game" @click="click">
    <div id="beat" v-if="show"></div>
    <div id="floor-box">
      <div id="floor0"></div>
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
    };
  },
  components: {
    [Dialog.Component.name]: Dialog.Component,
  },
  created () {
  },
  methods: {
    getImgUrl,
    sink() {
      const box = document.getElementById('floor-box');
      const dom = document.getElementById(`floor${this.currentFloor}`);
      let sinkHeight = parseInt(dom.getBoundingClientRect().height);
      if (this.currentFloor > 3) {
        sinkHeight = parseInt(dom.getBoundingClientRect().height) + parseInt(box.style.top)
      }
      box.removeEventListener("transitionend", this.isShow)
      dom.addEventListener("transitionend", (e) => {
        box.style.top = sinkHeight + 'px';
        e.stopPropagation()
        box.addEventListener("transitionend", this.isShow)
      })
    },
    isShow() {
      this.show = true
    },
    down() {
      const dom = document.getElementById(`floor${this.currentFloor}`);
      const beforeDom = document.getElementById(`floor${this.currentFloor-1}`);
      const box = document.getElementById('floor-box');
      let h = parseInt(beforeDom.getBoundingClientRect().y) - parseInt(dom.getBoundingClientRect().height);
      if (this.currentFloor > 3) {
        h = h - parseInt(box.style.top);
      }
      dom.style.top = h + 'px';
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
      let style = `position: absolute;top:0;left:50%;transform:translate(-50%);width:${b}px;height:${c}px;background:green;transition: all 2s linear;`
      if (this.currentFloor > 3) {
        const top = parseInt(box.style.top);
        style = `position: absolute;top:${-top}px;left:50%;transform:translate(-50%);width:${b}px;height:${c}px;background:green;transition: all 2s linear;`
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
    background-color:#FFFFFF;
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
    height: 30px;
    background-color: green;
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
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 80px;
    background-color: red;
  }
</style>

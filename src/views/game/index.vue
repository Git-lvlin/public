<template>
  <div class="game" @click="click">

    <div class="beat-box">
      <div id="bt" class="beat"></div>
      <div class="border"></div>
    </div>
    <div class="building-box">
      <div class="floor2"></div>
      <div class="floor1"></div>
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
    };
  },
  components: {
    [Dialog.Component.name]: Dialog.Component,
  },
  created () {
  },
  methods: {
    getImgUrl,
    click() {
      let a = document.getElementById('bt')
      const b = document.defaultView.getComputedStyle(a, null);
      console.log('b', b)
    }
  },
};
</script>

<style lang="scss" scoped>
  .game {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color:#FFFFFF;
  }
  .beat-box {
    margin-top: 100px;
    position: relative;
  }
  @keyframes scaleDraw {
    0% {transform: scale(1);  /*开始为原始大小*/}
    25% {transform: scale(1.4);  /*开始为原始大小*/}
    50% {transform: scale(1);  /*开始为原始大小*/}
    75% {transform: scale(1.4);  /*开始为原始大小*/}
  }
  .beat {
    margin: 0 auto;
    width: 250px;
    height: 100px;
    background-color: green;
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
    margin-top: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    // height: 500px;
  }
  .floor1 {
    width: 100%;
    height: 80px;
    background-color: red;
  }
  .floor2 {
    width: 300px;
    height: 90px;
    background-color: yellow;
  }
</style>

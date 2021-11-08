<template>
  <div class="store-in">
    <van-image
      class="bg"
      width="240px"
      height="240px"
      :src="getImgUrl('publicMobile/common/404@2x.png')"
    />
    <div class="text">您访问的页面暂时没有哦~</div>
    <div class="btn" @click="goHome">返回首页</div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Image as VanImage, Lazyload } from 'vant';
import { getImgUrl } from '@/utils/tools';
import { appBaseUrl } from "@/constant/index";
import {
  goToApp,
} from '@/utils/userInfo';
Vue.use(VanImage);
Vue.use(Lazyload);
export default {
  data() {
    return {
    };
  },
  components: {
  },
  methods: {
    getImgUrl,
    goHome() {
      goToApp(appBaseUrl, '/tab/index?index=0', '', this.$bridge)
    },
  },
};
</script>

<style lang="scss" scoped>
  .store-in {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    background-color:#F5F5F5;
    position: relative;
  }
  .bg {
    margin-top: 102px;
  }
  .text {
    margin-top: 8px;
    width: 100%;
    text-align: center;
    height: 22px;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    line-height: 22px;
  }
  .btn {
    position: fixed;
    left: 50%;
    bottom: 74px;
    transform: translate(-50%);
    width: 343px;
    height: 48px;
    background: #FF3333;
    box-shadow: 0px 3px 6px 0px rgba(229, 53, 47, 0.4);
    border-radius: 8px;
    text-align: center;
    line-height: 48px;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
  }
</style>

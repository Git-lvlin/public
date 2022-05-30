<template>
  <div class="store-in">
    <van-image
      class="bg"
      width="160px"
      height="160px"
      :src="getImgUrl('publicMobile/common/404-new.png')"
    />
    <div class="text">请到应用商店更新约购APP至最新版本</div>
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
    background-color:#FFFFFF;
    position: relative;
  }
  .bg {
    margin-top: 102px;
  }
  .text {
    margin-top: 8px;
    width: 100%;
    text-align: center;
    font-size: 14px;
    color: #999999;
  }
  .btn {
    margin-top: 32px;
    width: 118px;
    height: 36px;
    border: 1px solid #FF0000;
    box-shadow: 0px 3px 6px 0px rgba(229, 53, 47, 0.4);
    border-radius: 18px;
    text-align: center;
    line-height: 36px;
    font-size: 14px;
    color: #FF0000;
  }
</style>

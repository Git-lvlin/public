<template>
  <div class="five-star-qa">
    <van-image
      class="bg"
      width="100%"
      height="100%"
      lazy-load
      :src="getImgUrl('publicMobile/star/bg.png')"
    />
    <van-image
      class="btn"
      width="88px"
      height="80px"
      lazy-load
      :src="getImgUrl('publicMobile/star/btn.gif')"
      @click="go"
    />
  </div>
</template>

<script>
import Vue from 'vue';
import { Image as VanImage, Lazyload } from 'vant';
import { getImgUrl } from '@/utils/tools';
import { appBaseUrl } from "@/constant/index";
import { goToApp } from '@/utils/userInfo';

Vue.use(VanImage);
Vue.use(Lazyload);
export default {
  data() {
    return {
    };
  },
  methods: {
    getImgUrl,
    go() {
      goToApp(appBaseUrl, '/tab/index?index=2', '', this.$bridge)
    },
  },
};
</script>

<style lang="scss" scoped>
  .five-star-qa {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    position: relative;
  }
  .btn {
    position: absolute;
    top: 942px;
    right: 92px;
    width: 88px;
    height: 80px;
  }
</style>

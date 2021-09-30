<template>
  <div class="license-pc">
    <div class="box">
      <van-image width="30%" height="30%" :src="getImgUrl('publicMobile/license/yyzz.jpg')"/>
      <van-image width="30%" height="30%" :src="getImgUrl('publicMobile/license/zzdx.jpg')"/>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Image as VanImage } from 'vant';
import { getImgUrl } from '@/utils/tools';
Vue.use(VanImage);
export default {
  props: {

  },
  data() {
    return {
    };
  },
  components: {
  },
  created () {
  },
  methods: {
    getImgUrl,
  },
};
</script>

<style lang="scss" scoped>
  .license-pc {
    min-height: 100vh;
    background-color: #ffffff;
    overflow: hidden;
    overflow-y: auto;
    .box {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>

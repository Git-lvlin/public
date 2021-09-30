<template>
  <div class="license">
    <van-image :src="getImgUrl('publicMobile/license/yyzz.jpg')"/>
    <van-image :src="getImgUrl('publicMobile/license/zzdx.jpg')"/>
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
  .license {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: #ffffff;
  }
</style>

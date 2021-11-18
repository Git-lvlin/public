<template>
  <div class="container">
    <van-image
      class="border"
      width="26px"
      height="4px"
      :src="getImgUrl('publicMobile/share/border.png')"
    />
  </div>
</template>

<script>
import Vue from 'vue';
import { Image as VanImage } from 'vant';
import { getImgUrl } from '@/utils/tools';
Vue.use(VanImage);
export default {
  data() {
    return {
    };
  },
  created () {
  },
  mounted() {
  },
  methods: {
    getImgUrl,
  },
};
</script>

<style lang='scss' scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #ffffff;
}
</style>

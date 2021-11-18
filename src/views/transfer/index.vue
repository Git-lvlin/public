<template>
  <div class="container">
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
    window.location.href = 'https://publicmobile.yeahgo.com/web/transfer';
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

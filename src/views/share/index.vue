<template>
  <div class="container" v-if="!isWeixin">
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
  components: {
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
  padding-bottom: 111px;
}
</style>

<template>
  <div>分享页</div>
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
  mounted() {
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = 'https://web.openinstall.io/web/banner.js?id=8071440976111337271';
    document.body.appendChild(s);
  },
};
</script>
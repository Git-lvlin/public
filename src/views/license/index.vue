<template>
  <div class="license">
    <p>深圳市仅销售预包装食品单位备案凭证：YB24403050002817</p>
    <p>第二类医疗器械经营备案凭证：粤深食药监械经营备202020242号</p>
    <p>营业执照，统一社会信用代码：91440300MA5EEE7T58</p>
    <p>中华人民共和国增值电信业务经营许可证：粤B2-20190283</p>
    <van-image :src="getImgUrl('publicMobile/license/yyzz.png')" />
    <van-image :src="getImgUrl('publicMobile/license/zzdx.png')" />
    <van-image :src="getImgUrl('publicMobile/license/zzdx-2.png')" />
    <van-image :src="getImgUrl('publicMobile/license/ylqx.png')" />
    <van-image :src="getImgUrl('publicMobile/license/wbz.png')" />
  </div>
</template>

<script>
import Vue from "vue";
import { Image as VanImage } from "vant";
import { getImgUrl } from "@/utils/tools";
Vue.use(VanImage);
export default {
  props: {},
  data() {
    return {};
  },
  components: {},
  created() {},
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

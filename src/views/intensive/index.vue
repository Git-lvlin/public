<template>
  <div class="intensive">
    <van-image
      width="100%"
      height="951px"
      :src="getImgUrl('publicMobile/intensive/bg.png')"
    />
    <div class="bottom-btn" @click="go">立即集约</div>
  </div>
</template>

<script>
import Vue from "vue";
import { Image as VanImage } from "vant";
import { getImgUrl } from "@/utils/tools";
import { appBaseUrl } from "@/constant/index";
import { goToApp } from "@/utils/userInfo";
Vue.use(VanImage);
export default {
  props: {},
  data() {
    return {
    };
  },
  components: {},
  created() {
  },
  mounted() {
  },
  methods: {
    getImgUrl,
    go() {
      goToApp(appBaseUrl, '/tab/index?index=2');
    }
  },
};
</script>

<style lang="scss" scoped>
.intensive {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: #FF2A64;
}
.bottom-btn {
  position: absolute;
  bottom: 24px;
  width: 247px;
  height: 48px;
  background: #FFD700;
  border-radius: 24px;
  font-size: 20px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #FF233E;
  line-height: 48px;
  text-align: center;
}
</style>

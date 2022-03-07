<template>
  <div class="store-in">
    <van-image
      class="banner"
      width="100%"
      height="348px"
      :src="getImgUrl('publicMobile/recruit/banner.png')"
    />
    <div class="content">
      <van-image
        class="item1"
        width="100%"
        height="294px"
        :src="getImgUrl('publicMobile/recruit/item1.png')"
      />
      <van-image
        class="item2"
        width="100%"
        height="290px"
        :src="getImgUrl('publicMobile/recruit/item2.png')"
      />
      <van-image
        class="item3"
        width="100%"
        height="318px"
        :src="getImgUrl('publicMobile/recruit/item3.png')"
      />
      <van-image
        class="item4"
        width="100%"
        height="94px"
        :src="getImgUrl('publicMobile/recruit/item4.png')"
      />
      <van-image
        class="item5"
        width="263px"
        height="14px"
        :src="getImgUrl('publicMobile/recruit/item5.png')"
      />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Image as VanImage } from "vant";
import { getImgUrl } from "@/utils/tools";
Vue.use(VanImage);
export default {
  data() {
    return {
    };
  },
  created() {
  },
  mounted() {
    const {
      query
    } = this.$router.history.current;
  },
  methods: {
    getImgUrl,
  },
};
</script>

<style lang="scss" scoped>
.store-in {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: #419157;
}
.content {
  width: 351px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  top: -88px;
  .item1,.item2,.item3 {
    margin-bottom: 12px;
  }
  .item4 {
    margin-bottom: 41px;
  }
}
</style>

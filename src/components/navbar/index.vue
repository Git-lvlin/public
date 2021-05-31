<template>
  <div
    class="nav_bar"
  >
    <van-nav-bar
      left-arrow
      safe-area-inset-top
      @click-left="onClickLeft"
    >
      <template #left>
        <van-image
          width="24px"
          height="24px"
          :src="getImgUrl('miniprogram/common/back_white@2x.png')"
        />
      </template>
      <template #title>
        <div class="nav_title">{{title}}</div>
      </template>
      <template #right>
        <img class="right_icon" :src="getImgUrl('publicMobile/common/share.png')" />
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
import { NavBar, Toast, Image } from 'vant';
import { getImgUrl } from '@/utils/tools';

export default {
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  components: {
    [NavBar.name]: NavBar,
    [Image.name]: Image,
  },
  methods: {
    onClickLeft() {
      Toast('返回');
    },
    getImgUrl,
  },
};
</script>

<style lang="scss" scoped>
  .van-nav-bar {
    background-color: transparent;
    box-shadow: none;
  }
  .van-hairline--bottom::after {
    border-bottom-width: 0;
  }

  .nav_title {
    color: #fffcf4;
    font-size: 20px;
    line-height: 20px;
    text-align: center;
  }

  .right_icon {
    width: 24px;
    height: 24px;
    vertical-align: middle;
  }
</style>

<template>
  <div
    class="nav_bar"
    :style="{'padding-top': `${safeHeight}px`}"
  >
    <van-nav-bar
      :left-arrow="!isMiniprogram"
      :safe-area-inset-top="true"
      @click-left="onClickLeft"
    >
      <template #left v-if="!isMiniprogram">
        <img
          class="back_img"
          :src="getImgUrl('miniprogram/common/back_white@2x.png')"
        />
      </template>
      <template #title>
        <div class="nav_title">{{title}}</div>
      </template>
      <template #right v-if="share">
        <img class="right_icon" :src="getImgUrl('publicMobile/common/share.png')" @click="onShare" />
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
import { NavBar, Image } from 'vant';
import { getImgUrl } from '@/utils/tools';

export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    share: {
      type: Boolean,
      default: false,
    },
    shareObj: {
      type: Object,
      default: () => {},
    },

  },
  components: {
    [NavBar.name]: NavBar,
    [Image.name]: Image,
  },
  data() {
    return {
      safeHeight: 0,
      isMiniprogram: false,
    };
  },
  computed: {
    isMiniprogram () {
      return this.$store.state.appInfo.isMiniprogram;
    },
  },
  created() {
    this.safeHeight = this.$store.state.navigationBarHeight;
  },
  methods: {
    getImgUrl,
    onClickLeft() {
      // Toast('返回');
      this.$bridge.callHandler('pop', "", (res) => {
        console.log(`获取app响应数据:${res}`);
      });
    },
    onShare() {
      if (JSON.stringify(this.shareObj) !== "{}") {
        this.$bridge.callHandler('share', {
          contentType: 1,
          paramId: 2,
          shareUrl: encodeURIComponent(window.location.href),
          sharePopup: false,
          ...this.shareObj,
        }, (res) => {
          console.log(`获取app响应数据:${res}`);
        });
      } else {
        this.$bridge.callHandler('share', {
          contentType: 2,
          paramId: 2,
          shareUrl: encodeURIComponent(window.location.href),
          sharePopup: false,
        }, (res) => {
          console.log(`获取app响应数据:${res}`);
        });
      }
    }
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

  .back_img {
    width: 24px;
    height: 24px;
    vertical-align: middle;
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

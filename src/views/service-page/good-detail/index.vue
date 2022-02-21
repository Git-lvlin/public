<template>
  <div class="detail-container">
    <div class="swipe-box">
      <Swipe
        :autoplay="3000"
        indicator-color="white"
        :show-indicators="false"
        @change="handleSwipeChange"
      >
        <SwipeItem v-for="i in banner">
          <div class="swiper-item">
            <van-image width="375" height="375" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
            <div class="banner-mask"/>
          </div>
        </SwipeItem>
      </Swipe>
      <div class="dot-box">{{bannerIndex + 1}}/{{banner.length}}</div>
    </div>

    <div class="good-head">
      <div class="head-title">优质番茄 500g*1盒子（最多16字…优质番茄 500g*1盒子（最多16字…</div>
      <div class="flex_middle head-desc-box">
        <div class="head-desc-text">halouasdfasdf</div>
        <div class="head-sales">22012</div>
      </div>
      <div class="flex_middle head-price-box">
        <div class="price-name" v-if="type == 1">集约价：</div>
        <div class="price-text">¥<span class="max-font">8</span>.32</div>
        <div class="sec_label" v-if="type == 2">秒约特惠</div>
        <div class="market-price margin-10" v-if="type == 1">市场价<span class="font-line">¥14.32</span></div>
      </div>
      <div class="market-price" v-if="type == 2">市场价<span class="font-line">¥14.32</span></div>
    </div>

    <div class="good-detail">
      <div class="detail-title">商品详情</div>
      <div class="detail-list">
        <van-image
          width="100%"
          fit="cover"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
          v-for="item in 5"
        />
      </div>
    </div>
  </div>
</template>

<script>
import '@vant/touch-emulator';
import { Swipe, SwipeItem, Toast, Image } from 'vant';
import { getImgUrl } from '@/utils/tools';
import { appBaseUrl, meBaseUrl } from "@/constant/index";

export default {
  data() {
    return {
      banner: [1,1,1,1,1],
      bannerIndex: 0,
      info: null,
      type: 2,
    };
  },
  mounted() {
    const {
      query,
    } = this.$router.history.current;
  },
  methods: {
    getImgUrl,
    handleSwipeChange(index) {
      this.bannerIndex = index;
    },
  },
  components: {
    Swipe,
    SwipeItem,
    [Image.name]: Image,
  },
};
</script>

<style lang="scss" scoped>
  .detail-container {
    width: 375PX;
    margin: 0 auto;
    overflow: auto;
  }

  .swipe-box {
    position: relative;
  }
  .swiper-item {
    position: relative;
    width: 375PX;
    height: 375PX;
  }
  ::v-deep .swiper-item img {
    pointer-events: none;
  }
  .dot-box {
    position: absolute;
    right: 12PX;
    bottom: 12PX;
    width: 40PX;
    height: 20PX;
    font-size: 12PX;
    color: #FFFFFF;
    line-height: 20PX;
    letter-spacing: 1PX;
    text-align: center;
    background: rgba($color: #000000, $alpha: .35);
    border-radius: 20PX;
  }
  .good-head {
    padding: 12PX;
    margin-bottom: 12PX;
    background: #fff;
  }
  .head-title {
    font-size: 18PX;
    font-weight: 600;
    color: #222222;
    line-height: 25PX;
  }
  .head-desc-box {
    justify-content: space-between;
    font-size: 14PX;
    line-height: 20PX;
    padding-bottom: 16PX;
    
    .head-desc-text {
      color: #A4A4A4;
      line-height: 20PX;
    }
    .head-sales {
      font-weight: 600;
      color: #FF3A0F;
    }
  }
  .head-price-box {
    font-size: 13PX;
    font-weight: 600;
    color: #D7291D;
    margin-bottom: 6PX;

    .max-font {
      font-size: 20PX;
    }
    .sec_label {
      height: 18PX;
      font-size: 11PX;
      font-weight: 600;
      color: #DC3D2E;
      line-height: 18PX;
      text-align: center;
      padding: 0 6PX;
      margin: 0 0 3PX 4PX;
      background-image: linear-gradient(90deg, #FFD672 0%, #FDEEC1 100%);
      border-radius: 9PX 9PX 9PX 0;
    }
  }
  .market-price {
    font-size: 13PX;
    color: #B2B2B2;
    font-weight: 400;

    .font-line {
      text-decoration: line-through;
    }
  }
  .margin-10 {
    margin-left: 10PX;
  }

  .good-detail {
    padding: 12PX;
    background: #fff;
  }

  .detail-title {
    font-size: 16PX;
    font-weight: 600;
    color: #333333;
    line-height: 22PX;
    padding-bottom: 6PX;
  }

  .detail-list .van-image{
    vertical-align: middle;
  }
</style>

<template>
  <div class="hot" @click="onToDetail">
    <div class="right-img">抢购</div>
    <div class="left-box">
      <van-image
        class="hot-good-img"
        width="117px"
        height="117px"
        :src="good.image"
      />
    </div>
    <div class="right-box">
      <div class="title">{{good.goodsName}}</div>
      <div class="tags">
        <div class="tag" v-for="(item, index) in good.couponList" :key="index">{{item.couponDesc}}</div>
      </div>
      <div class="buy-box">
        <swiper class="swiper"
          :options="swiperOption"
        >
          <swiper-slide v-for="(item, index) in good.avatorList" :key="index">
            <div class="item">
              <img :src="item.icon">
            </div>
          </swiper-slide>
        </swiper>
        <div class="number-of-buyers">...{{good.virtualBuyNum}}人正在购买</div>
      </div>
      <div class="price">
        <span class="price-symbol">¥</span>
        <span class="span1">{{good.salePrice/100}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { getImgUrl } from '@/utils/tools';
import { appBaseUrl } from "@/constant/index";
import { goToApp } from '@/utils/userInfo';
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper)
export default {
  props: {
    good: {
      type: Object,
      default: () => {},
    },
    hasToken: {
      type: Boolean,
      default: false,
    },
    inviteCode: {
      type: String,
      default: '',
    }
  },
  data () {
    return {
      swiperOption: {
        slidesPerView: 4,
        // 设置自动轮播
        autoplay: {
          delay: 1000 // 5秒切换一次
        },
        // 设置轮播可循环
        loop: true
      }
    }
  },
  methods: {
    getImgUrl,
    onToDetail() {
      if (!this.hasToken) {
        this.$router.push({
          path: '/new-share',
          query: {
            inviteCode: this.inviteCode
          },
        });
        return
      }
      // 跳转到商品详情页面
      goToApp(this.good.actionUrl, '', '', this.$bridge)
    }
  }
}
</script>

<style lang="scss" scoped>
.swiper-container {
  margin: 0 0;
}
.swiper-slide-prev {
  opacity: 0;
  transition: all 1s;
}
.hot {
  position: relative;
  width: 100%;
  padding: 12px 12px 12px 8px;
  background-color: #ffffff;
  margin-bottom: 12px;
  border-radius: 8px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
}
.left-box {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 117px;
  height: 117px;
  border-radius: 12px;
  overflow: hidden;
  margin-right: 8px;
  .hot-good-img {
    border-radius: 12px;
    overflow: hidden;
  }
}
.right-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 208px;
}
.buy-box {
  margin-bottom: 14px;
  width: 100%;
  height: 21px;
  display: flex;
  justify-content: flex-start;
  .swiper {
    position: relative;
    width: 60px;
    height: 21px;
    overflow: hidden;
    .item {
      width: 21px;
      height: 21px;
      border: 1px solid #EB483F;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .number-of-buyers {
    margin-left: 4px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
    line-height: 21px;
  }
}
.tags {
  margin-bottom: 8px;
  width: 100%;
  height: 14px;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  .tag {
    margin-right: 6px;
    padding: 0 6px;
    height: 14px;
    font-size: 10px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #EB483F;
    line-height: 14px;
    background: rgba(235, 72, 63, 0.1);
    border-radius: 2px;
  }
}
.title {
  height: 22px;
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  line-height: 22px;
  margin-bottom: 8px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.price {
  width: 60%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.price-symbol {
  font-size: 12px;
  font-family: HelveticaNeue-Bold, HelveticaNeue;
  font-weight: bold;
  color: #D7291D;
  line-height: 18px;
}
.span1 {
  font-size: 15px;
  font-family: HelveticaNeue-Bold, HelveticaNeue;
  font-weight: bold;
  color: #D7291D;
  line-height: 18px;
}
.right-img {
  position: absolute;
  right: 12px;
  bottom: 12px;
  width: 80px;
  height: 34px;
  background: linear-gradient(270deg, #D7291D 0%, #FB5F2A 100%);
  box-shadow: 1px 1px 2px 0px rgba(228, 45, 59, 0.3);
  border-radius: 17px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #FFFFFF;
  line-height: 34px;
  text-align: center;
}
</style>


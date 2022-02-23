<template>
  <div class="detail-container">
    <template v-if="goodDetail.orderType">
      <div class="swipe-box">
        <Swipe
          :autoplay="3000"
          indicator-color="white"
          :show-indicators="false"
          @change="handleSwipeChange"
        >
          <SwipeItem v-for="item in goodDetail.imageList" v-bind:key="item">
            <div class="swiper-item">
              <van-image width="375" height="375" fit="cover" :src="item" />
              <div class="banner-mask"/>
            </div>
          </SwipeItem>
        </Swipe>
        <div class="dot-box">{{bannerIndex + 1}}/{{goodDetail.imageList.length}}</div>
      </div>

      <div
        class="flex_middle head-red-box"
        :style="`background-image: url(${headBackImg})`"
        v-if="goodDetail.orderType == 5 || goodDetail.orderType == 6 || goodDetail.orderType == 22"
      >
        <div class="head-red-price">
          <div class="flex_middle red-price-box">
            <div>
              <span class="red-price-unit">¥</span>
              <span class="red-price-text">{{goodDetail.priceObj.price}}</span>
            </div>
            <div class="sec_label">
              {{goodDetail.orderType == 22 && '样品限购一次' || ''}}
              {{(goodDetail.orderType == 5 || goodDetail.orderType == 6) && '集约价' || ''}}
            </div>
          </div>
          <div>
            <span class="red-market-price">市场价¥{{goodDetail.marketPrice / 100}}</span>
            <span class="red-min-buy" v-if="goodDetail.orderType == 5 || goodDetail.orderType == 6">{{goodDetail.buyMinNum}}{{goodDetail.unit}}起订</span>
          </div>
        </div>
        <div class="flex_middle head-red-other">
          <div
            class="flex_middle red-count-down"
            :style="`background-image: url(${headOtherBackImg})`"
            v-if="goodDetail.orderType == 5 || goodDetail.orderType == 6"
          >
            <div class="red-time-title">距活动结束仅剩</div>
            <CountDown :time="goodDetail.lastTime">
              <template #default="timeData">
                <div class="flex_middle">
                  <div class="time-block" v-if="timeData.days > 0">{{ timeData.days }}</div>
                  <div class="time-colon" v-if="timeData.days > 0">天</div>
                  <div class="time-block">{{ timeData.hours }}</div>
                  <div class="time-colon">:</div>
                  <div class="time-block">{{ timeData.minutes }}</div>
                  <div class="time-colon">:</div>
                  <div class="time-block">{{ timeData.seconds }}</div>
                </div>
              </template>
            </CountDown>
          </div>
          <div class="red-min-buy" v-if="goodDetail.orderType == 22">{{goodDetail.buyMinNum}}{{goodDetail.unit}}起订</div>
        </div>
      </div>
      <div class="good-head">
        <div class="head-title">{{goodDetail.goodsName}}</div>
        <div class="flex_middle head-desc-box">
          <div class="head-desc-text">{{goodDetail.goodsDesc}}</div>
          <div class="head-sales" v-if="goodDetail.orderType == 15 || goodDetail.orderType == 16 || goodDetail.orderType == 2">{{goodDetail.goodsSaleNumStr}}</div>
        </div>
        <div class="flex_middle head-price-box" v-if="goodDetail.orderType == 15 || goodDetail.orderType == 16 || goodDetail.orderType == 2">
          <div class="price-name" v-if="goodDetail.orderType == 15 || goodDetail.orderType == 16">集约价：</div>
          <div class="price-text">¥<span class="max-font">{{goodDetail.priceObj.max}}</span>.{{goodDetail.priceObj.min}}</div>
          <div class="sec_label" v-if="goodDetail.orderType == 2">秒约特惠</div>
          <div class="market-price margin-10" v-if="goodDetail.orderType == 15 || goodDetail.orderType == 16">市场价<span class="font-line">¥{{goodDetail.marketPrice / 100}}</span></div>
        </div>
        <div class="market-price" v-if="goodDetail.orderType == 2">市场价<span class="font-line">¥{{goodDetail.marketPrice / 100}}</span></div>
      </div>

      <div class="good-detail">
        <div class="detail-title">商品详情</div>
        <div class="detail-list">
          <van-image
            width="100%"
            fit="cover"
            :src="item"
            v-for="item in goodDetail.contentImageList"
            v-bind:key="item"
          />
        </div>
      </div>
    </template>
    <el-empty :description="noData" v-if="noData"></el-empty>
  </div>
</template>

<script>
import '@vant/touch-emulator';
import { Swipe, SwipeItem, Image, CountDown } from 'vant';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import { getImgUrl } from '@/utils/tools';
import orderApi from '@/apis/order';
import { appBaseUrl, meBaseUrl } from "@/constant/index";
import Vue from 'vue';

Vue.use(ElementUI);

export default {
  data() {
    return {
      goodDetail: {
        imageList: [],
      },
      apiParams: {},
      bannerIndex: 0,
      info: null,
      headBackImg: getImgUrl('/publicMobile/servicepage/good/jiyue_back.png'),
      headOtherBackImg: getImgUrl('/publicMobile/servicepage/good/jiyue_time.png'),
      noData: '',
    };
  },
  mounted() {
    const {
      query,
    } = this.$router.history.current;
    this.apiParams = query;
    // activityId objectId
    if(query.orderType && query.skuId && query.spuId) {
      this.getGoodDetail();
    }
  },
  methods: {
    getImgUrl,
    // 获取订单详情
    getGoodDetail() {
      if(this.apiParams.orderType == 5 || this.apiParams.orderType == 6) {
        // 商品详情 B端集约
        orderApi.getBDetail(this.apiParams).then(res => {
          if(res.code == 0 && res.success) {
            let data = res.data;
            data.priceObj = this.handlePrice(data.salePrice);
            if(data.deadlineTime) {
              console.log(data.deadlineTime - data.currentTime)
              let lastTime = parseInt((data.deadlineTime - data.currentTime));
              data.lastTime = lastTime > 0 ? lastTime : 0;
            }
            this.goodDetail = data;
          } else {
            this.noData = res.msg;
          }
        });
      } else {
        // 商品详情 C端集约 秒约 样品
        orderApi.getGoodDetail(this.apiParams).then(res => {
          if(res.code == 0 && res.success) {
            let data = res.data;
            data.priceObj = this.handlePrice(data.salePrice);
            this.goodDetail = data;
          } else {
            this.noData = res.msg;
          }
        });
      }
    },
    handlePrice(price) {
      const amount = (price || 0) / 100;
      const amountList = `${amount}`.split('.');
      let max = +amountList[0];
      let min = amountList[1] && amountList[1].length > 1 ? +amountList[1] : '00';
      return {
        price: `${max}.${min}`,
        max,
        min,
      }
    },
    handleSwipeChange(index) {
      this.bannerIndex = index;
    },
  },
  components: {
    Swipe,
    SwipeItem,
    [Image.name]: Image,
    CountDown,
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
    background: linear-gradient(144deg, #ED8065 0%, #D7291D 100%);
    // background: rgba($color: #000000, $alpha: .35);
    border-radius: 20PX;
  }
  .good-head {
    padding: 12PX;
    margin-bottom: 12PX;
    background: #fff;
  }
  .head-red-box {
    justify-content: space-between;
    width: 100%;
    height: 60PX;
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .head-red-price {
    padding-left: 16PX;
  }
  .red-price-box {
    color: #fff;
  }
  .red-price-unit {
    font-size: 18PX;
    font-weight: 600;
  }
  .red-price-text {
    font-size: 28PX;
    font-weight: 600;
  }
  .red-min-buy,
  .red-market-price {
    font-size: 12PX;
    color: #fff;
  }
  .red-min-buy {
    padding-left: 12PX;
    padding-right: 12PX;
  }
  .head-red-other {
    justify-content: flex-end;
    width: 164PX;
    height: 60PX;
    padding-left: 20PX;
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .red-count-down {
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .red-time-title {
    font-size: 14PX;
    font-weight: 600;
    color: #D72A1E;
    line-height: 18PX;
    margin-bottom: 10PX;
  }
  .time-block {
    display: inline-block;
    min-width: 20PX;
    height: 20PX;
    color: #fff;
    font-size: 12PX;
    line-height: 20PX;
    text-align: center;
    padding: 0 4PX;
    background-color: #ee0a24;
    border-radius: 3PX;
  }
  .time-colon {
    display: inline-block;
    margin: 0 4PX;
    color: #ee0a24;
    font-size: 12PX;
    font-weight: 600;
    line-height: 20PX;
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

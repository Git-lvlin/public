<template>
  <div class="goods-item" @click="onToDetail">
    <div class="flex_fix img-wrap">
      <van-image class="goods_img" width="100%" height="100%" :src="good.imageUrl" />
      <van-image v-if="good.memberType" class="new_tag_image" width="24px" height="43px" :src="newTagImage" />
      <!-- <pic
        :width="100 | pxtovw"
        :height="100 | pxtovw"
        :src="good.imageUrl"
      /> -->
      <div class="stock-null" v-if="!good.stockNum">
        <div class="null">已售罄</div>
      </div>
    </div>
    <div class="info_box">
      <div class="title text_two_line" :class="!good.stockNum?'null-title':''">{{good.goodsName}}</div>
      <div class="goods_num" :class="!good.stockNum?'null-num':''">
        <van-image width="15px" height="15px" :src="!good.stockNum?iconNull:icon" />
        <div class="goods_num_str" :class="!good.stockNum?'null-num-str':''">{{good.goodsSaleNumStr}}</div>
      </div>
      <!-- <div class="desc text_one_line">{{good.goodsDesc}}</div> -->
      <!-- <div class="time_down"><count-down :time="good.endTime" color="#e7512d" />后结束</div> -->
      <div class="flex_middle footer">
        <div class="price_box">
          <!-- <div class="price_market">
            <span>市场价：</span>
            <em>¥{{good.marketPrice | price}}</em>
          </div> -->
          <div class="price" :class="!good.stockNum?'null-price':''">
            <span class="text_red" :class="!good.stockNum?'null-text_red':''">拼团价 </span>
            <span class="text_small">¥</span>
            <span>{{good.activityPrice | price}}</span>
          </div>
        </div>
       
      </div>
    </div>
    <div class="btn last_arrow" :class="!good.stockNum?'null-btn':''">马上抢</div>
  </div>
</template>

<script>
// import Image from '@/components/image';
import Vue from 'vue';
import { Image as VanImage } from 'vant';
import CountDown from '@/components/count-down';
import { appBaseUrl } from "@/constant/index";
import { getImgUrl } from '@/utils/tools';
import {
  goToApp,
} from '@/utils/userInfo';
Vue.use(VanImage);
export default {
  props: {
    width: {
      type: String,
      default: '50%',
    },
    good: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    // pic: Image,
    CountDown,
  },
  data() {
    return {
      time: 30 * 60 * 60 * 60,
      icon: getImgUrl('publicMobile/collage/icon-hot.png'),
      iconNull: getImgUrl('publicMobile/collage/icon-hot-null.png'),
      newTagImage: getImgUrl('publicMobile/collage/new.png'),
    };
  },
  methods: {
    onToDetail() {
      const {
        good,
      } = this;
      const paramStr = `?orderType=${good.orderType || 3}&spuId=${good.spuId || ''}&objectId=${good.objectId || ''}&activityId=${good.activityId || ''}&skuId=${good.skuId || ''}&wsId=${good.wsId || ''}`
      console.log(window.navigator)
      console.log("$store.state.appInfo", this.$store.state.appInfo)
      if (this.$store.state.appInfo.isApp) {
        goToApp(appBaseUrl, '/shopping/detail', paramStr)
        // this.$bridge.callHandler(
        //   'router',
        //   `${appBaseUrl}/shopping/detail${paramStr}`,
        // )
      } else if (this.$store.state.appInfo.isMiniprogram) {
        wx.miniProgram.navigateTo({
          url: `/subpages/cart/detail/index${paramStr}`
        })
      } else {
        console.log('不是App内')
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.goods-item {
  position: relative;
  display: flex;
  align-items: center;
  padding: 21px 12px;
  margin-bottom: 12px;
  background-color: #ffffff;
  border-radius: 8px;
}

.img-wrap {
  position: relative;
  width: 100px;
  height: 100px;
  overflow: hidden;
  border-radius: 8px;
}
.goods_img {
  position: absolute;
  top: 0;
}
.new_tag_image {
  position: absolute;
  top: 0;
  left: 0;
}
.stock-null {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 100px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  overflow: hidden;
  .null {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.7);
    font-size: 18px;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 80px;
    text-align: center;
  }
}
// .sale {
//   width: 100px;
//   height: 22px;
//   color: #ffffff;
//   font-size: 12px;
//   line-height: 22px;
//   text-align: center;
//   background-color: #d7291d;
// }

.info_box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-left: 8px;
}
.title {
  height: 39px;
  color: #333333;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 4px;
}
.null-title {
  color: #999999;
}
.desc {
  color: #999999;
  font-size: 14px;
  line-height: 20px;
}
// .time_down{
//   display: flex;
//   justify-content: flex-end;
//   color: #e7512d;
//   font-size: 14px;
//   line-height: 14px;
//   margin: 6px 0;
// }
.footer {
  justify-content: space-between;
}
.price_market {
  color: #b2b2b2;
  font-size: 10px;
  letter-spacing: 0.5px;
  text-decoration: line-through;
  line-height: 14px;
  margin-bottom: 4px;
}
.price {
  font-weight: 700;
  color: #FF0000;
  font-size: 14px;
  line-height: 15px;
}
.text_red {
  color: #FF0000;
}
.null-text_red {
  color: #999999;
}
.text_small {
  font-size: 10px;
}
.null-price {
  color: #999999;
}
.btn {
  position: absolute;
  right: 11px;
  bottom: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 75px;
  height: 32px;
  color: #ffffff;
  font-size: 14px;
  line-height: 20px;
  background-color: #FF0000;
  border-radius: 4px;
}
.null-btn {
  background: #D8D8D8;
  color: #FFFFFF;
}
.goods_num {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 7px;
  width: 100px;
  height: 17px;
  line-height: 17px;
  background: #FFECEC;
  border-radius: 10px;
  overflow: hidden;
  .goods_icon {
    margin-right: 1px;
    width: 15px;
    height: 15px;
    overflow: hidden;
  }
  .goods_num_str {
    height: 17px;
    font-size: 12px;
    font-weight: 400;
    color: #FF0000;
    line-height: 17px;
  }
  .null-num-str {
    color: #FFFFFF;
  }
}
.null-num {
  background: #D8D8D8;
}


</style>

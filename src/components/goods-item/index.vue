<template>
  <div class="goods-item" @click="onToDetail">
    <div class="flex_fix img-wrap">
      <pic
        :width="100 | pxtovw"
        :height="100 | pxtovw"
        :src="good.imageUrl"
      />
      <div class="sale" >已约{{good.activitySaleNum}}件</div>
    </div>
    <div class="info_box">
      <div class="title text_two_line">{{good.goodsName}}</div>
      <div class="desc text_one_line">{{good.goodsDesc}}</div>
      <div class="time_down"><count-down :time="good.endTime" color="#e7512d" />后结束</div>
      <div class="flex_middle footer">
        <div class="price_box">
          <div class="price_market">
            <span>市场价：</span>
            <em>¥{{good.marketPrice | price}}</em>
          </div>
          <div class="price">
            <span class="text_red">单约价 </span>
            <span class="text_small">¥</span>
            <span>{{good.activityPrice | price}}</span>
          </div>
        </div>
        <div class="btn last_arrow">去单约</div>
      </div>
    </div>
  </div>
</template>

<script>
import Image from '@/components/image';
import CountDown from '@/components/count-down';
import { getBaseApiUrl } from "@/utils/tools";

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
    pic: Image,
    CountDown,
  },
  data() {
    return {
      time: 30 * 60 * 60 * 60,
    };
  },
  methods: {
    onToDetail() {
      const {
        good,
      } = this;
      const baseUrl = getBaseApiUrl();
      const paramStr = `?orderType=${good.orderType || 3}&spuId=${good.spuId || ''}&objectId=${good.objectId || ''}&activityId=${good.activityId || ''}&skuId=${good.skuId || ''}&wsId=${good.wsId || ''}`
      if (this.$store.state.appInfo.isApp) {
        this.$bridge.callHandler(
          'router',
          `${baseUrl}/shopping/detail${paramStr}`,
        )
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
  display: flex;
  padding: 12px;
  margin-bottom: 12px;
  background-color: #ffffff;
  border-radius: 8px;
}

.img-wrap {
  width: 100px;
  height: 122px;
  overflow: hidden;
  border-radius: 8px;
}
.sale {
  width: 100px;
  height: 22px;
  color: #ffffff;
  font-size: 12px;
  line-height: 22px;
  text-align: center;
  background-color: #d7291d;
}

.info_box {
  flex: 1;
  margin-left: 8px;
}
.title {
  height: 40px;
  color: #333333;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 4px;
}
.desc {
  color: #999999;
  font-size: 14px;
  line-height: 20px;
}
.time_down{
  display: flex;
  justify-content: flex-end;
  color: #e7512d;
  font-size: 14px;
  line-height: 14px;
  margin: 6px 0;
}
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
  color: #d7291d;
  font-size: 14px;
  line-height: 15px;
}
.text_red {
  color: #e7532c;
}
.text_small {
  font-size: 10px;
}
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 75px;
  height: 32px;
  color: #ffffff;
  font-size: 14px;
  line-height: 20px;
  background-color: #d7291d;
  border-radius: 4px;
}
</style>

<template>
  <div class="team_detail_panle">
    <div class="flex_middle">
      <div class="flex_fix img_warp">
        <pic
          width="140px"
          height="140px"
          :src="good.imageUrl"
        />
        <div class="sale_num">{{good.saleNum}}人成团</div>
      </div>
      <div class="info_box">
        <div class="flex_middle store">
          <pic
            width="16px"
            height="16px"
            round
            :src="good.storeInfo && good.storeInfo.storeIcon || ''"
          />
          <div class="store_name text_one_line">{{good.storeInfo && good.storeInfo.storeName || ''}}</div>
        </div>
        <div class="team_title text_two_line">
          <span
            class="label"
            :style="{
              'background-image': `url('${getImgUrl('publicMobile/common/team_label.png')}')`
            }"
          />
          {{good.goodsName}}
        </div>
        <div class="team_desc">{{good.goodsDesc}}</div>
        <div class="price_box">
          <div class="flex_middle progress_box" >
            <div class="flex_fix progress_back"><div class="progress">70%</div></div>
            <div class="sale" >已约{{good.activitySaleNum}}件</div>
          </div>
          <div class="price">
            <span class="price_title">团购价</span>
            <div class="price_text">
              <span class="min_size">¥</span>
              {{good.activityPrice | price}}
            </div>
            <span class="market_price">¥{{good.marketPrice | price}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="join_btn" @click="onToConfirmOrder">立即参与团约</div>
  </div>
</template>

<script>
import Image from '@/components/image';
import { getImgUrl, getBaseApiUrl } from '@/utils/tools';

export default {
  props: {
    good: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    pic: Image,
  },
  data() {
    return {
      time: 30 * 60 * 60 * 60,
    };
  },
  methods: {
    getImgUrl,
    onToConfirmOrder() {
      const {
        good,
      } = this;
      const baseUrl = getBaseApiUrl();
      const orderData = {
        orderType: good.orderType || 4,
        objectId: good.objectId || '',
        activityId: good.activityId || '',
        storeGoodsInfos: [],
      }
      orderData.storeGoodsInfos[0] = {
        storeNo: good.storeInfo.storeNo,
        goodsInfos: [{
          spuId: good.spuId,
          skuId: good.skuId,
          skuNum: 1,
        }]
      };
      const paramStr = JSON.stringify(orderData);
      console.log("🚀 ~ file: index.vue ~ line 93 ~ onToConfirmOrder ~ paramStr", paramStr)
      if (this.$store.state.appInfo.isApp) {
        this.$bridge.callHandler(
          'router',
          `${baseUrl}/shopping/confirmOrder?data=${paramStr}`,
        )
      } else{
        console.log('不是App内')
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.team_detail_panle {
  overflow: hidden;
  padding: 12px;
  margin: 0 12px 12px;
  background-color: #fff;
  border-radius: 8px;
}
.img_warp {
  border-radius: 8px;
  overflow: hidden;
}
.sale_num {
  width: 140px;
  height: 22px;
  color: #ffffff;
  font-size: 14px;
  line-height: 22px;
  text-align: center;
  background-color: #d7291d;
}
.info_box {
  padding-left: 12px;
  overflow: hidden;
}
.store {
  margin-bottom: 6px;
}
.store_name {
  color: #333333;
  font-size: 14px;
  line-height: 20px;
  margin-left: 3px;
}
.label {
  display: inline-block;
  vertical-align: middle;
  width: 32px;
  height: 17px;
  background-size: 100% auto;
}
.team_title {
  max-width: 100%;
  height: 44px;
  color: #333333;
  font-size: 16px;
  line-height: 22px;
  padding-left: 3px;
  margin-bottom: 2px;
}
.team_label {
  vertical-align: middle;
  width: 32px;
  height: 17px;
}
.team_desc {
  color: #999999;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 7px;
}

.progress_box{
  flex-wrap: nowrap;
}
.progress_back {
  width: 80px;
  height: 16px;
  background-color: #f8aeae;
  border-radius: 16px;
}
.progress {
  width: 60px;
  height: 16px;
  color: #ffffff;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  background-image: linear-gradient(90deg, #fb5f2a 0%, #e5362f 100%);
  border-radius: 16px;
}
.sale {
  color: #b8b8b8;
  font-size: 14px;
  line-height: 20px;
  margin-left: 6px;
}
.price {
  display: flex;
  margin-top: 12px;
}
.price_title {
  color: #e7532c;
  font-size: 14px;
  line-height: 20px;
}
.price_text {
  font-weight: 700;
  color: #d7291d;
  font-size: 16px;
  line-height: 20px;
  margin-left: 2px;
}
.market_price {
  color: #b2b2b2;
  font-size: 10px;
  text-decoration: line-through;
  line-height: 22px;
  margin-left: 4px;
}
.min_size {
  font-size: 10px;
}
.join_btn {
  width: 327px;
  height: 48px;
  color: #ffffff;
  font-size: 16px;
  line-height: 48px;
  text-align: center;
  margin-top: 12px;
  background-color: #d7291d;
  border-radius: 48px;
}
</style>

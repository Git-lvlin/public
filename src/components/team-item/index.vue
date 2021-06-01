<template>
  <div class="team_item">
    <div class="img_warp">
      <pic
        width="351px"
        height="195px"
        :src="good.imageUrl"
      />
    </div>
    <div class="info_box">
      <div class="flex_middle team_title">
        <div class="flex_fix">
          <pic
            width="32px"
            height="17px"
            :src="getImgUrl('publicMobile/common/team_label.png')"
          />
        </div>
        <div class="title_text text_one_line">{{good.goodsName}}</div>
      </div>
      <div class="team_desc">{{good.goodsDesc}}</div>
      <div class="footer">
        <div class="price_box">
          <div class="flex_middle" >
            <div class="progress_back">
              <div class="progress" :style="{'width': good.joinPercent}">
                {{good.joinPercent}}
              </div>
            </div>
            <div class="sale" >已约{{good.joinGroupNum}}件</div>
          </div>
          <div class="price">
            <span class="price_title">团购价</span>
            <div class="price_text">
              <span class="min_size">¥</span>
              {{good.salePrice | price}}
            </div>
            <span class="market_price">¥{{good.marketPrice | price}}</span>
          </div>
        </div>
        <div class="control">
          <div class="flex_middle timer">
            <CountTime :time="good.endTime" color="#e7512d" />后结束
          </div>
          <div class="btn last_arrow" v-on:click="onToDetail">去单约</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Image from '@/components/image';
import Big from 'big.js';
import CountTime from '@/components/count-down';
import { getImgUrl } from '@/utils/tools';

Big.DP = 2;

export default {
  props: {
    good: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    pic: Image,
    CountTime,
  },
  data() {
    return {
      time: 30 * 60 * 60 * 60,
    };
  },
  methods: {
    getImgUrl,
    onToDetail() {
      console.log(this.good);
      const {
        activityId,
        spuId,
        skuId,
      } = this.good;
      this.$router.push({
        path: '/team-detail',
        query: {
          activityId,
          spuId,
          skuId,
        },
      });
    },
  },
};
</script>

<style>
.team_item {
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 12px;
}
.img_warp{
  background-color: #fff;
}
.info_box {
  padding: 12px;
  overflow: hidden;
  background-color: #fff;
}
.team_title {
  max-width: 100%;
  margin-bottom: 2px;
}
.title_text {
  flex: 1;
  color: #333333;
  font-size: 16px;
  line-height: 22px;
  padding-left: 3px;
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

.footer {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}
.progress_back {
  width: 108px;
  height: 16px;
  background-color: #f8aeae;
  border-radius: 16px;
}
.progress {
  width: 86px;
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

.timer{
  color: #e7512d;
  font-size: 14px;
  line-height: 14px;
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
  margin-left: auto;
  margin-top: 8px;
  background-color: #d7291d;
  border-radius: 4px;
}
</style>

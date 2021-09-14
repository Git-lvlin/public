<template>
  <div class="save"
  :style="{
    'background-image': `url('${getImgUrl('publicMobile/newpeoples/coupon-bg.png')}')`
  }"
  >
    <van-image
      v-if="good.lqStatus === 2 || hold === 2"
      class="tag"
      width="41px"
      height="34px"
      :src="getImgUrl('publicMobile/newpeoples/coupon-tag.png')"
    />
    <div class="flex">
      <div class="l" v-if="good.couponType === 1 || good.couponType === 3">
        ¥<span class="m">{{good.freeAmount/100}}</span>
      </div>
      <div class="l" v-else>
        <span class="m">{{good.freeDiscount/100}}</span>折
      </div>
      <div class="r">
        <p>{{good.title}}</p>
        <!-- <p class="p">{{good.goodsTypeDisplay}}</p> -->
      </div>
    </div>
  </div>
</template>

<script>
import { getImgUrl } from '@/utils/tools';
export default {
  props: {
    good: {
      type: Object,
      default: () => {},
    },
    hold: {
      typeof: Number,
      default: 1
    }
  },
  methods: {
    getImgUrl,
  }
}
</script>

<style lang="scss" scoped>
.save {
  position: relative;
  display: inline-block;
  margin-right: 8px;
  width: 140px;
  height: 58px;
  background-size: 140px 58px;
  overflow: hidden;
}
.flex {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  z-index: 3;
  .l {
    margin-left: 10px;
    font-family: PingFang SC;
    font-weight: 500;
    color:#f23c2a;
    font-size:14px;
    line-height:20px;
    .m {
      font-size: 22px;
    }
  }
  .r {
    font-family:PingFang SC;
    color:#f23c2a;
    font-size:12px;
    // line-height:14px;
    margin-left: 23px;
    display: flex;
    flex-direction: column;
    text-align: left;
    .p {
      margin-top: 4px;
    }
  }
}
.tag {
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 2;
}


</style>


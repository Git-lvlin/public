<template>
  <div class="hot">

    <div class="index"
      :style="{
        'background-image': `url('${getImgUrl('publicMobile/coupon/coupon.png')}')`
      }"
    >

      <div class="position-one">
        <p class="price" v-if="good.couponType !== 2">¥<span class="big">{{good.freeAmount/100}}</span></p>
        <p class="price" v-else><span class="big">{{good.freeDiscount}}</span>折</p>
        <p class="detail">{{type[good.couponType]}}</p>
      </div>
      <div class="position-two">
        <p class="p1">{{good.couponName}}</p>
        <p class="p2">有效期:{{endTime}}前有效</p>
      </div>
      <div class="position-three" @click="onToDetail">去使用</div>

    </div>

    <div class="fold" :class="open?'look':''" @click="openAll">
      <div class="fold-box" :class="open?'two':''">
        使用规则：{{good.couponRule}}
      </div>
      <van-image
        class="img"
        :class="open?'click':''"
        width="9px"
        height="9px"
        :src="getImgUrl('publicMobile/coupon/arrow.png')"
      />
    </div>

  </div>
</template>

<script>
import { getImgUrl } from '@/utils/tools';
import { Image as VanImage } from 'vant';
import Vue from 'vue';
Vue.use(VanImage);
const type = ['-', '满减券', '折扣券', '立减券']
export default {
  props: {
    good: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      open: false,
      type: ['-', '满减券', '折扣券', '立减券'],
    }
  },
  computed: {
    endTime:function() {
      var date = new Date(this.good.activityEndTime);
      var YY = date.getFullYear() + '.';
      var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '.';
      var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
      return YY + MM + DD;
    }
  },
  methods: {
    openAll() {
      this.open = !this.open
    },
    getImgUrl,
    onToDetail() {
      const {
        good,
      } = this;
      const paramStr = `?orderType=${good.orderType || 3}&spuId=${good.spuId || ''}&objectId=${good.objectId || ''}&activityId=${good.activityId || ''}&skuId=${good.skuId || ''}&wsId=${good.wsId || ''}`
      console.log(window.navigator)
      console.log("$store.state.appInfo", this.$store.state.appInfo)
      if (this.$store.state.appInfo.isApp) {
        this.$bridge.callHandler(
          'router',
          `${appBaseUrl}/shopping/detail${paramStr}`,
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
}
</script>

<style lang="scss" scoped>
.hot {
  width: 100%;
  margin-bottom: 12px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
}
.index {
  width: 100%;
  height: 74px;
  background-size: 100% 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .position-one {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-left: 30px;
    .price {
      font-family:Helvetica Neue;
      font-weight:700;
      color:#d93d33;
      font-size:18.66px;
      letter-spacing:1.77px;
      line-height:22px;
      .big {
        font-size: 24px;
      }
    }
    .detail {
      font-family:PingFang SC;
      color:#d93d33;
      font-size:10px;
      line-height:14px;
      white-space:nowrap;
    }
  }
  .position-two {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding-left: 32px;
    .p1 {
      font-family:PingFang SC;
      color:#d93d33;
      font-size:14px;
      line-height:20px;
      margin-bottom: 6px;
    }
    .p2 {
      font-family:PingFang SC;
      color:#d93d33;
      font-size:10px;
      line-height:14px;
    }
  }
  .position-three {
    margin-right: 8px;
    width: 60px;
    height: 27px;
    border-radius:13.5px;
    background-color: #d93d33;
    font-family: PingFang SC;
    font-weight: 500;
    color: #ffffff;
    font-size: 12px;
    line-height: 27px;
    text-align: center;
  }
}
.fold {
  position: relative;
  width: 100%;
  height: 22px;
  overflow: hidden;
  background-color: #fbfbfb;
  font-family: PingFang SC;
  font-weight: 200;
  color:#999999;
  font-size: 10px;
  line-height: 22px;
  .fold-box {
    margin-left: 12px;
    padding-top: 3px;
    padding-bottom: 4px;
    width: 250px;
    height: 44px;
    overflow: hidden;
    /* 将对象作为弹性伸缩盒子模型显示 。 */
    display: -webkit-box;
    /* 限制在一个块元素显示的文本的行数，即行数设置 */
    -webkit-line-clamp: 1;
    /* 规定框从上向下垂直排列子元素 */
    -webkit-box-orient: vertical;
  }
  .two {
    -webkit-line-clamp: 2;
  }
  .img {
    position: absolute;
    right: 22px;
    top: 8px;
    transform:rotate(180deg);
    transform: all 1.2s;
  }
  .click {
    position: absolute;
    right: 22px;
    top: 8px;
    transform:rotate(360deg);
  }
  transform: all 1.2s;
}
.look {
  height: 48px;
}

</style>


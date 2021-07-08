<template>
  <div class="hot">

    <div class="index"
      :style="{
        'background-image': `url('${getImgUrl('publicMobile/coupon/coupon.png')}')`
      }"
    >

      <div class="position-one">
        <p class="price">¥<span class="big">8</span></p>
        <p class="detail">无门槛</p>
      </div>
      <div class="position-two">
        <p class="p1">{{good.title}}</p>
        <p class="p2">有效期:2021.05.01前有效</p>
      </div>
      <div class="position-three">去使用</div>

    </div>

    <div class="fold">
      使用规则：限首单使用，不包含新人专享，不和其他满减券和折扣券同时使用
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
  },
  methods: {
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
  height: 111px;
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
  width: 100%;
  background-color:#fbfbfb;
  font-family:PingFang SC;
  font-weight:200;
  color:#999999;
  font-size:10px;
  line-height:14px;
}

</style>


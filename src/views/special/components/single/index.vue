<template>
  <div class="save" @click="onToDetail">
    <van-image
      class="img"
      width="78px"
      height="78px"
      :src="good.image"
    />
    <div class="tag" v-if="!good.goodsContestRate">精选特惠</div>
    <div class="save-tag-box" v-else>
      <span class="tag1">降价</span>
      <span class="tag2">{{good.goodsContestRate+'%'}}</span>
    </div>
    <div class="price">
      <span class="span1">¥{{good.salePrice/100}}</span>
      <span class="span2">¥{{good.marketPrice/100}}</span>
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
.save {
  display: inline-block;
  margin-right: 12px;
  width: 78px;
  height: 100%;
  overflow: hidden;
}
.img {
  border-radius: 4px;
}
.tag {
  width: 46px;
  height: 14px;
  background-image: linear-gradient(270deg,#fb5f2a 0%,#e5352f 100%);
  border-radius: 2px;
  font-size: 10px;
  line-height: 14px;
  font-family: PingFang SC;
  color: #ffffff;
  text-align: center;
  margin-bottom: 4px;
}
.price {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.span1 {
  font-family: Helvetica Neue;
  font-weight: 700;
  letter-spacing: 1.17px;
  color: #d7291d;
  font-size: 10px;
}
.span2 {
  font-family: PingFang SC;
  color: #999999;
  font-size: 10px;
  letter-spacing: 0.5px;
  text-decoration: line-through;
}
.save-tag-box {
  width: 52px;
  height: 14px;
  border-radius: 2px;
  display: flex;
  margin-bottom: 4px;
  .tag1 {
    width: 50%;
    height: 100%;
    background-color: #e6362f;
    font-family:PingFang SC;
    font-weight: 500;
    color: #ffffff;
    font-size: 10px;
    line-height: 14px;
    text-align: center;
  }
  .tag2 {
    width: 50%;
    height: 100%;
    font-family: PingFang SC;
    color: #d7291d;
    font-size: 10px;
    line-height: 14px;
    text-align: center;
  }
}

</style>


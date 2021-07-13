<template>
  <div class="save" @click="onToDetail"
  :style="{
    'background-image': `url('${getImgUrl('publicMobile/newpeoples/coupon-bg.png')}')`
  }"
  >
    <div class="flex">
      <div class="l">
        ¥<span class="m">20</span>
      </div>
      <div class="r">
        <p>满45.00可用</p>
        <p class="p">常温奶酒</p>
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
  margin-right: 8px;
  width: 140px;
  height: 100%;
  background-size: 100% 100%;
  overflow: hidden;
}
.flex {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .l {
    margin-left: 10px;
    font-family:PingFang SC;
    font-weight:500;
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
    font-size:10px;
    line-height:14px;
    margin-left: 23px;
    display: flex;
    flex-direction: column;
    text-align: left;
    .p {
      margin-top: 4px;
    }
  }
}



</style>


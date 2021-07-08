<template>
  <div class="save" @click="onToDetail">
    <van-image
      class="img"
      width="100px"
      height="100px"
      :src="good.image"
    />
    <div id="good-name">{{good.title}}</div>
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
  margin-right: 6px;
  width: 100px;
  height: 100%;
  overflow: hidden;
}
.img {
  display: inline-block;
  border-radius: 4px;
  overflow: hidden;
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
#good-name {
  margin-bottom: 6px;
  width: 100px;
  height: 28px;
  font-family: PingFang SC;
  color: #333333;
  font-size: 12px;
  line-height: 14.2px;
  white-space: pre-wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box; // 作为弹性伸缩盒子模型显示。
  -webkit-box-orient: vertical; // 设置伸缩盒子的子元素排列方式--从上到下垂直排列
  -webkit-line-clamp: 2; // 显示的行
}
</style>


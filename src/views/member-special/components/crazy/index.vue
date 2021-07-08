<template>
  <div class="hot" @click="onToDetail">
    <div class="left-box">
      <van-image
        class="hot-good-img"
        width="100px"
        height="100px"
        :src="good.image"
      />
      <div class="save">{{'已有'+good.goodsContestRate+'人参团'}}</div>
    </div>
    <div class="right-box">
      <div class="title">
        <van-image
          class="title-icon"
          width="32px"
          height="17px"
          :src="getImgUrl('publicMobile/special/tag.png')"
        />
        {{good.title}}
      </div>
      <div class="compare">七天无理由退换丨全场包邮</div>
      <div class="price">
        <span class="span1">团约价</span>
        <span class="span3">¥{{good.salePrice/100}}</span>
        <span class="span2">市场价：¥{{good.marketPrice/100}}</span>
        <div class="right-img">马上抢></div>
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
.hot {
  width: 100%;
  padding: 12px;
  background-color: #ffffff;
  margin-bottom: 12px;
  border-radius: 8px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
}
.left-box {
  display: flex;
  flex-direction: column;
  width: 100px;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
}
.save {
  text-align: center;
  width: 100%;
  height: 22px;
  line-height: 22px;
  background-color: #d7291d;
  color: #ffffff;
  font-family: PingFang SC;
  font-size: 12px;
}
.save2 {
  text-align: center;
  width: 100%;
  height: 22px;
  line-height: 22px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #b37614;
  font-size: 12px;
  background-image: linear-gradient(90.02deg,#fbf8cc 0%,#fae963 100%);
}
.right-box {
  padding-left: 6px;
  position: relative;
  width: 225px;
  height: 122px;
}
.title {
  width: 100%;
  height: 44px;
  font-family: PingFang SC;
  color: #333333;
  font-size: 16px;
  line-height: 22px;
  margin-bottom: 5px;
  overflow: hidden;
  /* 将对象作为弹性伸缩盒子模型显示 。 */
  display: -webkit-box;
  /* 限制在一个块元素显示的文本的行数，即行数设置 */
  -webkit-line-clamp: 2;
  /* 规定框从上向下垂直排列子元素 */
  -webkit-box-orient: vertical;
  .title-icon {
    position: relative;
    top:4px;
  }
}
.sort {
  display: flex;
  justify-content: flex-start;
  width: 174px;
  height: 18px;
  background-image: linear-gradient(90deg,#fdf6f2 0%,#fdf6f2 100%);
  border-radius: 9.5px;
  margin-bottom: 5px;
  font-family: PingFang SC;
  color: #333333;
  font-size: 13px;
  line-height: 18px;
}
.icon {
  margin-left: 8px;
}
.num {
  display: flex;
  justify-content: flex-start;
  width: 91px;
  height: 18px;
  background-image: linear-gradient(90deg,#fdf1f4 0%,#fdf1f4 100%);
  border-radius: 9.5px;
  margin-bottom: 4px;
  font-family: PingFang SC;
  color: #333333;
  font-size: 13px;
  line-height: 18px;
}
.compare {
  height: 20px;
  font-family:PingFang SC;
  color:#999999;
  font-size:14px;
  line-height: 20px;
}
.span1 {
  position: absolute;
  left: 6px;
  bottom: 17px;
  width:42px;
  height:20px;
  font-family:PingFang SC;
  font-weight:500;
  color:#e7532c;
  font-size:14px;
  line-height:20px;
}
.span2 {
  position: absolute;
  left: 6px;
  bottom: 0;
  font-family:PingFang SC;
  font-weight:500;
  color:#b2b2b2;
  font-size:10px;
  letter-spacing:0.5px;
  text-decoration:line-through;
  line-height:14px;
}
.span3 {
  position: absolute;
  left: 51px;
  bottom: 15px;
  width: 53px;
  height: 25px;
  font-family: Helvetica Neue;
  font-weight: 700;
  color: #d7291d;
  font-size: 12px;
  letter-spacing: 1.4px;
  line-height: 25px;
  text-align: center;
}
.right-img {
  position: absolute;
  right: 0;
  bottom: 0;
  width:75px;
  height:32px;
  line-height: 32px;
  background-color:#d7291d;
  border-radius:4px;
  font-family:PingFang SC;
  color:#ffffff;
  font-size:14px;
  text-align: center;
}
</style>


<template>
  <span class="hot" @click="onToDetail">
    <div class="left-box">
      <van-image
        class="good-img"
        width="172px"
        height="172px"
        :src="good.image"
      />
    </div>
    <div class="right-box">
      <div class="title">
        <div class="title-index">{{good.title}}</div>
        <div class="sort">{{good.gcName}}</div>
      </div>
      <div class="price">
        <span class="span1">¥<span class="big">{{good.salePrice/100}}</span></span>
        <span class="span2">¥{{good.marketPrice/100}}</span>
      </div>
    </div>
  </span>
</template>

<script>
import { getImgUrl } from '@/utils/tools';
import { appBaseUrl } from "@/constant/index";
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
  width: 172px;
  height: 277px;
  background-color: #ffffff;
  margin-bottom: 7px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.left-box {
  width: 172px;
  height: 172px;
  .good-img {
    width: 172px;
    height: 172px;
  }
}
.right-box {
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 105px;
  overflow: hidden;
}
.title {
  .title-index {
    font-family:PingFang SC;
    text-align: justify;
    font-weight:500;
    color:#333333;
    font-size:14px;
    line-height:18px;
    overflow: hidden;
    /* 将对象作为弹性伸缩盒子模型显示 。 */
    display: -webkit-box;
    /* 限制在一个块元素显示的文本的行数，即行数设置 */
    -webkit-line-clamp: 2;
    /* 规定框从上向下垂直排列子元素 */
    -webkit-box-orient: vertical;
  }
  .sort {
    margin-top: 4px;
    width:48px;
    height:15px;
    background-color:rgba(215, 41, 29, 0.1);
    border-radius:2px;
    font-family:PingFang SC;
    color:#d7291d;
    font-size:10px;
    line-height:15px;
    text-align: center;
  }
}

.price {
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  width: 100%;
}
.span1 {
  font-family: Helvetica Neue;
  font-weight: 700;
  color: #d7291d;
  font-size: 12px;
  letter-spacing: 1.4px;
  line-height: 22px;
  .big {
    font-size: 14px;
  }
}
.span2 {
  margin-left: 8px;
  height: 22px;
  font-family: PingFang SC;
  color: #cccccc;
  font-size: 10px;
  letter-spacing: .5px;
  text-decoration: line-through;
  line-height: 22px;
}
</style>


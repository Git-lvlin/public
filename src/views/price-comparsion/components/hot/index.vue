<template>
  <div class="hot" @click="onToDetail">
    <div class="right-img">立即抢购</div>
    <div class="left-box">
      <van-image
        class="hot-good-img"
        width="122px"
        height="122px"
        :src="good.image"
      />
      <div class="save1" v-if="good.goodsContestRate"><span class="save-text">降价</span><span class="save-num">{{good.goodsContestRate}}%</span></div>
      <div class="save2" v-else><p>精选</p><p>特惠</p></div>
    </div>
    <div class="right-box">
      <div class="title">{{good.title}}</div>
      <div class="sort">
        <van-image
          class="sort-icon"
          width="18px"
          height="18px"
          :src="getImgUrl('publicMobile/price/icon.png')"
        />
        <span class="icon">{{good.gcName}}类销量排名第{{good.gcRang}}</span>
      </div>
      <div class="num">
        <van-image
          class="hot-icon"
          width="18px"
          height="18px"
          :src="getImgUrl('publicMobile/price/hot.png')"
        />
        <span class="icon" v-if="good.saleNum>9999">销量{{parseInt(good.saleNum/10000)+'万+'}}</span>
        <span class="icon" v-else>销量{{good.saleNum}}</span>
      </div>
      <div class="compare">{{good.contestPlatformNum?'共有'+good.contestPlatformNum+'个商场比价':''}}</div>
      <div class="price">
        <span class="span1">¥{{good.salePrice/100}}</span>
        <span class="span2">¥{{good.marketPrice/100}}</span>
      </div>
    </div>
  </div>
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
      const paramStr = `?id=${good.id}&storeNo=${good.storeNo}`
      console.log(window.navigator)
      console.log("$store.state.appInfo", this.$store.state.appInfo)
      if (this.$store.state.appInfo.isApp) {
        this.$bridge.callHandler(
          'router',
          `${appBaseUrl}/flutter/contest/price${paramStr}`,
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
  position: relative;
  width: 100%;
  padding: 12px;
  background-color: #ffffff;
  margin-bottom: 12px;
  border-radius: 8px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
}
.left-box {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 122px;
  height: 122px;
  border-radius: 4px;
  overflow: hidden;
  margin-right: 12px;
  .hot-good-img {
    border-radius: 4px;
    overflow: hidden;
  }
}
.save2 {
  position: absolute;
  top: 0;
  left: 0;
  width: 36px;
  height: 36px;
  background: linear-gradient(90deg, #FBF8CC 0%, #FAE963 100%);
  border-radius: 4px;
  border-top-left-radius: 0;
  text-align: center;
  font-size: 12px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #B37614;
  line-height: 14px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.save1 {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background-color: #FF5455;
  border-radius: 4px;
  color: #ffffff;
  .save-text {
    height: 14px;
    font-size: 10px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
    line-height: 14px;
  }
  .save-num {
    height: 17px;
    font-size: 12px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
    line-height: 17px;
  }
}
.right-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 190px;
}
.title {
  height: 22px;
  font-family: PingFang SC;
  color: #333333;
  font-size: 16px;
  line-height: 22px;
  margin-bottom: 5px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
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
  height: 17px;
  font-family: PingFang SC;
  color: #999999;
  font-size: 12px;
  letter-spacing: 0.6px;
  line-height: 17px;
  margin-bottom: 8px;
}
.price {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
}
.span1 {
  font-family: Helvetica Neue;
  font-weight: 700;
  color: #d7291d;
  font-size: 12px;
  letter-spacing: 1.4px;
}
.span2 {
  margin-left: 8px;
  font-family: PingFang SC;
  color: #cccccc;
  font-size: 12px;
  letter-spacing: 0.6px;
  text-decoration: line-through;
}
.right-img {
  position: absolute;
  right: 12px;
  bottom: 12px;
  width: 72px;
  height: 32px;
  background: #EA3327;
  border-radius: 18px;
  text-align: center;
  font-size: 12px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #FFFFFF;
  line-height: 32px;
}
</style>


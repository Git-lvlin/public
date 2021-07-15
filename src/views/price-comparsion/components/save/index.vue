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
    <p class="span1">¥{{good.salePrice/100}}</p>
    <p class="span2">¥{{good.marketPrice/100}}</p>
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
      const paramStr = `?id=${good.id || ''}`
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
.span1 {
  width: 100%;
  height: 17px;
  font-family: Helvetica Neue;
  font-weight: 700;
  color: #d7291d;
  font-size: 12px;
  line-height: 15px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.span2 {
  width: 100%;
  height:14px;
  font-family:PingFang SC;
  color:#999999;
  font-size:10px;
  letter-spacing:1px;
  text-decoration:line-through;
  line-height:14px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
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
    border:0.5px solid;
    border-color:#e6362f;
  }
}

</style>


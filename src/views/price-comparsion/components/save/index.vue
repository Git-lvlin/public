<template>
  <div class="save" @click="onToDetail">
    <van-image
      class="img"
      :src="good.image"
    />
    <div class="name">{{good.title}}</div>
    <div class="tag" v-if="!good.goodsContestRate">精选特惠</div>
    <div class="save-tag-box" 
      :style="{
        'background-image': `url('${getImgUrl('publicMobile/price/tag.png')}')`
      }"
      v-else
    >
      <span class="tag1">降价</span>
      <span class="tag2">{{good.goodsContestRate+'%'}}</span>
    </div>
    <div class="price-box">
      <div class="price-bg-pic" 
        :style="{
          'background-image': `url('${getImgUrl('publicMobile/price/price-sale-bg.png')}')`
        }"
      >
        <div class="price"><span class="price-head">¥</span><span class="price-span">{{good.salePrice/100>=10000?good.salePrice/100/10000 + '万':good.salePrice/100}}</span></div>
      </div>
    </div>
    <div class="lastbox">
      <p class="span1">{{good.marketPrice/100}}</p>
      <p class="span2">即将恢复</p>
    </div>
  </div>
</template>

<script>
import { getImgUrl } from '@/utils/tools';
import { appBaseUrl } from "@/constant/index";
import { goToApp, judgeVersionIsNew } from '@/utils/userInfo';
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
      const paramStr = `?id=${good.id || ''}&storeNo=${good.storeNo}`
      const isNewVersion = judgeVersionIsNew(this.$store.state.appInfo.appVersion)
      if (isNewVersion) {
        if (this.$store.state.appInfo.isMiniprogram) {
          wx.miniProgram.navigateTo({
            url: `/subpages/cart/detail/index${paramStr}`
          })
          return
        }
        goToApp(appBaseUrl, '/flutter/contest/price', paramStr, this.$bridge)
        return
      }
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
  // display: flex;
  // flex-direction: column;
  display: inline-block;
  padding: 6px;
  margin-right: 4px;
  width: 110px;
  // height: 203px;
  background: #FFFFFF;
  border-radius: 6px;
  // overflow: hidden;
  .img {
    width: 100%;
    border-radius: 6px;
    overflow: hidden;
  }
}
.name {
  width: 100%;
  height: 18px;
  font-size: 13px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  line-height: 18px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.tag {
  width: 64px;
  height: 14px;
  background: linear-gradient(261deg, #E5352F 0%, #FB5F2A 100%);
  border-radius: 2px;
  font-size: 10px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #FFFFFF;
  line-height: 14px;
  letter-spacing: 1px;
  text-align: center;
  margin-top: 2px;
  margin-bottom: 4px;
}
.price-box {
  width: 100%;
  .price-bg-pic {
    position: relative;
    width: 91px;
    height: 38px;
    margin: 0 auto;
    background-size: 100% 100%;
    text-align: center;
  }
  .price {
    position: relative;
    top: -4px;
    line-height: 38px;
    text-align: center;
    color: #FFFFFF;
    .price-head {
      height: 13px;
      font-size: 9px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      line-height: 13px;
    }
    .price-span {
      height: 14px;
      font-size: 11px;
      font-family: DINPro-Medium, DINPro;
      font-weight: 500;
      line-height: 14px;
    }
  }
}
.lastbox {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.span1 {
  height: 14px;
  font-size: 10px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  line-height: 14px;
  text-decoration:line-through;
}
.span2 {
  height: 12px;
  font-size: 10px;
  font-family: DINPro-Regular, DINPro;
  font-weight: 400;
  color: #999999;
  line-height: 12px;
}
.save-tag-box {
  width: 64px;
  height: 14px;
  display: flex;
  margin-top: 2px;
  margin-bottom: 4px;
  font-size: 10px;
  line-height: 14px;
  background-size: 100% 100%;
  .tag1 {
    width: 50%;
    height: 100%;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    text-align: center;
  }
  .tag2 {
    width: 50%;
    height: 100%;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #D7291D;
    text-align: center;
  }
}

</style>


<template>
  <div class="item" @click="onToDetail">
    <van-image
      width="100%"
      :src="good.image"
    />
  </div>
</template>

<script>
import { getImgUrl, getQueryObj } from '@/utils/tools';
import { appBaseUrl } from "@/constant/index";
import { goToApp, judgeVersionIsNew } from "@/utils/userInfo";
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
      console.log('...', this.good)
      if (!this.good || !this.good.actionUrl) {
        return console.log(this.good)
      }
      const query = getQueryObj(this.good.actionUrl)
      const paramStr = `?spuId=${query.spuId || ''}&skuId=${query.skuId || ''}&orderType=${query.orderType || '2'}`

      if (this.$store.state.appInfo.isApp) {
        const isNewVersion = judgeVersionIsNew(this.$store.state.appInfo.appVersion)
        if (isNewVersion) {
          goToApp(appBaseUrl, '/shopping/detail', paramStr, this.$bridge)
          return
        }
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
.item {
  width: 100%;
  line-height: 0;
}
</style>


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
      console.log('query', query)
      const paramStr = `?&spuId=${query.spuId || ''}&skuId=${query.skuId || ''}`
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
.item {
  width: 100%;
  line-height: 0;
}
</style>


<template>
  <div @click="onClick" class="btn" :class="good.id===0?'act':''">
    <div v-show="act" class="btn">{{good.gcName}}</div>
    <div v-show="act" class="btn-act">{{good.gcName}}</div>
  </div>
</template>

<script>
import { getImgUrl } from '@/utils/tools';
import { Image as VanImage } from 'vant';
import Vue from 'vue';
import { appBaseUrl } from "@/constant/index";
Vue.use(VanImage);

export default {
  props: {
    good: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      act: false,
    }
  },
  methods: {
    onClick() {
      const all = document.querySelectorAll('.btn')
      for(let i=0;i<all.length;i++) {
        all[i].classList.remove("act")
      }
      all[this.good.id].classList.add('act')
      this.$emit('actId', this.good.id)
    },
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
    },
  }
}
</script>

<style lang="scss" scoped>
.btn {
  display: inline-block;
  width:86px;
  height:37px;
  font-family:PingFang SC;
  font-weight:600;
  color:#fdf4ed;
  font-size:16px;
  line-height:37px;
  text-align:center;
}
.btn-act {
  display: inline-block;
  width:86px;
  height:37px;
  font-family:PingFang SC;
  font-weight:600;
  font-size:16px;
  line-height:37px;
  text-align:center;
  background-color:#fefaf5;
  border-radius:18.5px;
  color:#d93d33;
}

</style>


<template>
  <div v-if="customizeData">
    <div class="banner">
      <img :src="contentData.bannerImgUrl" />
      <div class="count-down"></div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Image as VanImage, Lazyload, Loading } from "vant";
import { getImgUrl } from "@/utils/tools";
import { appBaseUrl, meBaseUrl } from "@/constant/index";
import { goToApp } from "@/utils/userInfo";
import api from '@/apis/customize';
Vue.use(VanImage);
Vue.use(Lazyload);
Vue.use(Loading);
export default {
  data() {
    return {
      customizeData: null,
      contentData: {},
    };
  },
  components: {},
  created() {
    this.getList()
  },
  methods: {
    getImgUrl,
    onToDetail(item) {
      if (this.clicked) {
        return
      }
      this.clicked = true
      let time = setTimeout(() => {
        clearTimeout(time)
        this.clicked = false
      }, 1000)
      console.log('item', item)
      console.log('this.$store.state.appInfo', this.$store.state.appInfo)
      const { orderType, spuId, objectId, activityId, skuId, wsId } = item;
      const paramStr = `?orderType=${orderType || 3}&spuId=${spuId || ''}&objectId=${objectId || ''}&activityId=${activityId || ''}&skuId=${skuId || ''}&wsId=${wsId || ''}`
      console.log("$store.state.appInfo", this.$store.state.appInfo)
      if (this.$store.state.appInfo.isApp) {
        goToApp(appBaseUrl, '/shopping/detail', paramStr)
      } else if (this.$store.state.appInfo.isMiniprogram) {
        wx.miniProgram.navigateTo({
          url: `/subpages/cart/detail/index${paramStr}`
        })
      } else {
        console.log('不是App内')
      }
    },
    getList() {
      api.getSubjectActivityInfo({ size: 9999, id: this.$route.query.id }).then(res => {
        this.customizeData = res.data;
        this.contentData = this.customizeData.content;
      })
    },
    getPrice(p) {
      let a = p / 100;
      if (a.toString().includes('.')) {
        let l = a.toString().split('.')[0];
        let r = a.toString().split('.')[1];
        if (r.length == 2) {
          let c = l + '.' + r
          return c
        } else {
          let d = l + '.' + r + '0'
          return d
        }
      } else {
        let e = a + '.00'
        return e
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.banner {
  position: relative;

  img {
    width: 100%;
  }
}
</style>

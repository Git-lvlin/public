<template>

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
      list: [],
      load: true,
      banner: getImgUrl('publicMobile/atom/banner.png'),
      title: getImgUrl('publicMobile/atom/title.png'),
      clicked: false,
    };
  },
  components: {},
  created() {
    this.getList()
  },
  async mounted() {
    await this.loadImg()
  },
  methods: {
    loadImg() {
      return new Promise((resolve, reject) => {
        let bgImg = new Image();
        bgImg.src = this.banner; // 获取背景图片的url
        bgImg.onerror = () => {
          console.log('img onerror')
          reject()
        }
        bgImg.onload = () => { // 等背景图片加载成功后 去除loading
          setTimeout(() => {
            this.load = false
            resolve()
          }, 200)
        }
      })
    },
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
        this.list = res.data.records;
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
</style>

<template>
  <van-loading class="load" v-if="load" />
  <div class="atom" v-else>
    <van-image class="banner" width="100%" height="332px" :src="getImgUrl('publicMobile/atom/banner.png')" />
    <van-image class="title" width="225px" height="35px" :src="getImgUrl('publicMobile/atom/title.png')" />
    <div class="list_box">
      <div class="list_item" v-for="(item, index) in list" :key="index" @click="onToDetail(item)">
        <van-image lazy-load class="good_img" width="122px" height="122px" :src="item.imageUrl" />
        <div class="item_right_box">
          <div class="goods_name van-ellipsis">{{item.goodsName}}</div>
          <div class="goods_detail van-multi-ellipsis--l2">{{item.goodsDesc}}</div>
          <div class="goods_price_box">
            <span class="price_head">¥</span>
            <span class="money">{{getPrice(item.salePrice)}}</span>
          </div>
        </div>
        <div class="item_btn">立即抢购</div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Image as VanImage, Lazyload, Loading } from "vant";
import { getImgUrl } from "@/utils/tools";
import { appBaseUrl, meBaseUrl } from "@/constant/index";
import { goToApp } from "@/utils/userInfo";
import teamApi from '@/apis/atom';
import jsBridge from '@/utils/jsBridge';

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
    const data = {
      code: 0,
      msg: 'success',
      data: {
        link: `${appBaseUrl}/flutter/store/member/health/manager_page`,
        color: '#ff2e23',
        content: `设备管理＞`
      }
    }
    const zero = JSON.stringify(data);
    jsBridge.callHandler(
      'setNavigationBarRightContent',
      zero,
    )
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
      const {orderType, spuId, objectId, activityId, skuId, wsId} = item;
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
      const param = {
        type: 1, // 1=氢原子
      }
      teamApi.getList(param).then(res => {
        this.list = res.data.records;
        // this.list = res.data.records.map((item) => {
        //   item.time = this.timestampToTime(item.activityStartTime) + ' 至 ' + this.timestampToTime(item.activityEndTime)
        //   if (!item.bannerImage) {
        //     item.bannerImage = getImgUrl('publicMobile/center/banner.png');
        //   }
        //   return item
        // })
      })
    },
    getPrice(p) {
      let a = p/100;
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
.load {
  position: fixed;
  padding-top: 200px;
  width: 100%;
  min-height: 100vh;
  background-color: #42A5FF;
  margin: auto;
  text-align: center;
  z-index: 99999;
}
.atom {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: #42A5FF;
}
.banner {
  width: 100%;
  height: 332px;
}
.title {
  margin: 9px 0 12px;
  width: 225px;
  height: 35px;
}
.list_box {
  padding: 0 12px 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.list_item {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 351px;
  height: 132px;
  background: #FFFFFF;
  border-radius: 8px;
  margin-bottom: 12px;
}
.good_img {
  width: 122px;
  height: 122px;
  border-radius: 8px;
  overflow: hidden;
}
.item_right_box {
  position: relative;
  margin-left: 13px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 204px;
  height: 100%;
  overflow: hidden;
}
.goods_name {
  margin: 8px 0 4px;
  width: 100%;
  height: 22px;
  font-size: 16px;
  color: #333333;
}
.goods_detail {
  width: 100%;
  height: 30px;
  font-size: 12px;
  color: #A4A4A4;
  line-height: 15px;
  overflow: hidden;
}
.goods_price_box {
  position: absolute;
  bottom: 11px;
  left: 0;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
}
.price_head {
  color: #D7291D;
  font-size: 15px;
  margin-right: 2px;
}
.money {
  position: relative;
  top: 2px;
  font-size: 22px;
  color: #D7291D;
  letter-spacing: 1px;
}
.item_btn {
  position: absolute;
  right: 10px;
  bottom: 10px;
  width: 72px;
  height: 32px;
  background: #FE4A26;
  border-radius: 18px;
  line-height: 32px;
  text-align: center;
  color: #FFFFFF;
  font-size: 12px;
}
</style>

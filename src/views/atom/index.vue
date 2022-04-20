<template>
  <div class="atom">
    <van-image class="banner" width="100%" height="332px" :src="getImgUrl('publicMobile/atom/banner.png')" />
    <van-image class="title" width="225px" height="35px" :src="getImgUrl('publicMobile/atom/title.png')" />
    <div class="list_box">
      <div class="list_item" v-for="(item, index) in list" :key="index" @click="onToDetail(item)">
        <van-image lazy-load class="good_img" width="122px" height="122px" :src="item.imgUrl" />
        <div class="item_right_box">
          <div class="goods_name van-ellipsis">{{item.name}}</div>
          <div class="goods_detail van-multi-ellipsis--l2">{{item.dec}}</div>
          <div class="goods_price_box">
            <span class="price_head">¥</span>
            <span class="money">{{getPrice(item.price)}}</span>
          </div>
        </div>
        <div class="item_btn">立即抢购</div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Image as VanImage, Lazyload } from "vant";
import { getImgUrl } from "@/utils/tools";
import { appBaseUrl, meBaseUrl } from "@/constant/index";
import { goToApp } from "@/utils/userInfo";
import teamApi from '@/apis/atom';
Vue.use(VanImage);
Vue.use(Lazyload);
export default {
  data() {
    return {
      list: [
        {
          name: '氢原子呼吸机氢原子呼吸机氢原子呼吸机氢原子呼吸机氢原子呼吸机',
          dec: '呼吸机中的战斗机，保障您和家人的用 水健呼吸机中的战斗机，保障您和家人的用 水健呼吸机中的战斗机，保障您和家人的用 水健呼吸机中的战斗机，保障您和家人的用 水健',
          price: 680010,
          imgUrl: 'https://dev-yeahgo.oss-cn-shenzhen.aliyuncs.com/publicMobile/atom/banner.png'
        }
      ],
    };
  },
  components: {},
  created() {
    // this.getList()
  },
  mounted() {
  },
  methods: {
    getImgUrl,
    onToDetail(item) {
      console.log('item', item)
      console.log('this.$store.state.appInfo', this.$store.state.appInfo)
      const data = item;
      const paramStr = `?orderType=${data.orderType || 3}&spuId=${data.spuId || ''}&objectId=${data.objectId || ''}&activityId=${data.activityId || ''}&skuId=${data.skuId || ''}&wsId=${data.wsId || ''}`
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
        size: 99,
        next: 0,
      }
      teamApi.getList(param).then(res => {
        this.list = res.data.records.map((item) => {
          item.time = this.timestampToTime(item.activityStartTime) + ' 至 ' + this.timestampToTime(item.activityEndTime)
          if (!item.bannerImage) {
            item.bannerImage = getImgUrl('publicMobile/center/banner.png');
          }
          return item
        })
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

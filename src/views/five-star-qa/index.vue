<template>
  <div class="five-star-qa">
    <van-image
      class="bg"
      width="100%"
      height="100%"
      lazy-load
      :src="getImgUrl('publicMobile/fivestarqa/qabg.png')"
    />
    <div class="btn" @click="go"></div>
</template>

<script>
import Vue from 'vue';
import { Image as VanImage, Lazyload, Dialog } from 'vant';
import { getImgUrl } from '@/utils/tools';
import { meBaseUrl } from "@/constant/index";
import teamApi from '@/apis/fivestar';
import {
  goToApp,
} from '@/utils/userInfo';

Vue.use(VanImage);
Vue.use(Lazyload);
export default {
  data() {
    return {
      token: null,
      info: null,
    };
  },
  components: {
    [Dialog.Component.name]: Dialog.Component,
  },
  async mounted() {
    await this.getUserInfo()
    this.getInfo()
  },
  methods: {
    getImgUrl,
    go() {
      if (!this.info.storeAccount) {
        Dialog({ message: '本活动仅限店主参与，请先申请开店，成为店主后再参与' });
        return
      }
      if (this.info?.memberShop?.level?.gradeLevel == 5) {
        Dialog({ message: '您已是五星店主，请参与其他活动吧~' });
        return 
      }
      goToApp(meBaseUrl, '/web/five-star', '', this.$bridge)
    },
    getUserInfo() {
      return new Promise((resolve) => {
        this.$bridge.callHandler('getUserInfo',{},(res) => {
          const d = JSON.parse(res)
          this.token = d.data.accessToken
          resolve()
        })
      })
    },
    getInfo() {
      teamApi.getStoreShopInfo({}, {showError:false, token: this.token}).then((res) => {
        console.log('店铺信息-res', res)
        if (res?.code == 10110) {
          this.info = null
          return
        }
        if (res?.code == 0) {
          this.info = res.data
        }
      }).catch(err=>{
        console.log('err-getStoreShopInfo', err)
      })
    },
  },
};
</script>

<style lang="scss" scoped>
  .five-star-qa {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    position: relative;
  }
  .btn {
    position: absolute;
    top: 302px;
    right: 0;
    width: 190px;
    height: 80px;
  }
</style>

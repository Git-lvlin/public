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
      storeAccount: null,
      gradeLevel: null,
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
      if (!this.storeAccount) {
        Dialog({ message: '本活动仅限店主参与，请先申请开店，成为店主后再参与' });
        return
      }
      if (this.gradeLevel == 5) {
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
      teamApi.getStoreShopInfo(
        {},
        {
          showError: false,
          token: this.token,
          appInfo: this.$store.state.appInfo,
          bridge: this.$bridge,
        })
        .then((res) => {
          if (res&&res.code == 0) {
            this.storeAccount = res.data.storeAccount
            this.gradeLevel = res.data.memberShop.level.gradeLevel
          }
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

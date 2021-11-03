<template>
  <div class="invitation-list">
    <div class="title-box">
      <div>集约活动名称</div>
      <div>集约商品</div>
      <div>集约数量</div>
      <div>下单时间</div>
    </div>
    <div class="item" v-for="(item, index) in listData" v-bind:key="index">
      <div>{{item.wholesaleName}}</div>
      <div>{{item.goodsName}}</div>
      <div>{{item.paymentNum}}</div>
      <div>{{item.finalPaymentTime}}</div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Image as VanImage, Dialog, Swipe, SwipeItem, Lazyload } from 'vant';
import { getImgUrl } from '@/utils/tools';
import { appBaseUrl } from "@/constant/index";
import teamApi from '@/apis/appointment';
import {
  goToApp,
  savePicShare,
  setNavigationBarRightContent
} from '@/utils/userInfo';

Vue.use(VanImage);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Lazyload);
export default {
  data() {
    return {
      ruleText: null,
      show: false,
      token: null,
      bgType: 0,
      listData: []
    };
  },
  components: {
    [Dialog.Component.name]: Dialog.Component,
  },
  async created () {
    await this.getUserInfo()
    this.getList()
  },
  methods: {
    getImgUrl,
    getList() {
      teamApi.getstoreransList({next:0,size:99}, {token:this.token}).then((res) => {
        this.listData = res.data.records
      })
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
  },
};
</script>

<style lang="scss" scoped>
  .invitation-list {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color:#F5F5F5;
    position: relative;
  }
  .title-box {
    width: 100%;
    height: 43px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(216, 0, 16, .59);
    div {
      text-align: center;
      width: 88px;
      height: 20px;
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #FFFFFF;
      line-height: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 40px;
    div {
      text-align: center;
      width: 88px;
      height: 17px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 17px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .item:nth-child(odd) {
    background: rgba(231,103,113, .08);
  }
</style>

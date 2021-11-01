<template>
  <div class="invitation-list">
    <div class="title-box">
      <div>注册手机号</div>
      <div>绑定状态</div>
      <div>开店状态</div>
    </div>
    <div class="item" v-for="(item, index) in listData" v-bind:key="index">
      <div>{{item.phoneNumber}}</div>
      <div>{{item.bindType}}</div>
      <div>{{item.shopType}}</div>
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
      token: null,
      listData: [
        {
          phoneNumber: '1111112123',
          bindType: 0,
          shopType: 0
        },
        {
          phoneNumber: '1111112123',
          bindType: 0,
          shopType: 0
        },
        {
          phoneNumber: '1111112123',
          bindType: 0,
          shopType: 0
        }
      ]
    };
  },
  components: {
    [Dialog.Component.name]: Dialog.Component,
  },
  async created () {
  },
  methods: {
    getImgUrl,
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
      width: 117px;
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
      width: 117px;
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

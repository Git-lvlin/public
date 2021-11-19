<template>
  <div class="container">
    <van-image
      class="border"
      width="100%"
      :src="getImgUrl('publicMobile/share/border.png')"
    />
    <div class="content">
      <div class="record" @click="lookRecord">邀请记录</div>
      <div class="time">活动时间:9月20日-30日</div>
      <div class="title">

      </div>
      <div class="subtitle">邀请好友越多，推荐人奖励翻倍</div>
      <div class="box-one">
        <div class="one-item"></div>
        <div class="one-item"></div>
        <div class="one-item"></div>
        <div class="detail">
          当前活动已累计邀请3人,共获得红包30元，红包可在下方 “好货推荐”列表的商品中使用。
        </div>
        <van-image
          class="one-btn"
          width="280px"
          height="52px"
          :src="getImgUrl('publicMobile/share/border.png')"
        />
      </div>
      <div class="title">
        <van-image
          class="star-img"
          width="27px"
          height="12px"
          :src="getImgUrl('publicMobile/share/border.png')"
        />
        <div>邀人攻略</div>
        <van-image
          class="star-img"
          width="27px"
          height="12px"
          :src="getImgUrl('publicMobile/share/border.png')"
        />
      </div>
      <div class="box-two">
        <div>第一步</div>
        <div>分享「约购」APP注册链接给好友。</div>
        <div>第二步</div>
        <div>让好友注册「约购」APP账号并下载APP。</div>
        <div>第三步</div>
        <div>好友打开「约购」APP并登陆成功即可推荐成功。</div>
      </div>
      <div class="title">
        <van-image
          class="star-img"
          width="27px"
          height="12px"
          :src="getImgUrl('publicMobile/share/border.png')"
        />
        <div>好货推荐</div>
        <van-image
          class="star-img"
          width="27px"
          height="12px"
          :src="getImgUrl('publicMobile/share/border.png')"
        />
      </div>
      <div class="box-three">

      </div>
      <div class="tail">
        <div>没有更多商品</div>
      </div>
      <div class="bottom-btn">
        <van-image
          class="btn-img"
          width="320px"
          height="92px"
          :src="getImgUrl('publicMobile/share/border.png')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Image as VanImage } from 'vant';
import { getImgUrl } from '@/utils/tools';
Vue.use(VanImage);
export default {
  data() {
    return {
    };
  },
  created () {
  },
  mounted() {
  },
  methods: {
    getImgUrl,
  },
};
</script>

<style lang='scss' scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #ffffff;
}
</style>
